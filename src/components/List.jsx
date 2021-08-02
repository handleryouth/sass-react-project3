import { useContext } from "react";
import { Link } from "react-router-dom";
import { variable } from "../App";

export default function List(props) {
  const { id, paymentDue, clientName, items, status } = props;
  const { darkTheme } = useContext(variable);

  return (
    <Link to={`/invoice/${id}`} className="list__link">
      <button style={darkTheme ? { backgroundColor: "#141625", color: "white" } : null} className="list__link__button">
        <h2 className="list__link__button--header">#{id}</h2>
        <p className="list__link__button--due">Due {paymentDue}</p>
        <p className="list__link__button--client">{clientName}</p>
        <p className="list__link__button--total">
          £
          {items.reduce((count, item) => {
            return item.total + count;
          }, 0)}
        </p>

        <div
          className={`list__link__button--status list__link__button--status-${
            status === "paid"
              ? "paid"
              : status === "pending"
              ? "pending"
              : "draft"
          } `}
        >
          <div
            className={`list__link__button--status--bullet list__link__button--status--bullet-${
              status === "paid"
                ? "paid"
                : status === "pending"
                ? "pending"
                : "draft"
            }`}
          />
          <p className="list__link__button--status-text">
            {status === "paid"
              ? "paid"
              : status === "pending"
              ? "pending"
              : "draft"}
          </p>
        </div>
      </button>
    </Link>
  );
}
