import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { createContext, useState } from "react";
import './index.css';
import Header from './components/Header';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

function App() {
  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="dark" id={theme}>
    <Router>
      <Header toggleTheme={toggleTheme}/>
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/countries/:name" element={<CountryDetails />} />
      </Routes>
    </Router>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
