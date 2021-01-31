import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
import { LoginContext } from "../context";
import { TypingContext } from "../context/typing-context";
import useHttp from "../hooks/useHttp";
import ErrorModal from "../ui/ErrorModal";
import RecordList from "./RecordList";
import moment from "moment";

const recordReducer = (currentRecords, action) => {
  switch (action.type) {
    case "SET":
      return action.records;
    case "ADD":
      return [...currentRecords, action.record];
    case "DELETE":
      return currentRecords.filter(el => el.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const Metrics = props => {
  const { text, typedTexts, secondsLapsed, done } = useContext(TypingContext);
  const { username } = useContext(LoginContext);
  const typedTextsLength = typedTexts.length;
  const textLength = text.length;

  const [wpm, setWpm] = useState(0);

  //set wpm
  useEffect(() => {
    if (secondsLapsed) {
      const word = 5;
      const wordCount = typedTextsLength / word;
      const wpm = (wordCount / secondsLapsed) * 60;
      setWpm(wpm);
    } else {
      setWpm(0);
    }
  }, [secondsLapsed]);

  let accuracy = 0;
  if (JSON.stringify(text) === JSON.stringify(typedTexts)) {
    accuracy = 100;
  } else {
    let correctCount = 0;

    typedTexts.forEach((el, index) => {
      const textChar = text[index];
      if (el === textChar) {
        correctCount++;
      }
    });

    if (correctCount) {
      accuracy = (correctCount / typedTextsLength) * 100;
    }
  }

  const completion = (typedTextsLength / textLength) * 100;

  const baseUrl = "https://react-typing-trainer-default-rtdb.firebaseio.com";

  const [userRecords, dispatch] = useReducer(recordReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear
  } = useHttp();

  // load data
  useEffect(() => {
    const query = `?orderBy="username"&equalTo="${username}"`;
    sendRequest(
      `${baseUrl}/records.json${query}`,
      "GET",
      null,
      null,
      "LOAD_RECORDS"
    );
  }, []);

  useEffect(() => {
    if (!isLoading && !error && data && reqIdentifer === "LOAD_RECORDS") {
      const loadedRecords = [];
      console.log("data", data);
      for (const key in data) {
        console.log("key", key);
        loadedRecords.push({
          id: key, //from firebase
          username: data[key].username,
          accuracy: data[key].accuracy,
          completion: data[key].completion,
          wpm: data[key].wpm,
          date: data[key].date
        });
      }
      dispatch({ type: "SET", records: loadedRecords });
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === "REMOVE_RECORD") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === "ADD_RECORD") {
      const record = { id: data.name, ...reqExtra };
      console.log("data,record", data, record);

      dispatch({
        type: "ADD",
        record
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const addRecordHandler = useCallback(
    record => {
      sendRequest(
        `${baseUrl}/records.json`,
        "POST",
        JSON.stringify(record),
        record,
        "ADD_RECORD"
      );
    },
    [sendRequest]
  );

  useEffect(() => {
    if (wpm) {
      const record = {
        username,
        accuracy,
        completion,
        wpm,
        date: moment().format("MMMM Do YYYY, h:mm:ss a")
      };
      console.log("add record", record);
      addRecordHandler(record);
    }
  }, [wpm]);

  const removeRecordHandler = useCallback(
    recordId => {
      console.log("delete recordId", recordId);
      sendRequest(
        `${baseUrl}/records/${recordId}.json`,
        "DELETE",
        null,
        recordId,
        "REMOVE_RECORD"
      );
    },
    [sendRequest]
  );

  const recordList = useMemo(() => {
    return (
      <RecordList records={userRecords} onRemoveItem={removeRecordHandler} />
    );
  }, [userRecords, removeRecordHandler]);

  return (
    <div className="metrics">
      <div className="accuracy">
        <span className="label">Accuracy</span>
        <span className="value">{accuracy.toFixed(2)}</span>
      </div>
      <div className="completion">
        <span className="label">Completion</span>
        <span className="value">{completion.toFixed(2)}</span>
      </div>
      <div className="wpm">
        <span className="label">wpm</span>
        <span className="value">{wpm.toFixed(2)}</span>
      </div>
      {recordList}
    </div>
  );
};

export { Metrics };
