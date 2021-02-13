import React from "react";
import ReactDOM from "react-dom";

import "./css/index.css";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// try {
//   // eslint-disable-next-line no-unused-vars
//   const analytics = firebase.analytics();
// } catch (err) {
//   console.log("are you on tendie.land");
// }
