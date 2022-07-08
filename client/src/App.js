import React from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Carousel from './Components/Carousel/Carousel';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
        <Route path='/' component={NavBar} />
        {/* <Route path='/' component={Carousel} /> */}
        <Route path='/' component={Home} />
        <Route path='/' component={Footer} />
    </BrowserRouter>
  );
}

export default App;
