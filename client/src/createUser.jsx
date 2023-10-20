import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreateUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [hobbies, setHobbies] = useState();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createUser", { name, email, phone, hobbies })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div class="container mt-5">
      <form onSubmit={submit}>
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hobbies" className="form-label">
            Hobbies
          </label>
          <input
            type="text"
            className="form-control"
            id="hobbies"
            name="hobbies"
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary m-2">
          ADD
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
