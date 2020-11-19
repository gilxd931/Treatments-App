import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { setSelectedClient } from '../actions/clientsFilters';
import { setSelectedTreatment } from '../actions/treatsFilters';

Modal.setAppElement(document.getElementById('app'));

const RemoveEnsureModal = (props) => {
    const { func, type } = props

    const filters = type === 'client' ? props.clientsFilters : props.treatsFilters
    const selectFuntion = type === 'client' ? props.setSelectedClient : props.setSelectedTreatment
    const selected = type === 'client' ? filters.selectedClient : filters.selectedTreatment

    const onPressDelete = () => {
        selectFuntion('');
        func();
    }
    return (
        <Modal
            isOpen={!!filters.selectedTreatment}
            contentLabel="Selected Option"
            onRequestClose={() => { selectFuntion('') }}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">האם להסיר פריט זה?</h3>

            <div className="remove-cancel-buttons">
                <button className="button--red" onClick={() => { onPressDelete() }}>הסר</button>
                <button className="button--secondery" onClick={() => { selectFuntion('') }}>ביטול</button>
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        clientsFilters: state.clientsFilters,
        clients: state.clients,
        treatsFilters: state.treatsFilters
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedClient: (text) => dispatch(setSelectedClient(text)),
    setSelectedTreatment: (text) => dispatch(setSelectedTreatment(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveEnsureModal);
