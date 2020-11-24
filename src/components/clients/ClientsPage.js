import React from 'react';
import ClientsListFilters from './ClientsListFilters';
import ClientsList from './ClientsList';

const ClientsPage = (props) => {

    return (
        <div>
            <ClientsListFilters />
            <ClientsList history={props.history} />
        </div>
    );
};

export default ClientsPage;
