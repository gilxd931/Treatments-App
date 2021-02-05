import React from 'react';
import { connect } from 'react-redux';
import TreatmentForm from './TreatmentForm';
import { startEditFutureTreatment, startRemoveFutureTreatment } from '../../actions/treatments';
import RemoveEnsureModal from '../RemoveEnsureModal';
import { setSelectedTreatment } from '../../actions/treatsFilters';

const EditFutureTreatmentPage = (props) => {
    const removeTreatmentFunction = () => {
        props.startRemoveFutureTreatment(props.treatment);
        props.history.push('/treatments');

    }
    const modal = !!props.treatsFilters.selectedTreatment ?
        <RemoveEnsureModal func={removeTreatmentFunction} type='treatment' />
        :
        undefined

    return (
        <div>
            <div className="page-header">
                <div className="content-container center">
                    <h1 className="page-header__title">עדכון טיפול</h1>
                </div>
            </div>
            <div className="content-container">
                <TreatmentForm
                    treatment={props.treatment}
                    onSubmit={(treatment) => {
                        props.startEditFutureTreatment(props.treatment.id, treatment);
                        props.history.push('/treatments');

                    }}
                />
                <button className="button--red" onClick={() => {
                    props.setSelectedTreatment(props.treatment.id);

                }}>הסרת טיפול</button>
            </div>
            { modal}

        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        treatsFilters: state.treatsFilters,
        treatment: state.futureTreatments.find((treatment) => (treatment.id === props.match.params.id))
    };
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedTreatment: (text) => dispatch(setSelectedTreatment(text)),
    startEditFutureTreatment: (id, updates) => dispatch(startEditFutureTreatment(id, updates)),
    startRemoveFutureTreatment: (client) => dispatch(startRemoveFutureTreatment(client))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFutureTreatmentPage);
