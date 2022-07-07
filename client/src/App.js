import React from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './Components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Route path='/' component={NavBar} />
    <Route path='/' component={Carousel} />
    <Route exact path= '/' component= {Home}/>
    </BrowserRouter>
    );
}

export default App;
