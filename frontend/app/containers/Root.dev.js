import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from '../components/App';
import DevTools from './DevTools';

export default function Root({ store, history }) {
    return (
        <Provider store={store}>
            <MuiThemeProvider>
            <div>
                <ConnectedRouter history={history}>
                    <Route path='/' component={App}/>
                </ConnectedRouter>
                <DevTools />
            </div>
            </MuiThemeProvider>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
