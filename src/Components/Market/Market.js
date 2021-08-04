import React, { useEffect } from "react";

import axios from "axios";

export default function Market() {
  const [marketData, setMarketData] = React.useState({});
  const [selectedData, setSelectedData] = React.useState("USD");

  useEffect(() => {
    axios
      .get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
      .then((res) => {
        setMarketData(res.data.bpi);
      });
  }, [marketData, selectedData]);

  const refreshPage = () => {
    axios
      .get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
      .then((res) => {
        setMarketData(res.data.bpi);
      });
  };

  function handleChange(e) {
    const { value } = e.target;
    setSelectedData(value);
  }

  return (
    <div className="flex flex-row m-5">
      <div className="w-full md:w-2/5">
        <button
          className="flex w-1/2 m-2 bg-gray-10 rounded btn"
          onClick={refreshPage}
        >
          <span className="px-2">Refresh</span>
        </button>
        <select
          className="flex w-1/2 m-2 bg-gray-10 rounded"
          onChange={handleChange}
        >
          {Object.keys(marketData).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-4/5 card">
        <h5 className="card-body">
          Name:{" "}
          {Object.keys(marketData).length > 0
            ? marketData[selectedData].description
            : "Nodata"}
        </h5>
        <h5 className="card-body">
          Code:{" "}
          {Object.keys(marketData).length > 0
            ? marketData[selectedData].code
            : "Nodata"}
        </h5>
        <h5 className="card-body">
          Rate: {" "}
          {Object.keys(marketData).length > 0
            ? marketData[selectedData].rate
            : "Nodata"}
        </h5>
        <h5 className="card-body">
          Rate Float:{" "}
          {Object.keys(marketData).length > 0
            ? marketData[selectedData].rate_float
            : "Nodata"}
        </h5>
      </div>
    </div>
  );
}
