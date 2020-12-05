import React from 'react';
import { connect } from 'react-redux';
import { startEditHistoryTreatment, startRemoveHistoryTreatment, startSetTreatmentNoticed } from '../../actions/treatments';
import { setSelectedTreatment } from '../../actions/treatsFilters';
import EditHistoryTreatmentForm from './EditHistoryTreatmentForm';

const EditHistoryTreatmentPage = (props) => {
    console.log(props)
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
                <div className="content-container">
                    <h1 className="page-header__title">עדכון טיפול</h1>
                </div>
            </div>
            <div className="content-container">

                <EditHistoryTreatmentForm treatment={props.treatment}
                    onSubmit={(treatment) => {
                        props.startEditHistoryTreatment(props.treatment.id, treatment);
                        props.startSetTreatmentNoticed(props.treatment.id);
                        props.history.push('/treatments');
                    }
                    }
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
        treatment: state.historyTreatments.find((treatment) => (treatment.id === props.match.params.id))
    };
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedTreatment: (text) => dispatch(setSelectedTreatment(text)),
    startEditHistoryTreatment: (id, updates) => dispatch(startEditHistoryTreatment(id, updates)),
    startRemoveHistoryTreatment: (client) => dispatch(startRemoveHistoryTreatment(client)),
    startSetTreatmentNoticed: (id) => dispatch(startSetTreatmentNoticed(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHistoryTreatmentPage);
