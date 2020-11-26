import React, { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import axios from "axios";
import "./OrdersManagement.css"
import { useHistory } from "react-router-dom";

function OrdersManagement() {
  const [orderList, setorderList] = useState([]);
  let tokenAdmin = window.localStorage.getItem("tokenAdmin");
  const history = useHistory();
  //get the list of orders and users
  useEffect(() => {
    axios
      .get("/api/order/management", {
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      })
      .then((res) => {
        setorderList(res.data.reverse());
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get the latest status of an order
  function getStatus(order) {
    let stat = order.status.filter((el) => el.time.length > 2);
    return (
      stat[stat.length - 1].description + " in " + stat[stat.length - 1].time
    );
  }

  return (
    <div>
      <HeaderAdmin />
          <div className='orderManagement'>

      <h2>Customers and orders : </h2>
      <table className="order_table">
        <thead>
          <tr key={0}>
            <th>Customer Name</th>
            <th>OrderId</th>
            <th>Total price</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>
                  <table className="orderManagement_detailsTable">
                    <tbody>
                      {user.orderId.map((order) => (
                        <tr key={order.sid}>
                          <td id="order_sid"
                            onClick={() =>
                              history.push(`/admin/orders/${order.sid}`)
                            }
                          >
                            {order.sid}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="orderManagement_detailsTable">
                    <tbody>
                      {user.orderId.map((order) => (
                        <tr key={order.sid}>
                          <td>{order.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="orderManagement_detailsTable">
                    <tbody>
                      {user.orderId.map((order) => (
                        <tr key={order.sid}>
                          <td>{getStatus(order)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div> </div>

  );
}

export default OrdersManagement;
