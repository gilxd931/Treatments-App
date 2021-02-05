import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import ClientsPage from '../components/clients/ClientsPage';
import CalendarPage from '../components/CalendarPage';
import ReportsPage from '../components/ReportsPage';
import TreatmentsPage from '../components/treatments/TreatmentsPage';
import AddClientPage from '../components/clients/AddClientPage';
import EditClientPage from '../components/clients/EditClientPage';
import AddTreatmentPage from '../components/treatments/AddTreatmentPage';
import editFutureTreamtmentPage from '../components/treatments/editFutureTreamtmentPage';
import EditHistoryTreatmentPage from '../components/treatments/EditHistoryTreatmentPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/clients" component={ClientsPage} />
                <PrivateRoute path="/treatments" component={TreatmentsPage} />
                <PrivateRoute path="/calendar" component={CalendarPage} />
                <PrivateRoute path="/reports" component={ReportsPage} />
                <PrivateRoute path="/createClient" component={AddClientPage} />
                <PrivateRoute path="/editClient/:id" component={EditClientPage} />
                <PrivateRoute path="/createTreatment" component={AddTreatmentPage} />
                <PrivateRoute path="/editFutureTreatment/:id" component={editFutureTreamtmentPage} />
                <PrivateRoute path="/editHistoryTreatment/:id" component={EditHistoryTreatmentPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;