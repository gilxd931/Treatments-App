import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { startSetClients } from './actions/clients';
import { startSetFutureTreatments } from './actions/treatments';




const store = configureStore();

const jsx = (
    <Provider rtl store={store}>
        <AppRouter />
    </Provider>
);
let hadRendered = false;
const renderApp = () => {
    if (!hadRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hadRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));

        store.dispatch(startSetClients()).then(() => {
            store.dispatch(startSetFutureTreatments()).then(() => {
                renderApp();
                if (history.location.pathname === '/') {
                    history.push('/dashboard');
                }
            }) // set treatments
        }) // set clients
    }
    else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
})