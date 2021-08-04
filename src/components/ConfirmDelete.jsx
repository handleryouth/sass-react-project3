import { useHistory } from "react-router-dom";

export default function ConfirmDelete({ id, setList, setApprove }) {
  const history = useHistory();

  function HandleDelete(id) {
    setList((prevState) => prevState.filter((i) => i.id !== id));
    history.push("/");
  }

  function Cancel() {
    setApprove(false);
    history.push(`/invoice/${id}`);
  }
  return (
    <div className="detail__command__array__confirmation__container">
      <h1>Confirm Delete</h1>
      <p>
        Are you sure you want to delete invoice {id}? This action cannot be
        undone.
      </p>
      <div>
        <button className="detail__command__array__confirmation__container__cancel" onClick={Cancel}>Cancel</button>
        <button className="detail__command__array__confirmation__container__delete"  id={id} onClick={(e) => HandleDelete(e.target.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
