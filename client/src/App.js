import React from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import FilterCartelera from './Components/FilterCartelera';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={FilterCartelera} />
      </BrowserRouter>
    </div>
  );
}

export default App;
