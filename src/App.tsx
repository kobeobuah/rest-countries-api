import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import Header from './components/Header';
import Countries from './components/Countries';

function App() {
  return (
    
    <div className="dark" >
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Countries />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
