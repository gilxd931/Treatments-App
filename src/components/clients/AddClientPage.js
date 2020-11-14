import React from 'react';
import { connect } from 'react-redux';
import { startAddClient } from '../../actions/clients';
import ClientForm from './ClientForm';

export class AddClientPage extends React.Component {
    onSubmit = (client) => {
        this.props.startAddClient(client);
        this.props.history.push('/clients');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container center">
                        <h1 className="page-header__title">מטופל חדש</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ClientForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddClient: (client) => dispatch(startAddClient(client))
});

export default connect(undefined, mapDispatchToProps)(AddClientPage);
