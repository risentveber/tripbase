import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Login from './pages/Login';

export default (
	<Switch>
		<Route exact path='/' component={About} />
		<Route path='/login' component={Login} />
	</Switch>
);
