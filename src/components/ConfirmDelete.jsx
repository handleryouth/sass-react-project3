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
    <>
      <h1>Confirm Delete</h1>
      <p>
        Are you sure you want to delete invoice {id}? This action cannot be
        undone.
      </p>
      <div>
        <button onClick={Cancel}>Cancel</button>
        <button id={id} onClick={(e) => HandleDelete(e.target.id)}>
          Delete
        </button>
      </div>
    </>
  );
}
