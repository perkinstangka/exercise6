import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Register, Login, Home } from "../pages";

function Routes() {
  return (
    <Switch>
      <Route exact path="/backend-exercise-6">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
}

export default Routes;
