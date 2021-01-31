import React from "react";

import "./RecordList.scss";

const RecordList = props => {
  const { onRemoveItem } = props;

  return (
    <section className="ingredient-list">
      <h2>Records</h2>
      <ul>
        {props.records.map(el => (
          <li key={el.id} onClick={onRemoveItem.bind(this, el.id)}>
            <span>{el.wpm}</span>
            <span>{el.accuracy}</span>
            <span>{el.completion}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecordList;
