import React from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './ComponentesLauti/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path= '/' component= {Home}/>
    </Switch>
    </BrowserRouter>
    );
}

export default App;
