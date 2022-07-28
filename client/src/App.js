import React from 'react'
import './App.css';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe} from "@stripe/stripe-js"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MovieDetail from './Components/Detail/MovieDetail'
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MenuDashboard from './Components/Dashboard/MenuDashboard';
import CreateFeedback from './Components/CreateFeedback/PostFeedback';
import Error404 from './Components/Error404/Error404';
import CreateMovie from './Components/CreateMovie/CreateMovie';
import Register from './Components/Register/Register';
import Perfil from './Components/Profile/Profile';
import Candy from './Components/Candy/Candy';
import CashRegister from './Components/Cash Register/CashRegister';
import { Redirect } from 'react-router-dom';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Info from './Components/About/Info'
import {Checkout} from './Components/Checkout/Checkout'
import {ComprarModal} from './Components/Checkout/CandysModal'
import ChangePassword from './Components/ChangePassword/ChangePassword';

const stripePromise = loadStripe("pk_test_51LKmPfJSzK67IevuPbWPySSkTZkbIKMk89qalSxH06sTUPsU8UeojNRIT11QhjW7yheUsm4BBjtkYc2jD6Q9O8KQ00IWWYeOtN")


function App() {
  return (
    <Elements stripe={stripePromise}>
    <ToastContainer />
    <BrowserRouter>
      {/* <NavBar /> */}

      <Switch>
        <Route exact path="/">
          <Redirect to="/home" ></Redirect>
        </Route>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/movies/:id' component={MovieDetail}/>
        <Route exact path='/create' component={CreateMovie} />
        <Route exact path='/admin' component={MenuDashboard} />          
        <Route exact path="/feedback" component={CreateFeedback}/>
        <Route exact path='/profile' component={Perfil}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/Checkout' component={Checkout} />
        <Route exact path='/CandyModal' component={ComprarModal} />
        <Route exact path='/candy' component={Candy}/>
        <Route exact path='/caja' component={CashRegister}/>
        <Route exact path='/about' component={Info}/>
        <Route exact path='/changepassword' component={ChangePassword}/>
        <Route path='*' component={Error404} />
      </Switch>
    </BrowserRouter>
    </Elements>
  );
}

export default App;
