import React, { useState, useEffect } from "react";
import colors from "./colors";

function App() {
  const [color, setColor] = useState("");
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("Loading Quote");

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      let randomNum = Math.floor(Math.random() * data.length);
      setAuthor(data[randomNum].author);
      setQuote(data[randomNum].text);
    } catch (error) {
      throw new Error(error);
    }
    randomizeColor();
  };

  const randomizeColor = () => {
    let randomNum = Math.floor(Math.random() * colors.length);
    setColor(colors[randomNum]);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <div className="container">
        <div className="card">
          <h5 className="card-header">Random Quote Generator</h5>
          <div className="card-body">
            <h5 className="card-title">{author}</h5>
            <p className="card-text">{quote}</p>
            <button className="btn btn-primary" onClick={() => fetchQuote()}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
