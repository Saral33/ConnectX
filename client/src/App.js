import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//COMPONENTS
import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile' ;
import Posts from './components/posts/Posts'
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import PrivateRoute from './components/routing/PrivateRoute'
import Alert from './components/layout/Alert';
import Post from './components/post/Post';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken'

//REDUX
import { Provider } from 'react-redux';
import store from './store';



if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  },[]);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post/:id' component={Post} />

            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;