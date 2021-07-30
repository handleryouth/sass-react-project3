import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Edit(props) {
  const { title, setList, ...i } = props;
  const [item, setItem] = useState(i.items);

  function HandleChangeFrom(event) {
    setList((prevState) =>
      prevState.map((x) =>
        x.id === i.id
          ? {
              ...x,
              senderAddress: {
                street:
                  event.id === "streetFrom"
                    ? event.value
                    : x.senderAddress.street,
                city:
                  event.id === "cityFrom" ? event.value : x.senderAddress.city,
                postCode:
                  event.id === "postCodeFrom"
                    ? event.value
                    : x.senderAddress.postCode,
                country:
                  event.id === "countryFrom"
                    ? event.value
                    : x.senderAddress.country,
              },
            }
          : x
      )
    );
  }

  function HandleChangeTo(event) {
    setList((prevState) =>
      prevState.map((x) =>
        x.id === i.id
          ? event.id === "streetTo" ||
            event.id === "cityTo" ||
            event.id === "postCodeTo" ||
            event.id === "countryTo"
            ? {
                ...x,
                clientAddress: {
                  street:
                    event.id === "streetTo"
                      ? event.value
                      : x.clientAddress.street,
                  city:
                    event.id === "cityTo" ? event.value : x.clientAddress.city,
                  postCode:
                    event.id === "postCodeTo"
                      ? event.value
                      : x.clientAddress.postCode,
                  country:
                    event.id === "countryTo"
                      ? event.value
                      : x.clientAddress.country,
                },
              }
            : event.id === "clientName"
            ? {
                ...x,
                clientName: event.value,
              }
            : event.id === "clientEmail"
            ? {
                ...x,
                clientEmail: event.value,
              }
            : event.id === "createdAt"
            ? {
                ...x,
                createdAt: event.value,
              }
            : event.id === "description"
            ? {
                ...x,
                description: event.value,
              }
            : event.id === "createdAt"
            ? {
                ...x,
                createdAt: event.value.toString(),
              }
            : ""
          : x
      )
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
      prevState.map((x) => (x.id === id ? { ...x, items: item } : x))
    );
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
              value={i.senderAddress.street}
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
                value={i.senderAddress.city}
                required
              />
            </div>

            <div>
              <label htmlFor="postcodeFrom">Post Code</label>
              <input
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="postCodeFrom"
                value={i.senderAddress.postCode}
                required
              />
            </div>

            <div>
              <label htmlFor="countryFrom">Country</label>
              <input
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="countryFrom"
                value={i.senderAddress.country}
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
              value={i.clientName}
              required
            />
          </div>

          <div>
            <label htmlFor="clientEmail">Client's Email</label>
            <input
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="clientEmail"
              value={i.clientEmail}
              required
            />
          </div>

          <div>
            <label htmlFor="streetTo">Street Address</label>
            <input
              onChange={(e) => HandleChangeTo(e.target)}
              type="text"
              id="streetTo"
              value={i.clientAddress.street}
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
                value={i.clientAddress.city}
                required
              />
            </div>

            <div>
              <label htmlFor="postCodeTo">Post Code</label>
              <input
                onChange={(e) => HandleChangeTo(e.target)}
                type="text"
                id="postCodeTo"
                value={i.clientAddress.postCode}
                required
              />
            </div>

            <div>
              <label htmlFor="countryTo">Country</label>
              <input
                onChange={(e) => HandleChangeTo(e.target)}
                type="text"
                id="countryTo"
                value={i.clientAddress.country}
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
                value={i.createdAt}
                required
              />
            </div>

            <div>
              <label htmlFor="netvalue">Payment Terms</label>
              <select id="netvalue">
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
              value={i.description}
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
        <button>Cancel</button>
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
