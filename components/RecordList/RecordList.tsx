import React from "react";

import "./RecordList.scss";

const RecordList = props => {
  const { records, onRemoveItem } = props;

  return (
    <section className="record-list">
      <h2>Records</h2>
      <ul>
        {records.map(el => (
          <li key={el.id} onClick={onRemoveItem.bind(this, el.id)}>
            <span>{el.date}</span>
            <span>{el.wpm?.toFixed(0)}</span>
            <span>{el.accuracy?.toFixed(0)}%</span>
            <span>{el.completion?.toFixed(0)}%</span>
            <span className="ml-3">x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecordList;
