import React from 'react';
import { connect } from 'react-redux';
import { setClientTextFilter, setActive } from '../../actions/clientsFilters';
import { Link } from 'react-router-dom';

class ClientsListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = (({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
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
                            value={this.props.clientsFilters.text}
                            onChange={(e) => {
                                this.props.dispatch(setClientTextFilter(e.target.value))
                            }}
                        /></div>

                    <div className="input-group__item">
                        <select className="select"
                            value={this.props.clientsFilters.active}
                            onChange={(e) => {
                                this.props.dispatch(setActive(e.target.value))
                            }}
                        >
                            <option value="all">הכל</option>
                            <option value="active">פעיל</option>
                            <option value="not active">לא פעיל</option>

                        </select>
                    </div>

                </div>

                <div>
                    <Link to='/createClient' className="button">מטופל חדש</Link>
                </div>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        clientsFilters: state.clientsFilters
    }
}

export default connect(mapStateToProps)(ClientsListFilters);