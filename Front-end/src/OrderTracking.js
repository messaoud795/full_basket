import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./OrderTracking.css";
import Header from "./Header";
import OrderStatus from "./OrderStatus";

function OrderTracking() {
  const [orders, setorders] = useState([]);
  const [stat, setstat] = useState();
  const [orderId, setorderId] = useState("");
  let token = window.localStorage.getItem("token");

  //get the list of order from the database
  useEffect(() => {
    axios
      .get("/api/order", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setorders(res.data.reverse());
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="orderTracking">
      <Header></Header>

      {orders.length === 0 ? (
        setTimeout(() => <h2> Create your first order</h2>, 1000)
      ) : (
        <div className="orderTracking_content">
          <div className="orderTracking_timeline">
            <h2>{`Order Id : ${orderId}`}</h2>
            <p>Click on order Id in the table to view its status</p>
            <OrderStatus stat={stat} />
          </div>
          <div className="orderTracking_details">
            <h2>Orders :</h2>
            <table className="order_table" id="orderTrackingTable">
              <tbody>
                <tr key={0}>
                  <th>OrderId</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
                {orders.map((order, i) => {
                  return (
                    <tr key={i + 1} id="orderId">
                      <td
                        onClick={() => {
                          setorderId(order.sid);
                          setstat(order.status);
                        }}
                      >
                        <strong>{order.sid}</strong>
                      </td>
                      <td>
                        <table className="productsOrdred">
                          <tbody>
                            {order.productsOrdred.map((productOrdred, z) => (
                              <tr key={z}>
                                <td>{productOrdred.product?.title}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <table className="productsOrdred">
                          <tbody>
                            {order.productsOrdred.map((productOrdred, j) => {
                              return (
                                <tr key={j}>
                                  <td>{productOrdred.product?.price}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <table className="productsOrdred">
                          <tbody>
                            {order.productsOrdred.map((productOrdred, j) => {
                              return (
                                <tr key={j}>
                                  <td>{productOrdred.quantityOrdred}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                      <td>{order.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderTracking;
