import React from 'react';
import { connect } from 'react-redux';
import Treatments from '../../selectors/Treatments';
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
        const treatmentsList = this.props.treatmentsFilters.display === 'historyTreatments' ? this.props.historyTreatments : this.props.futureTreatments
        const modal = !!this.props.treatmentsFilters.selectedTreatment ?
            <TreatmentModal treatmentsList={treatmentsList}
            /> : undefined

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

                <div className="list-body">
                    {
                        treatmentsList.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span >לא נמצאו טיפולים</span>
                            </div>
                        ) :
                            (
                                treatmentsList.map((treat) => (
                                    <TreatmentListItem key={treat.id} {...treat} type={this.props.treatmentsFilters.display}
                                    />
                                ))
                            )
                    }
                </div>

                {modal}


            </div>
        )
    }
}
//


const mapStateToProps = (state) => {
    return {
        futureTreatments: Treatments(state.futureTreatments, state.treatsFilters),
        historyTreatments: Treatments(state.historyTreatments, state.treatsFilters),
        treatmentsFilters: state.treatsFilters
    };
};

export default connect(mapStateToProps)(TreatmentsList);
