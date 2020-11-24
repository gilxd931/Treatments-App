import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

const localizer = BigCalendar.momentLocalizer(moment);



const TreatmentsPage = () => {
    return (
        <div>
            <BigCalendar
                style={{ height: '420px' }}
                events={[{
                    id: 0,
                    title: "All Day Event very long title",
                    allDay: true,
                    start: new Date(2020, 11, 11),
                    end: new Date(2020, 11, 11)
                },
                {
                    id: 5,
                    title: "Conference",
                    start: new Date(2020, 11, 22),
                    end: new Date(2020, 11, 22),
                    desc: "Big conference for important people"
                }]}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
};

export default TreatmentsPage;
