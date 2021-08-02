import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { variable } from "../App";

export default function Edit(props) {
  const { title, setList, setEdit, edit, ...i } = props;
  const { darkTheme } = useContext(variable);
  const editTemplate = { ...i };
  const [item, setItem] = useState(i.items);
  const [editList, setEditList] = useState(editTemplate);
  console.log(editList);

  useEffect(() => {
    setEditList((prevState) => ({
      ...prevState,
      items: item,
      total: item.reduce((count, x) => x.total + count, 0),
    }));
  }, [item]);

  function HandleChangeFrom(event) {
    setEditList((prevState) => ({
      ...prevState,
      senderAddress: {
        street:
          event.id === "streetFrom"
            ? event.value
            : editList.senderAddress.street,
        city:
          event.id === "cityFrom" ? event.value : editList.senderAddress.city,
        postCode:
          event.id === "postCodeFrom"
            ? event.value
            : editList.senderAddress.postCode,
        country:
          event.id === "countryFrom"
            ? event.value
            : editList.senderAddress.country,
      },
    }));
  }

  function HandleChangeTo(event) {
    setEditList((prevState) =>
      event.id === "streetTo" ||
      event.id === "cityTo" ||
      event.id === "postCodeTo" ||
      event.id === "countryTo"
        ? {
            ...prevState,
            clientAddress: {
              street:
                event.id === "streetTo"
                  ? event.value
                  : editTemplate.clientAddress.street,
              city:
                event.id === "cityTo"
                  ? event.value
                  : editTemplate.clientAddress.city,
              postCode:
                event.id === "postCodeTo"
                  ? event.value
                  : editTemplate.clientAddress.postCode,
              country:
                event.id === "countryTo"
                  ? event.value
                  : editTemplate.clientAddress.country,
            },
          }
        : event.id === "clientName"
        ? {
            ...prevState,
            clientName: event.value,
          }
        : event.id === "clientEmail"
        ? {
            ...prevState,
            clientEmail: event.value,
          }
        : event.id === "description"
        ? {
            ...prevState,
            description: event.value,
          }
        : event.id === "createdAt"
        ? {
            ...prevState,
            createdAt: event.value,
            paymentDue: moment(event.value, "YYYY-MM-DD")
              .add(prevState.paymentTerms, "d")
              .format("YYYY-MM-DD"),
          }
        : event.id === "paymentterms"
        ? {
            ...prevState,
            paymentTerms: parseInt(event.value),
            paymentDue:
              prevState.createdAt !== "" &&
              moment(prevState.createdAt, "YYYY-MM-DD")
                .add(parseInt(event.value), "d")
                .format("YYYY-MM-DD"),
          }
        : ""
    );
  }

  function HandleChangeItem() {
    const itemTemplate = {
      id: uuidv4(),
      name: "",
      quantity: "",
      price: "",
      total: "",
    };

    setItem((prevState) => [...prevState, itemTemplate]);
  }

  function HandleItems(value, id, name) {
    setItem((prevState) =>
      prevState.map((x) =>
        x.id === id
          ? name === "name"
            ? {
                ...x,
                name: value,
              }
            : name === "quantity"
            ? {
                ...x,
                quantity: value,
                total: value * x.price,
              }
            : name === "price"
            ? {
                ...x,
                price: value,
                total: value * x.quantity,
              }
            : ""
          : x
      )
    );
  }

  function HandleDeleteItem(id) {
    setItem((prevState) => prevState.filter((x) => x.id !== id));
  }

  function HandleSaveChanges(id) {
    setList((prevState) =>
      prevState.map((x) =>
        x.id === id ? { ...x, editList, status: "pending", items: item } : x
      )
    );
    setEdit(false);
  }

  function HandleCancel() {
    setEdit(false);
  }

  const darkInput = {
    backgroundColor: "rgb(30, 33, 57)",
    border: "none",
    color: "white",
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`create ${edit ? "create__triggered" : ""}`}
      style={darkTheme ? { backgroundColor: "#141625", color: "white" } : null}
    >
      <div className="create__header">
        <h1>
          {title}#{i.id}
        </h1>
      </div>

      <div className="create__input">
        <div>
          <h3>bill From</h3>

          <div className="create__input__streetfrom">
            <label htmlFor="streetFrom">Street Address</label>
            <input
              style={darkTheme ? darkInput : null}
              onChange={(e) => HandleChangeFrom(e.target)}
              type="text"
              id="streetFrom"
              value={editList.senderAddress.street}
            />
          </div>

          <div className="create__input__detail">
            <div className="create__input__detail__child">
              <label htmlFor="cityFrom">City</label>
              <input
                style={darkTheme ? darkInput : null}
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="cityFrom"
                value={editList.senderAddress.city}
              />
            </div>

            <div className="create__input__detail__child">
              <label htmlFor="postcodeFrom">Post Code</label>
              <input
                style={darkTheme ? darkInput : null}
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="postCodeFrom"
                value={editList.senderAddress.postCode}
              />
            </div>

            <div className="create__input__detail__child">
              <label htmlFor="countryFrom">Country</label>
              <input
                style={darkTheme ? darkInput : null}
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="countryFrom"
                value={editList.senderAddress.country}
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Bill To</h3>

          <div className="create__input__clientname">
            <label htmlFor="clientName">Client's Name</label>
            <input
              style={darkTheme ? darkInput : null}
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="clientName"
              value={editList.clientName}
            />
          </div>

          <div className="create__input__clientemail">
            <label htmlFor="clientEmail">Client's Email</label>
            <input
              style={darkTheme ? darkInput : null}
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="clientEmail"
              value={editList.clientEmail}
            />
          </div>

          <div className="create__input__clientstreet">
            <label htmlFor="streetTo">Street Address</label>
            <input
              style={darkTheme ? darkInput : null}
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="streetTo"
              value={editList.clientAddress.street}
            />
          </div>

          <div className="create__input__clientdetail">
            <div className="create__input__clientdetail__child">
              <label htmlFor="cityTo">City</label>
              <input
                style={darkTheme ? darkInput : null}
                onChange={(e) => HandleChangeTo(e.target)}
                type="text"
                id="cityTo"
                value={editList.clientAddress.city}
              />
            </div>

            <div className="create__input__clientdetail__child">
              <label htmlFor="postCodeTo">Post Code</label>
              <input
                style={darkTheme ? darkInput : null}
                onChange={(e) => HandleChangeTo(e.target)}
                type="text"
                id="postCodeTo"
                value={editList.clientAddress.postCode}
              />
            </div>

            <div className="create__input__clientdetail__child">
              <label htmlFor="countryTo">Country</label>
              <input
                style={darkTheme ? darkInput : null}
                onChange={(e) => HandleChangeTo(e.target)}
                type="text"
                id="countryTo"
                value={editList.clientAddress.country}
              />
            </div>
          </div>

          <div className="create__input__date">
            <div className="create__input__date__invoicedate">
              <label htmlFor="createdAt">Invoice Date</label>
              <input
                style={darkTheme ? darkInput : null}
                onChange={(e) => HandleChangeTo(e.target)}
                type="date"
                id="createdAt"
                value={editList.createdAt}
              />
            </div>

            <div className="create__input__date__paymentterm">
              <label htmlFor="paymentterms">Payment Terms</label>
              <select
                style={darkTheme ? darkInput : null}
                onChange={(e) => HandleChangeTo(e.target)}
                id="paymentterms"
              >
                <option value="1day">Net 1 Day</option>
                <option value="7days">Net 7 Days</option>
                <option value="14days">Net 14 Days</option>
                <option value="30days">Net 30 Days</option>
              </select>
            </div>
          </div>

          <div className="create__input__description">
            <label htmlFor="description">Description</label>
            <input
              style={darkTheme ? darkInput : null}
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="description"
              value={editList.description}
            />
          </div>
        </div>

        <div className="create__itemlist">
          <h3>ItemList</h3>
          <div>
            <table className="create__itemlist__table">
              {item.length > 0 && (
                <thead>
                  <tr>
                    <td>Item Name</td>
                    <td>Qty</td>
                    <td>Price</td>
                    <td>Total</td>
                    <td></td>
                  </tr>
                </thead>
              )}

              <tbody>
                {item.map((x, index) => {
                  return (
                    <tr key={index}>
                      <td className="create__itemlist__table__itemname">
                        <input
                          style={darkTheme ? darkInput : null}
                          onChange={(e) =>
                            HandleItems(
                              e.target.value,
                              e.target.id,
                              e.target.name
                            )
                          }
                          id={x.id}
                          type="text"
                          name="name"
                          value={x.name}
                        />
                      </td>
                      <td className="create__itemlist__table__quantity">
                        <input
                          style={darkTheme ? darkInput : null}
                          onChange={(e) =>
                            HandleItems(
                              e.target.value,
                              e.target.id,
                              e.target.name
                            )
                          }
                          id={x.id}
                          type="number"
                          name="quantity"
                          value={x.quantity}
                        />
                      </td>
                      <td className="create__itemlist__table__price">
                        <input
                          style={darkTheme ? darkInput : null}
                          onChange={(e) =>
                            HandleItems(
                              e.target.value,
                              e.target.id,
                              e.target.name
                            )
                          }
                          id={x.id}
                          type="number"
                          name="price"
                          value={x.price}
                        />
                      </td>
                      <td className="create__itemlist__table__total">
                        <p>{x.total}</p>
                      </td>
                      <td className="create__itemlist__table__delete">
                        <img
                          onClick={(e) => HandleDeleteItem(e.target.id)}
                          id={x.id}
                          src="/images/icon-delete.svg"
                          alt="Delete Command"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <button className="create__input__additem" onClick={HandleChangeItem}>
          {" "}
          + Add New Item
        </button>
      </div>

      <div className="create__command">
        <button
          className="create__command__discard"
          type="reset"
          onClick={() => HandleCancel()}
        >
          Cancel
        </button>
        <div className="create__command__save">
          <button
            className="create__command__save__changes"
            id={i.id}
            onClick={(e) => {
              HandleSaveChanges(e.target.id);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
