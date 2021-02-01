import React, { useContext, useEffect, useReducer, useState } from "react";
import { Metrics } from "../components/Metrics";
import { Timer } from "../components/Timer";
import { TypeBox } from "../components/TypeBox";
import { LoginContext } from "../context";
import { TypingContext } from "../context/typing-context";
import useHttp from "../hooks/useHttp";

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

const TypingTrainer = props => {
  const { timerSecCount, secondsLapsed } = useContext(TypingContext);
  const { username } = useContext(LoginContext);

  const time = new Date();
  time.setSeconds(time.getSeconds() + timerSecCount);

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

  const display = !secondsLapsed ? (
    <div>
      <Timer expiryTimestamp={time} />
      <TypeBox />
    </div>
  ) : (
    <Metrics recordReducer={recordReducer} />
  );

  return <div className="typing-trainer p-5">{display}</div>;
};

export { TypingTrainer };
