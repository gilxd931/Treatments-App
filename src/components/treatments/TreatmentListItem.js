import React from 'react';
import { connect } from 'react-redux';
import Split from 'react-split';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaInfo, FaEdit } from 'react-icons/fa';
import { setSelectedTreatment } from '../../actions/treatsFilters';

class TreatmentListItem extends React.Component {

    render() {

        const { clientName, date, selected, setSelectedTreatment, id } = this.props;

        let treatsToRender = selected ? selected.slice(0, 2) : []

        return (
            <Split
                sizes={[27, 36, 27, 10]}
                className="list-item"

            >

                <div>
                    <h3 className="list-item__title" > {clientName}</h3>
                </div>

                <div>
                    <h3 className="list-item__data">
                        {date && moment(date).locale('he').format('DD לMMMM YYYY')}
                    </h3>
                    <span className="list-item__data">
                        {date && moment(date).locale('he').format('HH:mm')}
                    </span>

                </div>


                <div >
                    <h3 className="list-item__data">
                        {treatsToRender && treatsToRender.join(', ')}
                        {selected && selected.length > 2 ? <span> ...</span> : undefined}
                    </h3>
                </div>

                <div className="list-item__icons">
                    <i>
                        <Link className="center client-item-icon-orange" to={`/home`}>
                            <FaEdit />
                        </Link>
                    </i>

                    <i>
                        <div className="center client-item-icon" onClick={() => { setSelectedTreatment(id) }}>
                            <FaInfo />
                        </div>
                    </i>

                </div>

            </Split>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedTreatment: (text) => dispatch(setSelectedTreatment(text))
});

export default connect(undefined, mapDispatchToProps)(TreatmentListItem);