import React from 'react';
import calculateTreatmentsPrices from '../selectors/CalculateTreatmentsPrices';
import { connect } from 'react-redux';

const ReportsPage = (props) => {
    const pricesMap = calculateTreatmentsPrices(props.historyTreatments);
    let totalPrice = 0;
    for (const key in pricesMap) {
        totalPrice += pricesMap[key];
    }
    return (
        <div>
            {
                <p> סך כל ההכנסות: {totalPrice} שקלים</p>
            }
        </div >
    );
};


const mapStateToProps = (state) => {
    return {
        futureTreatments: state.futureTreatments,
        historyTreatments: state.historyTreatments
    };
};

export default connect(mapStateToProps)(ReportsPage);

