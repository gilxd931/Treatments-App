import React from 'react';
import { connect } from 'react-redux';
import ClientListItem from './ClientListItem';
import selectClients from '../../selectors/Clients';
import Split from 'react-split'
import { sortClientByLastTreatUp, sortClientByLastTreatDown, sortClientByNameUp, sortClientByNameDown } from '../../actions/clientsFilters';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import ClientModal from './clientModal';


class ClientsList extends React.Component {

    state = {
        nameUp: true,
        lastTreat: null
    };

    clientFilterArrow = this.state.nameUp ? <FaSortUp /> : <FaSort />
    lastTreatFilterArrow = this.state.lastTreat ? <FaSortUp /> : <FaSort />


    onNameClickHandler = () => {
        this.lastTreatFilterArrow = <FaSort />
        this.setState(() => ({ lastTreat: null }))

        if (this.state.nameUp == null) {
            this.setState(() => ({ nameUp: true }))
            this.clientFilterArrow = <FaSortUp />
            this.props.dispatch(sortClientByNameUp());
        }
        if (this.state.nameUp) {
            this.setState(() => ({ nameUp: false }))
            this.clientFilterArrow = <FaSortDown />

            this.props.dispatch(sortClientByNameDown());
        }
        else { // currently down
            this.setState(() => ({ nameUp: true }))
            this.clientFilterArrow = <FaSortUp />
            this.props.dispatch(sortClientByNameUp());
        }
    }

    onLastTreatClickHandler = () => {
        this.clientFilterArrow = <FaSort />
        this.setState(() => ({ nameUp: null }))

        if (this.state.lastTreat == null) {
            this.setState(() => ({ lastTreat: true }))
            this.lastTreatFilterArrow = <FaSortUp />
            this.props.dispatch(sortClientByLastTreatUp());

        }
        if (this.state.lastTreat) {
            this.setState(() => ({ lastTreat: false }))
            this.lastTreatFilterArrow = <FaSortDown />

            this.props.dispatch(sortClientByLastTreatDown());
        }
        else { // down
            this.setState(() => ({ lastTreat: true }))
            this.lastTreatFilterArrow = <FaSortUp />
            this.props.dispatch(sortClientByLastTreatUp());
        }
    }

    onNextTreatClickHandler = () => {
        this.clientFilterArrow = <FaSort />

    }


    render() {
        const modal = !!this.props.clientsFilters.selectedClient ? <ClientModal history={this.props.history} /> : undefined
        return (
            <div className="content-container">
                <Split
                    sizes={[24, 24, 24, 24, 4]}
                    className="list-header"



                >
                    <div className="show-for-desktop list-header__item">
                        <p>מטופל</p>

                        <i onClick={this.onNameClickHandler}>{this.clientFilterArrow}
                        </i>
                    </div>

                    <div className="show-for-desktop list-header__item">
                        <p>טיפול אחרון</p>
                        <i onClick={this.onLastTreatClickHandler}>{this.lastTreatFilterArrow}
                        </i>
                    </div>

                    <div className="show-for-desktop list-header__item">
                        <p>טיפול הבא</p>

                        < FaSort />
                    </div>

                    <div className="show-for-desktop list-header__item">סוגי טיפולים</div>
                    <div className="show-for-desktop list-header__item"></div>

                </Split>

                <div className="list-body">
                    {
                        this.props.clients.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span >אין לקוחות</span>
                            </div>
                        ) :
                            (
                                this.props.clients.map((client) => (
                                    <ClientListItem key={client.id} {...client}
                                    />
                                ))
                            )
                    }
                </div>

                {modal}

            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clients: selectClients(state.clients, state.clientsFilters),
        clientsFilters: state.clientsFilters,
    };
};


export default connect(mapStateToProps)(ClientsList);
