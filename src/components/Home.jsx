import { useState, useMemo } from "react";
import List from "./List";
import Checkbox from "./Checkbox";
import Create from "./Create";

export default function Home({ list, setList }) {
  const [filter, setFilter] = useState("");
  const [create, setCreate] = useState(false);

  const paidStatus = list.filter((i) => i.status === "paid");
  const pendingStatus = list.filter((i) => i.status === "pending");
  const draftStatus = list.filter((i) => i.status === "draft");

  const total = useMemo(() => list.reduce((count) => count + 1, 0), [list]);

  return (
    <div className="home">
      <aside style={create ? {display :"block"} : {display: "none"}}>
        <Create list={list} setList={setList} />
      </aside>

      <div className="home__title">
        <div>
          <h1>Invoices</h1>
          <p>{`There are ${total} total invoices.`}</p>
        </div>

        <div>
          <div>
            <div>
              <p>Filter by Status</p>
              <img src="/images/icon-arrow-down.svg" alt="arrow" />
            </div>

            {/* filter container */}

            <div>
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

          <div>
            <button onClick={() => setCreate(true)}>
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
  );
}
