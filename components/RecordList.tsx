import React from "react";

import "./RecordList.scss";

const RecordList = props => {
  const { records, onRemoveItem } = props;
  
  console.log('records', records)

  return (
    <section className="ingredient-list">
      <h2>Records</h2>
      <ul>
        {records.map(el => (
          <li key={el.id} onClick={onRemoveItem.bind(this, el.id)}>
            <span>{el.wpm?.toFixed(2)}</span>
            <span>{el.accuracy?.toFixed(2)}</span>
            <span>{el.completion?.toFixed(2)}x</span>
            <span>{el.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecordList;
