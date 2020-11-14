import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { setSelectedClient } from '../../actions/clientsFilters';
import getClientById from '../../selectors/ClientById';
import moment from 'moment';

Modal.setAppElement(document.getElementById('app'));

const ClientModal = (props) => {
    const clientData = getClientById(props.clients, props.clientsFilters.selectedClient);
    const { fullName, address, note, birthday, sex, selected } = clientData

    const sexText = sex === 'זכר' ? 'בן' : 'בת';
    const formatedBirthday = moment(birthday).locale('he').format('DD לMMMM YYYY')
    const age = moment().diff(birthday, 'years');
    return (
        <Modal
            isOpen={!!props.clientsFilters.selectedClient}
            contentLabel="Selected Option"
            onRequestClose={() => { props.setSelectedClient('') }}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">{fullName}</h3>
            <p className="modal__body">נולד בתאריך: {formatedBirthday}, {sexText} {age}.</p>
            <p className="modal__body">כתובת: {address}.</p>
            <p className="modal__body">סוגי טיפולים: {selected && selected.join(', ')}.</p>

            <p className="modal__body">{note}</p>
            <button className="button" onClick={() => { props.setSelectedClient('') }}>אוקיי</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientModal);
