import React from 'react'
import './App.css';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe} from "@stripe/stripe-js"
import {BrowserRouter, Route} from 'react-router-dom'
import MovieDetail from './Components/Detail/MovieDetail'
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import CreateMovie from './Components/CreateMovie/CreateMovie';

const stripePromise = loadStripe("pk_test_51LKmPfJSzK67IevuPbWPySSkTZkbIKMk89qalSxH06sTUPsU8UeojNRIT11QhjW7yheUsm4BBjtkYc2jD6Q9O8KQ00IWWYeOtN")

import Login from './Components/Login/Login';
import MenuDashboard from './Components/Dashboard/MenuDashboard';
import CreateFeedback from './Components/CreateFeedback/PostFeedback';

function App() {
  return (
    <Elements stripe={stripePromise}>
    <BrowserRouter>
        <Route path='/' component={NavBar} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Home} />
        <Route exact path='/movies/:id' component={MovieDetail}/>
        <Route exact path= '/create' component={CreateMovie} />
        <Route path='/admin' component={MenuDashboard} />          
        <Route path="/feedback/:id" component={CreateFeedback}/>
        <Route path='/' component={Footer} />

    </BrowserRouter>
    </Elements>
  );
}

export default App;