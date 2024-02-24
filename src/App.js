import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import MyNavbar from "./etc/navbar";
import Main from "./pages/main";
import Projects from "./pages/projects";
import Detail from "./pages/detail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/projects/detail/:name" element={<Detail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:page" element={<Projects />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
