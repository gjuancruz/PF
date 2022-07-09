import React from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import MovieDetail from './Components/Detail/MovieDetail'
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';


function App() {
  return (
    <BrowserRouter>
        <Route path='/' component={NavBar} />
        <Route exact path='/' component={Home} />
        <Route exact path='/movies/:id' component={MovieDetail}/>
        <Route path='/' component={Footer} />
    </BrowserRouter>
  );
}

export default App;
