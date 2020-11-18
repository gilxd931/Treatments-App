import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { setSelectedTreatment } from '../../actions/treatsFilters';
import geFilterById from '../../selectors/TreatmentById';
import moment from 'moment';

Modal.setAppElement(document.getElementById('app'));

const TreatmentModal = (props) => {
    const treatmentData = geFilterById(props.futureTreatments, props.treatsFilters.selectedTreatment);
    const { clientName, reason, date, selected } = treatmentData

    const formatedDate = moment(date).locale('he').format('DD לMMMM YYYY')
    return (
        <Modal
            isOpen={!!props.treatsFilters.selectedTreatment}
            contentLabel="Selected Option"
            onRequestClose={() => { props.setSelectedTreatment('') }}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">{formatedDate}</h3>
            <h3 className="modal__title">{clientName}</h3>

            <p className="modal__body">סוג הטיפול: {selected && selected.join(', ')}.</p>

            <p className="modal__body">{reason}</p>
            <button className="button" onClick={() => { props.setSelectedTreatment('') }}>אוקיי</button>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        treatsFilters: state.treatsFilters,
        futureTreatments: state.futureTreatments
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedTreatment: (text) => dispatch(setSelectedTreatment(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentModal);
