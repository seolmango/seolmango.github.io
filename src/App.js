import {BrowserRouter, Routes, Route} from "react-router-dom";
import MyNavbar from "./etc/navbar";
import Main from "./pages/main";
import Projects from "./pages/projects";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import {createContext, useState} from "react";

const get_user_theme = () => {
    const user_theme = localStorage.getItem("theme");
    if (user_theme) {
        return user_theme;
    } else {
        if (!window.matchMedia) return "dark";
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        } else {
            return "light";
        }
    }
}
export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState(get_user_theme());

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
        localStorage.setItem("theme", theme === "light" ? "dark" : "light");
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
