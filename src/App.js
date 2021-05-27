import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import { useStyles } from "./styles";

import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

let endpoint = "http://localhost:8080";

function App() {
  const [name, setName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      axios
        .get(endpoint + "/api/user", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setName(res.data.name);
          }
        });
    })();
  });

  let menu;

  if (name === "") {
    menu = (
      <main className="form-signin">
        <Route path="/" exact component={() => <Home name={name} />} />
        <Route
          path="/login"
          component={() => <Login setName={setName} endpoint={endpoint} />}
        />
        <Route
          path="/register"
          component={() => <Register endpoint={endpoint} />}
        />
      </main>
    );
  } else {
    menu = (
      <div>
        <div className={classes.appBarSpacer}></div>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route exact key={index} path={route.path}>
                {() => (
                  <route.component setName={setName} endpoint={endpoint} />
                )}
              </Route>
            );
          })}
        </Switch>
      </div>
    );
  }

  return (
    <div className={classes.appRoot}>
      <Router>
        <Navigation name={name} setName={setName} />
        {menu}
      </Router>
    </div>
  );
}

export default App;
