import "./App.css";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/linkcomponents/Register";
import Login from "./components/linkcomponents/Login";
import Addstory from "./components/linkcomponents/Addstory";
import Manipulatestory from "./components/linkcomponents/Manipulatestory";
import Logout from "./components/linkcomponents/Logout";
import Viewstory from "./components/linkcomponents/Viewstory";
import AddNewSentence from "./components/AddNewSentence";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        //story related routes come here----------------------------------------
        <Route path="/addstory" element={<Addstory />}></Route>
        <Route path="/viewstory" element={<Viewstory />}></Route>
        <Route path="/manipulatestory" element={<Manipulatestory />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route
          path="/addnewsentence/:sentences/:id"
          element={<AddNewSentence />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
