import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ReadUsers from "./ReadUsers";
import UpdateUser from "./UpdateUser";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readusers/:id" element={<ReadUsers />} />
        <Route path="/updateusers/:id" element={<UpdateUser />} />

      </Routes>
    </div>
  );
}

export default App;
