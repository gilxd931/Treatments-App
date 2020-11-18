import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import clientFiltersReducer from '../reducers/clientfilters';
import clientsReducer from '../reducers/clients';
import treatsFiltersReducer from '../reducers/treatsfilters';
import futureTreatmentsReducer from '../reducers/futureTreatments';

const compposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            clientsFilters: clientFiltersReducer,
            clients: clientsReducer,
            futureTreatments: futureTreatmentsReducer,
            treatsFilters: treatsFiltersReducer

        }),
        compposeEnhancers(applyMiddleware(thunk))

    );

    return store;
};
