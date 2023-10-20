import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateUser from "./createUser";
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteUser/" + id)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleMail = (selectedRows) => {
    axios
      .post("http://localhost:3001/send-email", { selectedRows })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (id) => {
    const selected = selectedRows.includes(id);
    if (selected) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div>
      <div class="d-flex justify-content-center">
        <Link to="/create" className="btn btn-success m-2">
          Add+
        </Link>
        <Link
          onClick={() => handleMail(selectedRows)}
          className="btn btn-success m-2"
        >
          Send
        </Link>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Hobbies</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id} onClick={() => handleRowClick(user._id)}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user._id)}
                    onChange={() => {}}
                  />
                </label>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.hobbies}</td>
                <td>
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-success m-2"
                  >
                    Update
                  </Link>
                  <button
                    class="btn btn-danger"
                    onClick={(e) => handleDelete(user._id)}
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
  );
}

export default Users;
