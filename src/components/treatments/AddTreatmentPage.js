import React from 'react';
import { connect } from 'react-redux';
import { startAddTreatment, startAddHistoryTreatment } from '../../actions/treatments';
import TreatmentForm from './TreatmentForm'
import InformModal from '../InformModal'

export class AddTreatmentPage extends React.Component {
    state = {
        informDateModal: false,
        treatment: undefined
    }


    informModalToggel = () => {
        this.setState(() => ({ informDateModal: !this.state.informDateModal }))
    }

    openModal = (treatment) => {
        this.informModalToggel();
        this.setState(() => ({ treatment }))
    }

    onSubmit = (treatment) => {
        if (treatment.date > new Date().getTime()) { // add future treat
            this.props.startAddTreatment(treatment);
            this.props.history.push('/treatments');

        }
        else {
            this.openModal(treatment);
        }



    };
    render() {
        const modal = <InformModal
            activeFunction={this.props.startAddHistoryTreatment}
            obj={this.state.treatment}
            isOpen={this.state.informDateModal}
            message="תאריך זה כבר עבר. האם ליצור טיפול?"
            informModalToggel={this.informModalToggel}
            history={this.props.history} />

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
                {modal}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddTreatment: (treatment) => dispatch(startAddTreatment(treatment)),
    startAddHistoryTreatment: (treatment) => dispatch(startAddHistoryTreatment(treatment))
});

export default connect(undefined, mapDispatchToProps)(AddTreatmentPage);
