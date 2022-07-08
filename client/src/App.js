import React from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import MovieDetail from './Components/Detail/MovieDetail'
import NavBar from './Components/NavBar/NavBar';
import Carousel from './Components/Carousel/Carousel';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <BrowserRouter>
        <Route path='/' component={NavBar} />
        <Route path='/' component={Carousel} />
        <Route path='/' component={Footer} />
        <Route exact path='/movies/:id' component={MovieDetail}/>
    </BrowserRouter>
  );
}

export default App;
