import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';
import 'fetch-polyfill';
const store = configureStore();
import './images/favicon.ico';
import showUser from './services/users/show';
import showSession from './services/session/show';
import { athentificated } from './actions/login';


showSession().then(({ user_id }) => showUser(user_id))
    .then(user => store.dispatch(athentificated(user)), err => console.error(err)) // eslint-disable-line
    .then(() => render(
        <AppContainer>
            <Root store={store} history={history} />
        </AppContainer>,
        document.getElementById('root')
    ));

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const newConfigureStore = require('./store/configureStore');
        const newStore = newConfigureStore.configureStore();
        const newHistory = newConfigureStore.history;
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot store={newStore} history={newHistory} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
