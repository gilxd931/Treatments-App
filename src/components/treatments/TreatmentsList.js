import React from 'react';
import { connect } from 'react-redux';
import FutureTreatments from '../../selectors/FutureTreatments';
import Split from 'react-split'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import TreatmentListItem from './TreatmentListItem';
import TreatmentModal from './TreatmentModal'
import { sortTreatmentByNameUp, sortTreatmentByNameDown, sortTreatmentByDateUp, sortTreatmentByDateDown } from '../../actions/treatsFilters';

class TreatmentsList extends React.Component {

    state = {
        nameUp: true,
        dateTreat: null
    };


    clientFilterArrow = this.state.nameUp ? <FaSortUp /> : <FaSort />
    treatDateFilterArrow = this.state.dateTreat ? <FaSortUp /> : <FaSort />
    treatTypeFilterArrow = <FaSort />

    onNameClickHandler = () => {
        this.treatDateFilterArrow = <FaSort />
        this.setState(() => ({ dateTreat: null }))

        if (this.state.nameUp == null) {
            this.setState(() => ({ nameUp: true }))
            this.clientFilterArrow = <FaSortUp />
            this.props.dispatch(sortTreatmentByNameUp());
        }
        if (this.state.nameUp) {
            this.setState(() => ({ nameUp: false }))
            this.clientFilterArrow = <FaSortDown />
            this.props.dispatch(sortTreatmentByNameDown());


        }
        else { // currently down
            this.setState(() => ({ nameUp: true }))
            this.clientFilterArrow = <FaSortUp />
            this.props.dispatch(sortTreatmentByNameUp());
        }
    }


    onDateTreatClickHandler = () => {
        this.clientFilterArrow = <FaSort />
        this.setState(() => ({ nameUp: null }))

        if (this.state.dateTreat == null) {
            this.setState(() => ({ dateTreat: true }))
            this.treatDateFilterArrow = <FaSortUp />
            this.props.dispatch(sortTreatmentByDateUp());
        }
        if (this.state.dateTreat) {
            this.setState(() => ({ dateTreat: false }))
            this.treatDateFilterArrow = <FaSortDown />
            this.props.dispatch(sortTreatmentByDateDown());

        }
        else { // currently down
            this.setState(() => ({ dateTreat: true }))
            this.treatDateFilterArrow = <FaSortUp />
            this.props.dispatch(sortTreatmentByDateUp());
        }
    }

    onTreatsTypeClickHandler = () => {
        console.log("change arrow");
    }

    render() {
        const modal = !!this.props.treatmentsFilters.selectedTreatment ? <TreatmentModal /> : undefined


        return (
            <div className="content-container">

                <Split
                    sizes={[27, 36, 27, 10]}
                    className="list-header"



                >
                    <div className="show-for-desktop list-header__item">
                        <p>מטופל</p>
                        <i onClick={this.onNameClickHandler}>{this.clientFilterArrow}</i>


                    </div>

                    <div className="show-for-desktop list-header__item">
                        <p>תאריך</p>
                        <i onClick={this.onDateTreatClickHandler}>{this.treatDateFilterArrow}
                        </i>
                    </div>

                    <div className="show-for-desktop list-header__item">
                        <p>סוג טיפול</p>
                        <i onClick={this.onTreatsTypeClickHandler}>{this.treatTypeFilterArrow}
                        </i>
                    </div>

                    <div className="show-for-desktop list-header__item"></div>

                </Split>

                {this.props.treatmentsFilters.display === 'historyTreatments' ?
                    <p> history</p>
                    :
                    <div className="list-body">
                        {
                            this.props.futureTreatments.length === 0 ? (
                                <div className="list-item list-item--message">
                                    <span >לא נמצאו טיפולים</span>
                                </div>
                            ) :
                                (
                                    this.props.futureTreatments.map((treat) => (
                                        <TreatmentListItem key={treat.id} {...treat} />
                                    ))
                                )
                        }
                    </div>}
                {modal}
            </div>
        )
    }
}
//


const mapStateToProps = (state) => {
    return {
        futureTreatments: FutureTreatments(state.futureTreatments, state.treatsFilters),
        treatmentsFilters: state.treatsFilters
    };
};

export default connect(mapStateToProps)(TreatmentsList);
