import { v4 as uuidv4 } from "uuid";

export default function Edit(props) {
  const { title, setList, ...i } = props;
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

  return (
    <div>
      <div>
        <h1>
          {title}#{i.id}
        </h1>
      </div>

      <label htmlFor="streetAddress">Street Address</label>
      <input
        onChange={(e) => HandleChangeFrom(e.target)}
        type="text"
        id="streetFrom"
        value={i.senderAddress.street}
      />

      {/* <div>
        <div>
          <h3>bill From</h3>

          <div></div>

          <div>
            <div>
              <label htmlFor="cityfrom">City</label>
              <input
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="cityFrom"
                value={i.senderAddress.city}
              />
            </div>

            <div>
              <label htmlFor="postcodefrom">Post Code</label>
              <input
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="postCodeFrom"
                value={i.senderAddress.postCode}
              />
            </div>

            <div>
              <label htmlFor="countryfrom">Country</label>
              <input
                onChange={(e) => HandleChangeFrom(e.target)}
                type="text"
                id="countryFrom"
                value={i.senderAddress.country}
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Bill To</h3>

          <div>
            <label htmlFor="clientname">Client's Name</label>
            <input type="text" id="clientname" value={i.clientName} />
          </div>

          <div>
            <label htmlFor="clientemail">Client's Email</label>
            <input type="text" id="clientemail" value={i.clientEmail} />
          </div>

          <div>
            <label htmlFor="streetto">Street Address</label>
            <input type="text" id="streetto" value={i.clientAddress.street} />
          </div>

          <div>
            <div>
              <label htmlFor="cityTo">City</label>
              <input type="text" id="cityTo" value={i.clientAddress.city} />
            </div>

            <div>
              <label htmlFor="postcodeto">Post Code</label>
              <input
                type="text"
                id="postcodeto"
                value={i.clientAddress.postCode}
              />
            </div>

            <div>
              <label htmlFor="countryto">Country</label>
              <input
                type="text"
                id="countryto"
                value={i.clientAddress.country}
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="invoicedate">Invoice Date</label>
              <input type="date" id="invoicedate" value={i.createdAt} />
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
            <input type="text" value={i.description} />
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
                {i.items.map((x) => {
                  return (
                    <tr key={uuidv4()}>
                      <td>{x.name}</td>
                      <td>{x.quantity}</td>
                      <td>{x.price}</td>
                      <td>{x.total}</td>
                      <td>Button</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <button> + Add New Item</button>
      </div>

      <div>
        <button>Cancel</button>
        <button>Save Changes</button>
      </div> */}
    </div>
  );
}
