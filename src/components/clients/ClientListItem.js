import React from 'react';
import moment from 'moment';
import Split from 'react-split';
import { connect } from 'react-redux';
import { setSelectedClient } from '../../actions/clientsFilters';
import { Link } from 'react-router-dom';
import { FaInfo, FaEdit } from 'react-icons/fa';

class ClientListItem extends React.Component {

    render() {

        const { fullName, address, selected, id, lastTreat, nextTreat, setSelectedClient } = this.props;
        let treatsToRender = selected ? selected.slice(0, 2) : []


        return (

            <Split
                sizes={[24, 24, 24, 24, 4]}
                className="list-item"
            >

                <div>
                    <h3 className="list-item__title" > {fullName}</h3>
                    <span className="list-item__subtitle">{address}</span>
                </div>

                <div>
                    <h3 className="list-item__data">

                        {lastTreat && moment(lastTreat).locale('he').format('DD לMMMM YYYY HH:mm')}
                        {!lastTreat && <p>לא נקבע טיפול</p>}

                    </h3>
                </div>

                <div >
                    <h3 className="list-item__data">
                        {nextTreat && moment(nextTreat).locale('he').format('DD לMMMM YYYY HH:mm')}
                        {!nextTreat && <p>לא נקבע טיפול</p>}

                    </h3>
                </div>

                <div >
                    <h3 className="list-item__data">
                        {treatsToRender && treatsToRender.join(', ')}
                        {selected && selected.length > 2 ? <span> ...</span> : undefined}
                    </h3>
                </div>

                <div className="list-item__icons">
                    <i>
                        <Link className="center client-item-icon-orange" to={`/editClient/${id}`}>
                            <FaEdit data-tip="עריכה" />
                        </Link>
                    </i>

                    <i>
                        <div className="center client-item-icon" onClick={() => { setSelectedClient(id) }}>
                            <FaInfo data-tip="מידע" />

                        </div>
                    </i>

                </div>
            </Split>

        );
    }
}




const mapDispatchToProps = (dispatch) => ({
    setSelectedClient: (text) => dispatch(setSelectedClient(text))
});

export default connect(undefined, mapDispatchToProps)(ClientListItem);