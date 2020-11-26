import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
import HeaderAdmin from "./HeaderAdmin";
import {Button} from 'react-bootstrap'

function Users() {
  const [users, setusers] = useState([]);
  let tokenAdmin = window.localStorage.getItem("tokenAdmin");
  function getUsers() {
       axios
      .get("/api/user/all", {
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      })
      .then((res) => {
        setusers(res.data.reverse());
      })
      .catch((err) => console.log(err));
  }
//get the list of order from the database
  useEffect(() => {
   getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
//update user status
function updateUserStatus(id,stat) {
    axios
      .put("/api/user/update",{_id:id,isAdmin:!stat},{
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      })
      .then(({data}) => {
        if (data) getUsers();
      })
      .catch((err) => console.log(err));
}


  return (
    <div className= "usersList">
      <HeaderAdmin></HeaderAdmin>
      <div className="users">
        <h2>List of users :</h2>
        <table className='order_table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>address</th>
              <th>isAdmin</th>
              <th>update</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (<tr key={i}>
                <td>{user.firstName+ " "+ user.lastName}</td>
                <td>{user.address}</td>
                <td>{user.isAdmin? "Admin" : "user"}</td>
              <td><Button variant="primary" onClick={()=>updateUserStatus(user._id,user.isAdmin)} className='users_updateBtn'>
                  {user.isAdmin? "Remote" : "Promote"}</Button></td>
              </tr>)
            }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
