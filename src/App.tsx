import React from 'react';
import './index.css';
import Header from './components/Header';
import Filter from './components/Filter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Filter />
        
      </header>
    </div>
  );
}

export default App;
