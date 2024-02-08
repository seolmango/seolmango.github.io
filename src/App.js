import {BrowserRouter, Routes, Route} from "react-router-dom";
import MyNavbar from "./etc/navbar";
import Main from "./pages/main";
import Projects from "./pages/projects";
import Detail from "./pages/detail";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <MyNavbar/>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/projects/detail/:name" element={<Detail/>} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:page" element={<Projects />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
