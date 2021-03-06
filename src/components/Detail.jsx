import { useState, useContext } from "react";
import Media from "react-media";
import { useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ConfirmDelete from "./ConfirmDelete";
import Edit from "./Edit";
import { variable } from "../App";

export default function Detail() {
  const { list, setList, darkTheme } = useContext(variable);
  const [approve, setApprove] = useState(false);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  const selectedData = list.filter((i) => i.id === id);

  function MarkAsPaid(id) {
    setList((prevState) =>
      prevState.map((x) => (x.id === id ? { ...x, status: "paid" } : x))
    );
  }

  return selectedData.map((i) => {
    return (
      <div
        style={darkTheme ? { backgroundColor: "#141625" } : null}
        key={i.id}
        className="app-detail"
      >
        <aside>
          <Edit
            {...i}
            key={i.id}
            title="Edit"
            setList={setList}
            setEdit={setEdit}
            edit={edit}
          />
        </aside>

        <div
          className={`app__backdrop ${edit ? "app__backdrop__triggered" : ""}`}
        ></div>

        <div key={i.id} className="detail">
          <Link to="/">
            <div className="detail__back">
              <img src="/images/icon-arrow-left.svg" alt="Back" />
              <p style={darkTheme ? { color: "white" } : null}>Go Back</p>
            </div>
          </Link>

          <div
            style={darkTheme ? { backgroundColor: "rgb(30, 33, 57)" } : null}
            className="detail__command"
          >
            <div className="detail__command__status">
              <p style={darkTheme ? { color: "white" } : null}>Status</p>
              <div
                className={`detail__command__status__container detail__command__status__container-${
                  i.status === "paid"
                    ? "paid"
                    : i.status === "pending"
                    ? "pending"
                    : "draft"
                }`}
              >
                <div
                  className={`detail__command__status__container--bullet detail__command__status__container--bullet-${
                    i.status === "paid"
                      ? "paid"
                      : i.status === "pending"
                      ? "pending"
                      : "draft"
                  }`}
                />
                <p className="detail__command__status__container--description">
                  {i.status}
                </p>
              </div>
            </div>

            <div className="detail__command__array">
              <button
                className="detail__command__array__edit"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
              <button
                className="detail__command__array__delete"
                id={i.id}
                onClick={() => {
                  setApprove(true);
                }}
              >
                Delete
              </button>
              {i.status !== "paid" ? (
                <button
                  className="detail__command__array__mark"
                  id={i.id}
                  onClick={(e) => MarkAsPaid(e.target.id)}
                >
                  {/* litte rounded thing goes here */}
                  <div></div>
                  Mark as paid
                </button>
              ) : (
                ""
              )}

              <div
                style={approve ? null : { display: "none" }}
                className="detail__command__array__confirmation"
              >
                <ConfirmDelete
                  id={i.id}
                  setList={setList}
                  setApprove={setApprove}
                />
              </div>
            </div>
          </div>

          {/* batas pertama */}
          <div
            style={
              darkTheme
                ? { backgroundColor: "rgb(30, 33, 57)", color: "white" }
                : null
            }
            className="detail__info"
          >
            <div className="detail__info__grid-1-1">
              <h2>#{id}</h2>
              <p>{i.description}</p>
            </div>

            <div className="detail__info__grid-1-2">
              <p>{i.senderAddress.street}</p>
              <p>{i.senderAddress.city}</p>
              <p>{i.senderAddress.postCode}</p>
              <p>{i.senderAddress.country}</p>
            </div>

            {/* btas pertama */}

            {/* batas kedua */}

            <div className="detail__info__grid-2-1">
              <p>Invoice Date</p>
              <p>{i.createdAt}</p>
            </div>

            <div className="detail__info__grid-3-1">
              <p>Payment Due</p>
              <p>{i.paymentDue}</p>
            </div>

            <div className="detail__info__grid-2-2">
              <p>Bill to</p>
              <h2>{i.clientName}</h2>
              <p>{i.clientAddress.street}</p>
              <p>{i.clientAddress.city}</p>
              <p>{i.clientAddress.postCode}</p>
              <p>{i.clientAddress.country}</p>
            </div>

            <div className="detail__info__grid-2-3">
              <p>Sent to</p>
              <p>
                <strong>{i.clientEmail}</strong>
              </p>
            </div>

            {/* batas kedua */}

            {/* batas ketiga */}

            <table className="detail__info__grid-4-full">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <Media query="(max-width: 460px)">
                    {(matches) =>
                      matches ? (
                        <>
                          <th></th>
                          <th></th>
                        </>
                      ) : (
                        <>
                          <th>QTY</th>
                          <th>Price</th>
                        </>
                      )
                    }
                  </Media>

                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {i.items.map((x) => {
                  return (
                    <tr key={uuidv4()}>
                      <td>{x.name}</td>
                      <Media query="(max-width: 460px)">
                        {(matches) =>
                          matches ? (
                            <>
                              <td></td>
                              <td></td>
                            </>
                          ) : (
                            <>
                              <td>{x.quantity}</td>
                              <td>??{x.price}</td>
                            </>
                          )
                        }
                      </Media>

                      <td>??{x.total}</td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot className="detail__info__grid-4-full__table-footer">
                <tr>
                  <td>Amount Due</td>
                  <td></td>
                  <td></td>
                  <td>
                    ??
                    {i.items.reduce((count, item) => {
                      return item.total + count;
                    }, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* batas ketiga */}
          </div>
        </div>
      </div>
    );
  });
}
