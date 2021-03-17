import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import UserForm from "./pages/UserForm";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/user-form" component={UserForm} />
      </Switch>
    </Router>
  );
};

export default App;
