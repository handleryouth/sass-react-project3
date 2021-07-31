import { useState, useEffect } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default function Edit({setList, setCreate }) {
  const [from, setFrom] = useState(createTemplate.senderAddress);
  const [newList, setNewList] = useState(createTemplate);
  const [itemList, setItemList] = useState([]);
  console.log(newList);

  useEffect(
    () => setNewList((prevState) => ({ ...prevState, items: itemList })),
    [itemList]
  );

  useEffect(
    () => setNewList((prevState) => ({ ...prevState, senderAddress: from })),
    [from]
  );

  function HandleCreateFrom(id, value) {
    console.log(id, value);
    setFrom((prevState) =>
      id === "streetFrom"
        ? { ...prevState, street: value }
        : id === "cityFrom"
        ? { ...prevState, city: value }
        : id === "postCodeFrom"
        ? { ...prevState, postCode: value }
        : id === "countryFrom"
        ? { ...prevState, country: value }
        : ""
    );
  }

  function HandleCreateTo(id, value) {
    console.log(id, value);
    setNewList((prevState) =>
      id === "streetTo" ||
      id === "cityTo" ||
      id === "postCodeTo" ||
      id === "countryTo"
        ? {
            ...prevState,
            clientAddress: {
              street:
                id === "streetTo" ? value : prevState.clientAddress.street,
              city: id === "cityTo" ? value : prevState.clientAddress.city,
              postCode:
                id === "postCodeTo" ? value : prevState.clientAddress.postCode,
              country:
                id === "countryTo" ? value : prevState.clientAddress.country,
            },
          }
        : id === "clientName"
        ? {
            ...prevState,
            clientName: value,
          }
        : id === "clientEmail"
        ? {
            ...prevState,
            clientEmail: value,
          }
        : id === "description"
        ? {
            ...prevState,
            description: value,
          }
        : id === "createdAt"
        ? {
            ...prevState,
            createdAt: value,
            paymentDue:
              prevState.paymentTerms.toString() !== "" &&
              moment(value, "YYYY-MM-DD")
                .add(prevState.paymentTerms, "d")
                .format("YYYY-MM-DD"),
          }
        : id === "paymentterm"
        ? {
            ...prevState,
            paymentTerms: parseInt(value),
            paymentDue:
              prevState.createdAt !== "" &&
              moment(prevState.createdAt, "YYYY-MM-DD")
                .add(parseInt(value), "d")
                .format("YYYY-MM-DD"),
          }
        : ""
    );
  }

  function HandleAddItem() {
    const itemTemplate = {
      id: uuidv4(),
      name: "",
      quantity: "",
      price: "",
      total: "",
    };

    setItemList((prevState) => [...prevState, itemTemplate]);
  }

  function HandleEditItem(id, value, name) {
    setItemList((prevState) =>
      prevState.map((x) =>
        x.id === id
          ? name === "name"
            ? { ...x, name: value }
            : name === "quantity"
            ? { ...x, quantity: value, total: value * x.price }
            : name === "price"
            ? { ...x, price: value, total: value * x.quantity }
            : ""
          : x
      )
    );
  }

  function HandleAddToTheList() {
    setList((prevState) => [
      ...prevState,
      {
        ...newList,
        status: "pending",
        id: uuidv4().slice(0, 6).toUpperCase(),
      },
    ]);
  }

  function HandleCancel() {
    setCreate(false);
    setFrom(createTemplate.senderAddress);
    setNewList(createTemplate);
    setItemList([]);
  }

  function HandleDraft() {
    setList((prevState) => [
      ...prevState,
      {
        ...newList,
        id: uuidv4().slice(0, 6).toUpperCase(),
      },
    ]);
    setCreate(false);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <h1>Create Invoice</h1>
      </div>

      <div>
        <div>
          <h3>bill From</h3>

          <div>
            <label htmlFor="streetFrom">Street Address</label>
            <input
              onChange={(e) => HandleCreateFrom(e.target.id, e.target.value)}
              type="text"
              id="streetFrom"
            />
          </div>

          <div>
            <div>
              <label htmlFor="cityFrom">City</label>
              <input
                onChange={(e) => HandleCreateFrom(e.target.id, e.target.value)}
                type="text"
                id="cityFrom"
              />
            </div>

            <div>
              <label htmlFor="postcodeFrom">Post Code</label>
              <input
                onChange={(e) => HandleCreateFrom(e.target.id, e.target.value)}
                type="text"
                id="postCodeFrom"
              />
            </div>

            <div>
              <label htmlFor="countryFrom">Country</label>
              <input
                onChange={(e) => HandleCreateFrom(e.target.id, e.target.value)}
                type="text"
                id="countryFrom"
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Bill To</h3>

          <div>
            <label htmlFor="clientName">Client's Name</label>
            <input
              onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
              type="text"
              id="clientName"
            />
          </div>

          <div>
            <label htmlFor="clientEmail">Client's Email</label>
            <input
              onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
              type="text"
              id="clientEmail"
            />
          </div>

          <div>
            <label htmlFor="streetTo">Street Address</label>
            <input
              onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
              type="text"
              id="streetTo"
            />
          </div>

          <div>
            <div>
              <label htmlFor="cityTo">City</label>
              <input
                onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
                type="text"
                id="cityTo"
              />
            </div>

            <div>
              <label htmlFor="postCodeTo">Post Code</label>
              <input
                onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
                type="text"
                id="postCodeTo"
              />
            </div>

            <div>
              <label htmlFor="countryTo">Country</label>
              <input
                onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
                type="text"
                id="countryTo"
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="createdAt">Invoice Date</label>
              <input
                onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
                type="date"
                id="createdAt"
              />
            </div>

            <div>
              <label htmlFor="paymentterm">Payment Terms</label>
              <select
                onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
                id="paymentterm"
              >
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              onChange={(e) => HandleCreateTo(e.target.id, e.target.value)}
              type="text"
              id="description"
            />
          </div>
        </div>

        <div>
          <h3>ItemList</h3>
          <div>
            <table>
              <thead>
                <tr>
                  <td>Item Name</td>
                  <td>Qty</td>
                  <td>Price</td>
                  <td>Total</td>
                  <td></td>
                </tr>
              </thead>

              <tbody>
                {itemList.map((x) => {
                  return (
                    <tr key={x.id}>
                      <td>
                        <input
                          id={x.id}
                          type="text"
                          name="name"
                          value={x.name}
                          onChange={(e) =>
                            HandleEditItem(
                              e.target.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          id={x.id}
                          type="number"
                          name="quantity"
                          value={x.quantity}
                          onChange={(e) =>
                            HandleEditItem(
                              e.target.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          id={x.id}
                          type="number"
                          name="price"
                          value={x.price}
                          onChange={(e) =>
                            HandleEditItem(
                              e.target.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </td>
                      <td>
                        <p>{x.total}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <button onClick={HandleAddItem}> + Add New Item</button>
      </div>

      <div>
        <button type="reset" onClick={HandleCancel}>
          Discard
        </button>

        <div>
          <button type="reset" onClick={HandleDraft}>
            Save as Draft
          </button>
          <button type="reset" onClick={HandleAddToTheList}>
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}

const createTemplate = {
  id: "",
  createdAt: "",
  paymentDue: "",
  description: "",
  paymentTerms: 1,
  clientName: "",
  clientEmail: "",
  status: "draft",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [],
  total: "",
};
