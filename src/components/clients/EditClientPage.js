import React from 'react';
import { connect } from 'react-redux';
import ClientForm from './ClientForm';
import { startEditClient, startRemoveClient } from '../../actions/clients';
import RemoveEnsureModal from '../RemoveEnsureModal';
import { setSelectedClient } from '../../actions/clientsFilters';

const EditClientPage = (props) => {

    const removeClientFunction = () => {
        props.startRemoveClient(props.client);
        props.history.push('/clients');

    }
    const modal = !!props.clientsFilters.selectedClient ?
        <RemoveEnsureModal func={removeClientFunction} type='client' />
        :
        undefined

    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">עדכון מטופל</h1>
                </div>
            </div>
            <div className="content-container">
                <ClientForm
                    client={props.client}
                    onSubmit={(client) => {
                        props.startEditClient(props.client.id, client);
                        props.history.push('/clients');

                    }}
                />
                <button className="button--red" onClick={() => {
                    props.setSelectedClient(props.client.id);

                }}>הסרת מטופל</button>
            </div>
            { modal}

        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        clientsFilters: state.clientsFilters,
        client: state.clients.find((client) => (client.id === props.match.params.id))
    };
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedClient: (text) => dispatch(setSelectedClient(text)),
    startEditClient: (id, updates) => dispatch(startEditClient(id, updates)),
    startRemoveClient: (client) => dispatch(startRemoveClient(client))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditClientPage);
