import React from "react";
import Home from "./page/Home";
// import Signup from "./page/Signup";
import Login from "./page/Login";
import ViewAll from "./page/ViewAll";
import EditEntry from "./page/EditEntry";
import DeleteImage from "./page/DeleteImage";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            {" "}
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            {/* This is a comment */}
            <Route path="/viewall" element={<ViewAll />} />
            <Route path="/editentry" element={<EditEntry />} />
            <Route path="/deleteimage" element={<DeleteImage />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
