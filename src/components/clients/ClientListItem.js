import React from 'react';
import moment from 'moment';
import Split from 'react-split';
import { connect } from 'react-redux';
import { setSelectedClient } from '../../actions/clientsFilters';
import { Link } from 'react-router-dom';
import { FaInfo, FaEdit } from 'react-icons/fa';
import { getClientTreatments } from '../../firebase/operations';

class ClientListItem extends React.Component {

    render() {
        console.log(getClientTreatments("גיל רותם"), "ziEKalvvB7gu32vX61kpuiJfL4k1")

        const { fullName, address, selected, id, lastTreat, nextTreat, setSelectedClient } = this.props;
        let treatsToRender = [];
        if (selected && !Array.isArray(selected)) {

            for (const [key, value] of Object.entries(selected)) {
                if (treatsToRender.length === 2) {
                    break;
                }
                treatsToRender.push(value);
            }

        }
        else {
            treatsToRender = selected ? selected.slice(0, 2) : []

        }

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

                        {moment(lastTreat).locale('he').format('DD לMMMM YYYY HH:mm')}
                    </h3>
                </div>

                <div >
                    <h3 className="list-item__data">
                        {moment(nextTreat).locale('he').format('DD לMMMM YYYY HH:mm')}
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
                            <FaEdit />
                        </Link>
                    </i>

                    <i>
                        <div className="center client-item-icon" onClick={() => { setSelectedClient(id) }}>
                            <FaInfo />
                        </div>
                    </i>

                </div>

            </Split>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        clientsFilters: state.clientsFilters
    }
}


const mapDispatchToProps = (dispatch) => ({
    setSelectedClient: (text) => dispatch(setSelectedClient(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientListItem);