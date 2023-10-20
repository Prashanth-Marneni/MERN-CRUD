import { BrowserRouter, Route,Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Users from "./Users";
import UpdateUser from './updateUser';
import CreateUser from "./createUser";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {<Users/>}></Route>
        <Route exact path="/update/:id" element = {<UpdateUser/>}></Route>
        <Route exact path="/create" element = {<CreateUser/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
