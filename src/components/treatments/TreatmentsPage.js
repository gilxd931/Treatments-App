import React from 'react';
import TreatmentsPageLifters from './TreatmentsListFilters';
import TreatmentsList from './TreatmentsList';

const TreatmentsPage = () => {
    return (
        <div>
            <TreatmentsPageLifters />
            <TreatmentsList />
        </div>
    );
};

export default TreatmentsPage;
