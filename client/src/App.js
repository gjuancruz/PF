import React from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import MovieDetail from './Components/movieDetail';

function App() {
  return (
    <BrowserRouter>
    <Route exact path='/movies/:id' component={MovieDetail}/>
    </BrowserRouter>
  );
}

export default App;
