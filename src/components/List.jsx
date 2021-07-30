import { Link } from "react-router-dom";

export default function List(props) {
  const { id, paymentDue, clientName, items, status } = props;

  return (
    <Link to={`/invoice/${id}`} className="list__link">
      <button className="list__link__button">
        <h2>#{id}</h2>
        <p>Due {paymentDue}</p>
        <p>{clientName}</p>
        <p>
          £
          {items.reduce((count, item) => {
            return item.total + count;
          }, 0)}
        </p>
        <p>
          {status === "paid"
            ? "paid"
            : status === "pending"
            ? "pending"
            : "draft"}
        </p>
      </button>
    </Link>
  );
}
