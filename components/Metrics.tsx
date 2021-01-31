import React, { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { TypingContext } from "../context/typing-context";
import useHttp from "../hooks/useHttp";
import ErrorModal from "../ui/ErrorModal";
import RecordList from "./RecordList";

const recordReducer = (currentRecords, action) => {
  switch (action.type) {
    case 'SET':
      return action.records;
    case 'ADD':
      return [...currentRecords, action.record];
    case 'DELETE':
      return currentRecords.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Metrics = props => {
  const { text, typedTexts, secondsLapsed } = useContext(TypingContext);
  const typedTextsLength = typedTexts.length;
  const textLength = text.length;

  const word = 5;
  const wordCount = typedTextsLength / word;

  const wpm = secondsLapsed
    ? wordCount / secondsLapsed * 60
    : 0;

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

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        record: { id: data.name, ...reqExtra }
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const filteredRecordsHandler = useCallback(filteredRecords => {
    dispatch({ type: 'SET', records: filteredRecords });
  }, []);

  const addRecordHandler = useCallback(record => {
    sendRequest(
      'https://react-hooks-update.firebaseio.com/records.json',
      'POST',
      JSON.stringify(record),
      record,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]);

  const removeRecordHandler = useCallback(
    recordId => {
      sendRequest(
        `https://react-hooks-update.firebaseio.com/records/${recordId}.json`,
        'DELETE',
        null,
        recordId,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const recordList = useMemo(() => {
    return (
      <RecordList
        records={userRecords}
        onRemoveItem={removeRecordHandler}
      />
    );
  }, [userRecords, removeRecordHandler]);

  return (
    <div className="metrics">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
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
      </div>{" "}
    </div>
  );
};

export { Metrics };