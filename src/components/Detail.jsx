import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ConfirmDelete from "./ConfirmDelete";
import Edit from "./Edit";

export default function Detail({ list, setList }) {
  const [approve, setApprove] = useState(false);
  const { id } = useParams();

  const selectedData = list.filter((i) => i.id === id);

  function MarkAsPaid(id) {
    setList((prevState) =>
      prevState.map((x) => (x.id === id ? { ...x, status: "paid" } : x))
    );
  }

  return selectedData.map((i) => {
    return (
      <div key={uuidv4()} className="detail">
        <aside>
          <Edit {...i} title="Edit" setList={setList} />
        </aside>

        <Link to="/">
          <div className="detail__back">
            <img src="/images/icon-arrow-left.svg" alt="Back" />
            <p>Go Back</p>
          </div>
        </Link>

        <div className="detail__command">
          <div className="detail__command--status">
            <p>Status</p>
            <p className="detail__command--status--description">{i.status}</p>
          </div>

          <div>
            <button>Edit</button>
            <button id={i.id} onClick={() => setApprove(true)}>
              Delete
            </button>
            {i.status !== "paid" ? (
              <button id={i.id} onClick={(e) => MarkAsPaid(e.target.id)}>
                {/* litte rounded thing goes here */}
                <div></div>
                Mark as paid
              </button>
            ) : (
              ""
            )}

            <div style={approve ? { display: "block" } : { display: "none" }}>
              <ConfirmDelete
                id={i.id}
                setList={setList}
                setApprove={setApprove}
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            <h2>#{id}</h2>
            <p>{i.description}</p>
          </div>

          <div>
            <p>{i.senderAddress.street}</p>
            <p>{i.senderAddress.city}</p>
            <p>{i.senderAddress.postCode}</p>
            <p>{i.senderAddress.country}</p>
          </div>
        </div>

        <div>
          <div>
            <p>Invoice Date</p>
            <p>{i.createdAt}</p>
          </div>

          <div>
            <p>Payment Due</p>
            <p>{i.paymentDue}</p>
          </div>

          <div>
            <p>Bill to</p>
            <h2>{i.clientName}</h2>
            <p>{i.clientAddress.street}</p>
            <p>{i.clientAddress.city}</p>
            <p>{i.clientAddress.postCode}</p>
            <p>{i.clientAddress.country}</p>
          </div>

          <div>
            <p>Sent to</p>
            <p></p>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>QTY</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {i.items.map((x) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{x.name}</td>
                    <td>{x.quantity}</td>
                    <td>£{x.price}</td>
                    <td>£{x.total}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td>Amount Due</td>
                <td></td>
                <td></td>
                <td>£{i.total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  });
}
