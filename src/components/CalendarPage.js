import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

const getEvents = (allTreatments) => {
    let id = 0;
    let parsedAllTreatments = [];
    allTreatments.map((treatment) => (

        parsedAllTreatments.push(
            {
                id: id++,
                title: `${treatment.selected} ל${treatment.clientName}`,
                start: new Date(treatment.date),
                end: new Date(treatment.date + 60 * 60 * 1000),
            }
        )
    ))
    console.log(parsedAllTreatments)
    return parsedAllTreatments;
};

const TreatmentsPage = (props) => {
    return (
        <div>
            <BigCalendar
                style={{ height: '750px' }}
                events={getEvents(props.historyTreatments.concat(props.futureTreatments))}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                culture='he-HE'
                messages={{
                    next: "הבא",
                    previous: "הקודם",
                    today: "היום",
                    month: "חודש",
                    week: "שבוע",
                    day: "יום",
                    agenda: "אג'נדה",
                    event: "טיפולים",
                    time: "זמן",
                    date: "תאריך",
                }}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        futureTreatments: state.futureTreatments,
        historyTreatments: state.historyTreatments
    };
};

export default connect(mapStateToProps)(TreatmentsPage);

