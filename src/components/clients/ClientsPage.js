import React from 'react';
import ClientsListFilters from './ClientsListFilters';
import ClientsList from './ClientsList';

const ClientsPage = () => {
    return (
        <div>
            <ClientsListFilters />
            <ClientsList />
        </div>
    );
};

export default ClientsPage;
