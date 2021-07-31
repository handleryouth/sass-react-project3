import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Edit(props) {
  const { title, setList, setEdit, ...i } = props;
  const editTemplate = { ...i };
  const [item, setItem] = useState(i.items);
  const [editList, setEditList] = useState(editTemplate);

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
        : event.id === "createdAt"
        ? {
            ...prevState,
            createdAt: event.value,
          }
        : event.id === "description"
        ? {
            ...prevState,
            description: event.value,
          }
        : event.id === "createdAt"
        ? {
            ...prevState,
            createdAt: event.value.toString(),
          }
        : event.id === "netvalue"
        ? {
            ...prevState,
            paymentTerms: parseInt(event.value),
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
  }

  function HandleCancel() {
    setEdit(false);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <h1>
          {title}#{i.id}
        </h1>
      </div>

      <div>
        <div>
          <h3>bill From</h3>

          <div>
            <label htmlFor="streetFrom">Street Address</label>
            <input
              onChange={(e) => HandleChangeFrom(e.target)}
              type="text"
              id="streetFrom"
              value={editList.senderAddress.street}
              required
            />
          </div>

          <div>
            <div>
              <label htmlFor="cityFrom">City</label>
              <input
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="cityFrom"
                value={editList.senderAddress.city}
                required
              />
            </div>

            <div>
              <label htmlFor="postcodeFrom">Post Code</label>
              <input
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="postCodeFrom"
                value={editList.senderAddress.postCode}
                required
              />
            </div>

            <div>
              <label htmlFor="countryFrom">Country</label>
              <input
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="countryFrom"
                value={editList.senderAddress.country}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Bill To</h3>

          <div>
            <label htmlFor="clientName">Client's Name</label>
            <input
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="clientName"
              value={editList.clientName}
              required
            />
          </div>

          <div>
            <label htmlFor="clientEmail">Client's Email</label>
            <input
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="clientEmail"
              value={editList.clientEmail}
              required
            />
          </div>

          <div>
            <label htmlFor="streetTo">Street Address</label>
            <input
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="streetTo"
              value={editList.clientAddress.street}
              required
            />
          </div>

          <div>
            <div>
              <label htmlFor="cityTo">City</label>
              <input
                onChange={(e) => HandleChangeTo(e.target)}
                type="text"
                id="cityTo"
                value={editList.clientAddress.city}
                required
              />
            </div>

            <div>
              <label htmlFor="postCodeTo">Post Code</label>
              <input
                onChange={(e) => HandleChangeTo(e.target)}
                type="text"
                id="postCodeTo"
                value={editList.clientAddress.postCode}
                required
              />
            </div>

            <div>
              <label htmlFor="countryTo">Country</label>
              <input
                onChange={(e) => HandleChangeTo(e.target)}
                type="text"
                id="countryTo"
                value={editList.clientAddress.country}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="createdAt">Invoice Date</label>
              <input
                onChange={(e) => HandleChangeTo(e.target)}
                type="date"
                id="createdAt"
                value={editList.createdAt}
                required
              />
            </div>

            <div>
              <label htmlFor="netvalue">Payment Terms</label>
              <select onChange={(e) => HandleChangeTo(e.target)} id="netvalue">
                <option value="1day">Net 1 Day</option>
                <option value="7days">Net 7 Days</option>
                <option value="14days">Net 14 Days</option>
                <option value="30days">Net 30 Days</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="description"
              value={editList.description}
              required
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
                {item.map((x, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
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
                          required
                        />
                      </td>
                      <td>
                        <input
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
                          required
                        />
                      </td>
                      <td>
                        <input
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
                          required
                        />
                      </td>
                      <td>
                        <p>{x.total}</p>
                      </td>
                      <td>
                        <button
                          id={x.id}
                          onClick={(e) => HandleDeleteItem(e.target.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <button onClick={HandleChangeItem}> + Add New Item</button>
      </div>

      <div>
        <button type="reset" onClick={() => HandleCancel()}>
          Cancel
        </button>
        <button
          id={i.id}
          onClick={(e) => {
            HandleSaveChanges(e.target.id);
          }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
