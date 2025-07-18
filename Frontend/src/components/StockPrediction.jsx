import React from "react";

const StockPrediction = ({ stockSymbol, setStockSymbol, predictedData, predictNextDay, loading }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Predict Next Day's Stock Price</h2>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Enter Stock Symbol:</label>
        <div className="flex">
          <input
            type="text"
            className="bg-gray-700 text-white p-2 rounded-l-lg w-full focus:outline-none pl-4"
            placeholder="e.g., IOB"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
          <button
            className="text-green-400 border-2 border-green-400 hover:bg-green-400 hover:text-gray-700 px-4 py-2 rounded-r-lg"
            onClick={predictNextDay}
          >
            Predict
          </button>
        </div>
      </div>

      {loading && <p className="text-center my-4">Loading...</p>}

      {predictedData && !loading && (
        <div className="bg-gray-700 p-4 rounded-lg mt-4 space-y-4">
          <div>
            <h3 className="font-bold text-lg uppercase">
              {predictedData.company} ({predictedData.stock_name})
            </h3>
            <p className="text-gray-400">Prediction For: {predictedData.date}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400">Predicted Open</p>
              <p className="text-lg font-bold text-green-400">
                ₹{predictedData.next_day_price.open_price.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Predicted High</p>
              <p className="text-lg font-bold text-green-400">
                ₹{predictedData.next_day_price.high_price.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Predicted Low</p>
              <p className="text-lg font-bold text-green-400">
                ₹{predictedData.next_day_price.low_price.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Predicted Close</p>
              <p className="text-lg font-bold text-green-400">
                ₹{predictedData.next_day_price.close_price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* NEW: Trading Recommendation */}
          <div className="mt-6">
            <h4 className="font-semibold text-lg">Trading Recommendation</h4>
            <p className="text-green-400 text-lg font-bold capitalize">{predictedData.trading_recommendation}</p>
            <p className="text-gray-400 text-sm mt-1">
              {predictedData.recommendation_explanation}
            </p>
            {/* <p className="text-gray-400 text-sm mt-1">
              Strategy Used: <span className="text-white font-semibold">{predictedData.trading_strategy}</span>
            </p> */}
          </div>

          {/* Sentiment Analysis */}
          <div className="mt-6">
            <h4 className="font-semibold">Sentiment Analysis</h4>
            <p className="text-sm text-gray-400">Score: {predictedData.sentiment_score.toFixed(4)}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-green-400">Positive: {predictedData.sentiment_breakdown.positive}</span>
              <span className="text-yellow-400">Neutral: {predictedData.sentiment_breakdown.neutral}</span>
              <span className="text-red-400">Negative: {predictedData.sentiment_breakdown.negative}</span>
            </div>
          </div>

          {/* Recent News */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Recent News</h4>
            <ul className="space-y-2">
              {predictedData.news.map((article, index) => (
                <li key={index} className="border-l-4 pl-3 border-gray-600">
                  <p className="font-medium">{article.title}</p>
                  <p className="text-sm text-gray-400">
                    Source: {article.source}<br />
                    Sentiment:{" "}
                    <span
                      className={
                        article.sentiment === "positive"
                          ? "text-green-400"
                          : article.sentiment === "negative"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }
                    >
                      {article.sentiment}
                    </span>{" "}
                    | Score: {article.sentiment_score.toFixed(4)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPrediction;