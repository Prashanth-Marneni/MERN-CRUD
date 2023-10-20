const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.REACT_APP_GMAIL,
    pass: process.env.REACT_APP_GMAIL_PASSWORD,
  },
});

const app = express();
app.use(cors());
app.use(express.json());

const dbURL = process.env.REACT_APP_MONGO_CONNECTION;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(dbURL, connectionParams)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      hobbies: req.body.hobbies,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/send-email", async (req, res) => {
  try {
    const objectIds = req.body.selectedRows;
    console.log(objectIds);
    const users = await UserModel.find({ _id: { $in: objectIds } });

    const emailContent = `
      <h1>User Details</h1>
      <table border="1" cellspacing="0" cellpadding="5">
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Hobbies</th>
        </tr>
        ${users
          .map(
            (user) => `
          <tr>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.hobbies}</td>
          </tr>`
          )
          .join("")}
      </table>
    `;
    const mailOptions = {
      from: "prashanthmarneni10@gmail.com",
      to: "info@redpositive.in",
      subject: "User Details",
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email sending failed" });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
