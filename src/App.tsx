import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import Header from './components/Header';
import Countries from './components/Countries';
import Country from './components/Country';

function App() {
  return (
    
    <div className="dark" >
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/countries/:name" element={<Country />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
