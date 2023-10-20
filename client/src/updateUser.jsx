import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [hobbies, setHobbies] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://reactcrud-l6xd.onrender.com/getUser/" + id)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setPhone(result.data.phone);
        setHobbies(result.data.hobbies);
      })
      .catch((err) => console.log(err));
  }, []);
  const update = (e) => {
    e.preventDefault();
    axios
      .put("https://reactcrud-l6xd.onrender.com/updateUser/" + id, {
        name,
        email,
        phone,
        hobbies,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div class="container mt-5">
      <form onSubmit={update}>
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            class="form-control"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="hobbies">Hobbies:</label>
          <textarea
            class="form-control"
            id="hobbies"
            name="hobbies"
            placeholder="Enter your hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
