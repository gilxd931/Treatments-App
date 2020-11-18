import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { setSelectedClient } from '../../actions/clientsFilters';

Modal.setAppElement(document.getElementById('app'));

const ClientRemoveEnsureModal = (props) => {
    const { func, setSelectedClient } = props
    const onPressDelete = () => {
        setSelectedClient('');
        func();
    }
    return (
        <Modal
            isOpen={!!props.clientsFilters.selectedClient}
            contentLabel="Selected Option"
            onRequestClose={() => { props.setSelectedClient('') }}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">האם להסיר מטופל זה?</h3>

            <div className="remove-cancel-buttons">
                <button className="button--red" onClick={() => { onPressDelete() }}>למחוק</button>
                <button className="button--secondery" onClick={() => { setSelectedClient('') }}>ביטול</button>
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        clientsFilters: state.clientsFilters,
        clients: state.clients
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedClient: (text) => dispatch(setSelectedClient(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientRemoveEnsureModal);
