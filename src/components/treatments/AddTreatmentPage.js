import React from 'react';
import { connect } from 'react-redux';
import { startAddTreatment } from '../../actions/treatments';
import TreatmentForm from './TreatmentForm'

export class AddTreatmentPage extends React.Component {
    onSubmit = (treatment) => {
        this.props.startAddTreatment(treatment);
        this.props.history.push('/treatments');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container center">
                        <h1 className="page-header__title">טיפול חדש</h1>
                    </div>
                </div>
                <div className="content-container">
                    <TreatmentForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddTreatment: (treatment) => dispatch(startAddTreatment(treatment))
});

export default connect(undefined, mapDispatchToProps)(AddTreatmentPage);
