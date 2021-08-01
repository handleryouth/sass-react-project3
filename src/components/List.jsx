import { Link } from "react-router-dom";

export default function List(props) {
  const { id, paymentDue, clientName, items, status } = props;

  return (
    <Link to={`/invoice/${id}`} className="list__link">
      <button className="list__link__button">
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
