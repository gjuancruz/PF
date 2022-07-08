import React from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
<<<<<<< HEAD
import FilterCartelera from './Components/FilterCartelera/FilterCartelera';
import NavBar from './Components/NavBar/NavBar';
import Carousel from './Components/Carousel/Carousel';
import CreateMovie from './Components/CreateMovie/CreateMovie';
=======
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Carousel from './Components/Carousel/Carousel';
import Footer from './Components/Footer/Footer';
>>>>>>> 72dfcd779b43d6c140dba005af6ff45f67294c7a

function App() {
  return (
    <BrowserRouter>
        <Route path='/' component={NavBar} />
<<<<<<< HEAD
        <Route path='/' component={Carousel} />
        <Route path='/' component={FilterCartelera} />
        <Route exact path='/create' component={CreateMovie} />

=======
        {/* <Route path='/' component={Carousel} /> */}
        <Route path='/' component={Home} />
        <Route path='/' component={Footer} />
>>>>>>> 72dfcd779b43d6c140dba005af6ff45f67294c7a
    </BrowserRouter>
  );
}

export default App;
