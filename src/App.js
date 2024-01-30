import {BrowserRouter, Routes, Route} from "react-router-dom";
import MyNavbar from "./etc/navbar";
import Main from "./pages/main";
import Projects from "./pages/projects";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import {createContext, useState} from "react";

export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }
  return (
    <div className="App">
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <BrowserRouter>
              <MyNavbar current={theme} toggle={toggleTheme}/>
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/projects" element={<Projects />} />
              </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
    </div>
  );
}

export default App;
