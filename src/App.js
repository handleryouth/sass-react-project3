import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import data from "./components/data";
import Detail from "./components/Detail";
import "./scss/main.scss";

export default function App() {
  const [list, setList] = useState(data);

  return (
    <div>
      <aside>

      </aside>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home list={list} />}
          />
          <Route
            path="/invoice/:id"
            component={() => <Detail list={list} setList={setList} />}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}
