export default function Checkbox(props) {
  const { status, setFilter, id, filter } = props;

  function CheckFilter(criteria) {
    setFilter((prevState) => (prevState === criteria ? "" : criteria));
  }

  return (
    <>
      <div className={id}>
        <input
          onChange={() => CheckFilter(status)}
          type="checkbox"
          id={id}
          checked={filter === status ? true : false}
        />
        <label htmlFor="filter1">{status}</label>
      </div>
    </>
  );
}
