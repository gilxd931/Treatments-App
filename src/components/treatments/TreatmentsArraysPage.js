import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const NoOptionsMessage = () => {

    return (
        <p className="no-options-message-text">אין תוצאות</p>
    );
};


const TreatmentsArraysPage = () => {
    return (
        <div >
            <div className="year_container">
                <span>סוג טיפול</span>

                <Select
                    className="reportpage__select_year"
                    placeholder={"טיפול"}
                    onChange={() => { }}
                    components={{ NoOptionsMessage }}
                />
            </div>
            <div className="new_array_button">
                <Link to='/createTreatmentArray' className="button">מערך חדש</Link>
            </div>
        </div >
    );
};

export default TreatmentsArraysPage;
