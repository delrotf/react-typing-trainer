import React from "react";

import "./RecordList.scss";

const RecordList = props => {
  const { onRemoveItem } = props;

  return (
    <section className="ingredient-list">
      <h2>Records</h2>
      <ul>
        {props.records.map(ig => (
          <li key={ig.id} onClick={onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecordList;
