import React from 'react';
import { connect } from 'react-redux';
import Split from 'react-split';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaInfo, FaEdit, FaCheck } from 'react-icons/fa';
import { setSelectedTreatment } from '../../actions/treatsFilters';
import { startSetTreatmentNoticed } from '../../actions/treatments';

class TreatmentListItem extends React.Component {

    state = {
        noticed: this.props.noticed,
        colored: this.props.type === 'historyTreatments' && !this.props.noticed ? { backgroundColor: '#ebe4e4' } : null
    }

    render() {
        const { clientName, date, selected, setSelectedTreatment, id, type, startSetTreatmentNoticed } = this.props;

        let treatsToRender = selected ? selected.slice(0, 2) : [];

        const editPath = type === 'historyTreatments' ? 'editHistoryTreatment' : 'editFutureTreatment';

        const setNoticedTreatment = (id) => {
            startSetTreatmentNoticed(id);
            this.setState(() => ({ noticed: !this.state.noticed, colored: null }))

        }

        return (
            <Split
                style={this.state.colored}
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
                        <Link className="center client-item-icon-orange" to={`/${editPath}/${id}`}>
                            <FaEdit data-tip="עריכה" />
                        </Link>
                    </i>

                    <i>
                        <div className="center client-item-icon" onClick={() => { setSelectedTreatment(id) }}>
                            <FaInfo data-tip="מידע" />
                        </div>
                    </i>


                    {
                        type === 'historyTreatments' && !this.state.noticed ?
                            <i>
                                <div className="center client-item-icon-green" onClick={() => { setNoticedTreatment(id) }}>
                                    <FaCheck data-tip="ראיתי" />
                                </div>

                            </i> : undefined
                    }
                </div>


            </Split>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedTreatment: (text) => dispatch(setSelectedTreatment(text)),
    startSetTreatmentNoticed: (id) => dispatch(startSetTreatmentNoticed(id))
});

export default connect(undefined, mapDispatchToProps)(TreatmentListItem);