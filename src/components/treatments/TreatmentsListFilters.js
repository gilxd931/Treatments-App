import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTreatTextFilter, sortTreatByLastTreat, sortTreatByName, setTreatStartDate, setTreatEndDate } from '../../actions/treatsFilters';
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
                            placeholder="חיפוש טיפול"
                            value={this.props.treatsFilters.text}
                            onChange={(e) => {
                                this.props.dispatch(setTreatTextFilter(e.target.value))
                            }}
                        /></div>

                    <div className="input-group__item">
                        <select className="select"
                            value={this.props.treatsFilters.sortBy}
                            onChange={(e) => {
                                if (e.target.value === 'lastTreat') {
                                    this.props.dispatch(sortTreatByLastTreat());
                                }
                                else if (e.target.value === 'name') {
                                    this.props.dispatch(sortTreatByName());
                                }
                            }}
                        >
                            <option value="lastTreat">טיפול אחרון</option>
                            <option value="name">שם</option>
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