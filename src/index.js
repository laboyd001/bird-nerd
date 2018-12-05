import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import BirdNerd from "./components/BirdNerd";

import "./index.css";

ReactDOM.render(
  <Router>
    <BirdNerd />
  </Router>,
  document.getElementById("root")
);
