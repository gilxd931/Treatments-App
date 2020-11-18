import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTreatTextFilter, setTreatStartDate, setTreatEndDate, displayByHistoryTreatments, displayByFutureTreatments } from '../../actions/treatsFilters';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class TreatmentsListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = (({ startDate, endDate }) => {
        this.props.dispatch(setTreatStartDate(startDate));
        this.props.dispatch(setTreatEndDate(endDate));
    })

    onFocusChange = ((calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    });
    render() {
        return (
            <div className="content-container clients-page-header">
                <div className="input-group">
                    <div className="input-group__item">
                        <input className="text-input" type="text"
                            placeholder="שם מטופל"
                            value={this.props.treatsFilters.text}
                            onChange={(e) => {
                                this.props.dispatch(setTreatTextFilter(e.target.value))
                            }}
                        /></div>

                    <div className="input-group__item">
                        <select className="select"
                            value={this.props.treatsFilters.display}
                            onChange={(e) => {
                                if (e.target.value === 'historyTreatments') {
                                    this.props.dispatch(displayByHistoryTreatments());
                                }
                                else if (e.target.value === 'futureTreatments') {
                                    this.props.dispatch(displayByFutureTreatments());
                                }
                            }}
                        >
                            <option value="historyTreatments">טיפולים שהיו</option>
                            <option value="futureTreatments">טיפוליים עתידיים</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.treatsFilters.startDate}
                            endDate={this.props.treatsFilters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                            startDatePlaceholderText={"תאריך התחלה"}
                            endDatePlaceholderText={"תאריך סיום"}
                            customArrowIcon={<FaLongArrowAltLeft />}
                        />
                    </div>
                </div>

                <div>
                    <Link to='/createTreatment' className="button">טיפול חדש</Link>
                </div>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        treatsFilters: state.treatsFilters
    }
}

export default connect(mapStateToProps)(TreatmentsListFilters);