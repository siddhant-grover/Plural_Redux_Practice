import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();//we dont pass initial state to store, passing initial state here is overriding the default parameters that we specify in our reducers 

render(
  <ReduxProvider store={store}>{/* now our app is able to access redux store */}
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
