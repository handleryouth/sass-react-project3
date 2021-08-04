import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import data from "./components/data";
import Detail from "./components/Detail";
import "./scss/main.scss";

export const variable = createContext();

const THEME = "DarkTheme";
const INVOICELIST = "InvoiceList";

export default function App() {
  const [list, setList] = useState(data);
  const [darkTheme, setDarkTheme] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    const invoicelistJSON = localStorage.getItem(INVOICELIST);
    const darkThemeJSON = localStorage.getItem(THEME);
    invoicelistJSON != null && setList(JSON.parse(invoicelistJSON));
    darkThemeJSON != null && setDarkTheme(JSON.parse(darkThemeJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME, JSON.stringify(darkTheme));
  }, [darkTheme]);

  useEffect(() =>
    localStorage.setItem(INVOICELIST, JSON.stringify(list), [list])
  );

  return (
    <Router>
      <variable.Provider
        value={{ list, setList, darkTheme, setDarkTheme, create, setCreate }}
      >
        <div className="app">
          <div
            className={`app__backdrop ${
              create ? "app__backdrop__triggered" : ""
            }`}
          ></div>
          <Sidebar />

          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/invoice/:id" render={() => <Detail />}></Route>
          </Switch>
        </div>
      </variable.Provider>
    </Router>
  );
}
