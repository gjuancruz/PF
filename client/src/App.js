import React from 'react'
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MovieDetail from './Components/Detail/MovieDetail'
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import CreateMovie from './Components/CreateMovie/CreateMovie';
import Login from './Components/Login/Login';
import MenuDashboard from './Components/Dashboard/MenuDashboard';
import CreateFeedback from './Components/CreateFeedback/PostFeedback';
import Error404 from './Components/Error404/Error404';
import Perfil from './Components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>

      {/* <NavBar /> */}

      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/movies/:id' component={MovieDetail}/>
        <Route exact path='/create' component={CreateMovie} />
        <Route exact path='/admin' component={MenuDashboard} />          
        <Route exact path="/feedback/:id" component={CreateFeedback}/>
        <Route exact path='/profile' component={Perfil}/>
        <Route path='*' component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;