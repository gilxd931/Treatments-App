import React from 'react';
import { connect } from 'react-redux';
import TreatmentArrayForm from './TreatmentArrayForm';

export class AddTreatmentArrayPage extends React.Component {
    onSubmit = (treatArray) => {
        // this.props.startAddTreatmentArray(treatArray);
        this.props.history.push('/treatmentsArrays');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container center">
                        <h1 className="page-header__title">מערך טיפול חדש</h1>
                    </div>
                </div>
                <div className="content-container">
                    <TreatmentArrayForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}


export default connect(undefined, undefined)(AddTreatmentArrayPage);
