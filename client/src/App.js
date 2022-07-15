import React from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import MovieDetail from './Components/Detail/MovieDetail'
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import CreateMovie from './Components/CreateMovie/CreateMovie';
import MenuDashboard from './Components/Dashboard/MenuDashboard';
import Comments from './Components/Dashboard/Comments';
import SideBar from './Components/Dashboard/SideBar';
import Feedback from './Components/Feedback/Feedback';
import CreateFeedback from './Components/Feedback/PostFeedback';

function App() {
  return (
    <BrowserRouter>
        <Route path='/' component={NavBar} />
        <Route exact path='/' component={Home} />
        <Route exact path='/movies/:id' component={MovieDetail}/>
        <Route exact path= '/create' component={CreateMovie} />
        {/* <Route path='/admin' component={MenuDashboard} />           */}
        <Route path='/admin' component={SideBar} />          
        <Route exact path="/admin/comments" component={Comments} />
        <Route exact path="/admin/feedbacks" component= {Feedback}/>
        <Route path="/feedback/:id" component={CreateFeedback}/>
        <Route path='/' component={Footer} />

        
    </BrowserRouter>
  );
}

export default App;