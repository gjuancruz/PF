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
<<<<<<< HEAD
    <Route path='/' component={NavBar} />
    <Route path='/' component={Carousel} />
    <Route exact path='/movies/:id' component={MovieDetail}/>
=======
        <Route path='/' component={NavBar} />
        <Route path='/' component={Carousel} />
        <Route path='/' component={Footer} />
>>>>>>> e05234a8b1d85a4a59709c457341b6bc0bbd460f
    </BrowserRouter>
  );
}

export default App;
