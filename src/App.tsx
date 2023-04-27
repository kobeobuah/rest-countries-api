import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import Header from './components/Header';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';

function App() {
  return (
    
    <div className="dark" >
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/countries/:name" element={<CountryDetails />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
