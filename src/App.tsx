import React from "react";
import Main from "./components/Main";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="title">
        Powered by
        <span className="yandex">
          <span className="first-letter">Y</span>andex
        </span>
        Translate
      </div>
      <Main />
    </div>
  );
}

export default App;
