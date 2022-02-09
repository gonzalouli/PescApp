import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import Amplify from "aws-amplify";

import awsExports from "./aws-exports";
import { Capacitor } from "@capacitor/core";

if (process.env.REACT_APP_LOCAL) {
  awsExports.aws_cloud_logic_custom[0].endpoint = Capacitor.isNativePlatform()
    ? "http://10.0.2.2:4444"
    : "http://localhost:4444";
}
console.log(process.env.REACT_APP_LOCAL);
console.log(process.env.REACT_APP_BACKEND_HOST);
console.log(process.env.DATABASE_HOST);
console.log(process.env.GOOGLE_KEY);

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
