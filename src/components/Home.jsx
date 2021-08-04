import { useState, useMemo, useContext } from "react";
import Media from "react-media";
import List from "./List";
import Checkbox from "./Checkbox";
import Create from "./Create";
import { variable } from "../App";

export default function Home() {
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState(false);
  const { list, setList, create, setCreate, darkTheme } = useContext(variable);

  const paidStatus = list.filter((i) => i.status === "paid");
  const pendingStatus = list.filter((i) => i.status === "pending");
  const draftStatus = list.filter((i) => i.status === "draft");

  const total = useMemo(() => list.reduce((count) => count + 1, 0), [list]);

  return (
    <div
      style={darkTheme ? { backgroundColor: "#141625" } : null}
      className="app-home"
    >
      <aside>
        <Create
          list={list}
          setList={setList}
          setCreate={setCreate}
          create={create}
        />
      </aside>

      <div className="home">
        <div className="home__title">
          <div
            style={darkTheme ? { color: "white" } : null}
            className="home__title__header"
          >
            <h1>Invoices</h1>
            <p>{`There are ${total} total invoices.`}</p>
          </div>

          <div className="home__title__command">
            <div
              style={darkTheme ? { color: "white" } : null}
              className="home__title__command__filter"
            >
              <div
                onClick={() => setStatus((prevState) => !prevState)}
                className="home__title__command__status"
              >
                <Media query="(max-width: 856px)">
                  {(matches) =>
                    matches ? <p>Filter</p> : <p>Filter by Status</p>
                  }
                </Media>

                <img src="/images/icon-arrow-down.svg" alt="arrow" />
              </div>

              {/* filter container */}

              <div
                style={
                  status
                    ? darkTheme
                      ? { display: "block", backgroundColor: "#141625" }
                      : null
                    : { display: "none" }
                }
                className="home__title__command__checkbox"
              >
                <Checkbox
                  status="paid"
                  setFilter={setFilter}
                  id="filter1"
                  filter={filter}
                />

                <Checkbox
                  status="pending"
                  setFilter={setFilter}
                  id="filter2"
                  filter={filter}
                />

                <Checkbox
                  status="draft"
                  setFilter={setFilter}
                  id="filter3"
                  filter={filter}
                />
              </div>
            </div>

            <div className="home__title__command__button">
              <button onClick={() => setCreate((prevState) => !prevState)}>
                <span>+</span>
                New Invoice
              </button>
            </div>
          </div>
        </div>

        <div className="home__data">
          {filter === "paid"
            ? paidStatus.map((i) => <List {...i} key={i.id} />)
            : filter === "pending"
            ? pendingStatus.map((i) => <List {...i} key={i.id} />)
            : filter === "draft"
            ? draftStatus.map((i) => <List {...i} key={i.id} />)
            : list.map((i) => <List {...i} key={i.id} />)}
        </div>
      </div>
    </div>
  );
}
