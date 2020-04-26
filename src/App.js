
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "../src/component/landingPage/landingPage.js"
import Dashboard from "../src/component/dashboard/dashboard.js"
import Error from "../src/component/error/all.js"
import Error400 from "../src/component/error/400.js"
import Error404 from "../src/component/error/404.js"
import Error500 from "../src/component/error/505.js"
import Login from "../src/component/login/login.js";
import PrivateRoute from "./component/privateRoute";


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path='/protected/main' Component={LandingPage} />
          <PrivateRoute path='/protected/dashboard' Component={Dashboard} />
          <PrivateRoute path='/protected/error' Component={Error} />
          <PrivateRoute path='/protected/error-400' Component={Error400} />
          <PrivateRoute path='/protected/error-404' Component={Error404} />
          <PrivateRoute path='/protected/error-500' Component={Error500} />
          <Route path="/"
            render={(props) => <Login {...props} />}
          />
          <Route render={() => <div></div>}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;