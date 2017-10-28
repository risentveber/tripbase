import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Confirmation from './pages/Confirmation';
import TripsList from './pages/TripsList';
import TripForm from './pages/TripForm';
import UsersList from './pages/UsersList';


export default (
	<Switch>
		<Route exact path='/' component={About} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
		<Route exact path='/profile/' component={Profile} />
		<Route exact path='/users/' component={UsersList} />
		<Route exact path='/trips/' component={TripsList} />
		<Route exact path='/trips/new/' component={TripForm} />
		<Route exact path='/trips/edit/' component={TripForm} />
		<Route exact path='/confirmations/:confirmationId/' component={Confirmation}/>
		<Redirect from='*' to='/login/'/>
	</Switch>
);
