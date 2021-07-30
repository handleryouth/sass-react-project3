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
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Home list={list} setList={setList}/>} />
          <Route
            path="/invoice/:id"
            render={() => <Detail list={list} setList={setList} />}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}
