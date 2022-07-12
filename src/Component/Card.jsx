/** @format */

import React from "react";
import "./Card.css";

const Card = (props) => {
  const {
    title,
    symbol,
    description,
    rate,
    onDelete,
    onRefresh,
    updated,
    updatedIso,
    updatedUk,
  } = props;

  function decodeHtml(rawStr) {
    var txt = document.createElement("textarea");
    txt.innerHTML = rawStr;
    return txt.value;
  }

  return (
    <div className="card">
      <div className="cross-mark">
        <i className="fa fa-close" onClick={onDelete}> </i>
      </div>
      <div className="card-header ">
        <div className="card-title"> {title} </div>
        <div className="symbolContainer"><div className="symbol">{decodeHtml(symbol)}</div>  </div>
      </div>
      <div className="card-body">
         {description} 
      </div>

      <div className="rate-label">
        <span className="rate">Rate {decodeHtml(symbol)}</span>
        <span className="money"> {rate}</span>
      </div>

      <div className="updateLabel">
        <div className="updateTitle">Updated at : </div>
        <div>{updated}</div>
        <div>{updatedIso}</div>
        <div>{updatedUk}</div>
      </div>
      <div className="refreshCard">
        <div className="refresh" ><img src="refresh.png" alt="" onClick={onRefresh}/></div>
      </div>
    </div>
  );
};

export default Card;
