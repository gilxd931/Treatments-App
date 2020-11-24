import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { setSelectedClient } from '../../actions/clientsFilters';
import getClientById from '../../selectors/ClientById';
import moment from 'moment';
import { setTreatTextFilter } from '../../actions/treatsFilters';


Modal.setAppElement(document.getElementById('app'));

const ClientModal = (props) => {
    const clientData = getClientById(props.clients, props.clientsFilters.selectedClient);
    const { fullName, address, note, birthday, sex, selected } = clientData

    const sexText = sex === 'זכר' ? 'בן' : 'בת';
    const formatedBirthday = moment(birthday).locale('he').format('DD לMMMM YYYY')
    const age = moment().diff(birthday, 'years');

    const onTreatmentsClick = () => {
        props.setSelectedClient('');
        props.setTreatTextFilter(fullName);
        props.history.push('/treatments');
    }
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
            <div className="modal__buttons">
                <button className="button--ok" onClick={() => { onTreatmentsClick() }}>לכל הטיפולים</button>
                <button className="button--secondery " onClick={() => { props.setSelectedClient('') }}>סגירה</button>

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
    setSelectedClient: (text) => dispatch(setSelectedClient(text)),
    setTreatTextFilter: (text) => dispatch(setTreatTextFilter(text))

});

export default connect(mapStateToProps, mapDispatchToProps)(ClientModal);
