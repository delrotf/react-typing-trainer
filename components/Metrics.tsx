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
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

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
  const {
    text,
    typedTexts,
    secondsLapsed,
    setSecondsLapsed,
    done,
    setDone,
    setTypedTexts
  } = useContext(TypingContext);
  const { username } = useContext(LoginContext);
  const typedTextsLength = typedTexts.length;
  const textLength = text.length;

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [record, setRecord] = useState(null);

  //set wpm
  useEffect(() => {
    if (secondsLapsed && typedTextsLength) {
      const word = 5;
      const wordCount = typedTextsLength / word;
      const wpm = (wordCount / secondsLapsed) * 60;
      setWpm(wpm);
    }

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

    setAccuracy(accuracy);

    const completion = (typedTextsLength / textLength) * 100;
    setCompletion(completion);

    const record = {
      username,
      accuracy,
      completion,
      wpm,
      date: moment().format("MMMM Do YYYY, h:mm:ss a")
    };
    setRecord(record);
  }, [secondsLapsed, typedTextsLength]);

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
      for (const key in data) {
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
    if (record) {
      addRecordHandler(record);
    }
  }, [record]);

  const removeRecordHandler = useCallback(
    recordId => {
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

  const onClickHandler = () => {
    setTypedTexts([]);
    setDone(false);
    setSecondsLapsed(0);
    setWpm(0);
  };

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
      <div className="d-flex justify-content-center">
        <Button variant="dark" onClick={onClickHandler}>
          <FontAwesomeIcon icon={faRedo} />
        </Button>
      </div>
      {recordList}
    </div>
  );
};

export { Metrics };
