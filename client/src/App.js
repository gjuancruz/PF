import React from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import MovieDetail from './Components/Detail/MovieDetail'
import NavBar from './Components/NavBar/NavBar';
import Carousel from './Components/Carousel/Carousel';


function App() {
  return (
    <BrowserRouter>
    <Route path='/' component={NavBar} />
    <Route path='/' component={Carousel} />
    <Route exact path='/movies/:id' component={MovieDetail}/>
    </BrowserRouter>
  );
}

export default App;
