import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import TimeEntriesList from './pages/TimeEntriesList';
import TimeEntryForm from './pages/TimeEntryForm';


export default (
	<Switch>
		<Route exact path='/' component={About} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
		<Route exact path='/profile/' component={Profile} />
		<Route exact path='/times/' component={TimeEntriesList} />
		<Route exact path='/times/new/' component={TimeEntryForm} />
		<Route exact path='/times/edit/' component={TimeEntryForm} />
		<Redirect from='*' to='/login/'/>
	</Switch>
);
