import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';


export default (
	<Switch>
		<Route exact path='/' component={About} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
		<Route exact path='/profile/' component={Profile} />
		<Redirect from='*' to='/login/'/>
	</Switch>
);
