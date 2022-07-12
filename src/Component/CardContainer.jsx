/** @format */

import React, { useEffect, useState } from "react";
import Card from "./Card";
import LoadingScreen from "./LoadingScreen";
const CardContainer = () => {
  const [cardData, setCardData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartName, setChartName] = useState("");
  const [cardTimeData, setCardTimeData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const getApiData = async () => {
    try {
      setIsLoaded(true);
      console.log("strted");
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      console.log("response");
      const fetchedData = await response.json();
      console.log("fetchdata", fetchedData);
      setChartName(fetchedData?.chartName);
      setCardTimeData(fetchedData?.time);
      let cardDataTemp = [];
      for (const [key, value] of Object.entries(fetchedData.bpi)) {
        cardDataTemp.push(value);
      }
      setIsLoaded(false);
      console.log("data=======", cardDataTemp);
      setCardData(cardDataTemp);
    } catch (error) {
      setIsLoaded(false);
      console.log("Error Message",error);
    }
  };
  useEffect(() => {
    getApiData();
  }, [refresh]);

  const onDelete = (index) => {
    let result = cardData.filter((item, ind) => {
      if (ind !== index) {
        return item;
      }
    });
    setCardData(result);
  };
  return (
    <div className="wrapper">
      <div className="header">
        
        <div className="chartName">  {chartName} </div>
      </div>

      <div className="card-grid">
        {isLoaded ? (<LoadingScreen/>) : (
          <>
            {cardData.length &&
              cardData?.map((item, index) => {
                return (
                  <Card
                    key={index}
                    title={item.code}
                    symbol={item.symbol}
                    description={item.description}
                    rate={item.rate}
                    time={item.rate}
                    chartName={chartName}
                    updated={cardTimeData?.updated}
                    updatedIso={cardTimeData?.updatedISO}
                    updatedUk={cardTimeData?.updateduk}
                    onRefresh={getApiData}
                    onDelete={() => {
                      onDelete(index);
                    }}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
