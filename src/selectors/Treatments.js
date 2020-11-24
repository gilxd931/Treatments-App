import moment from 'moment';

export default (treatments, { text, startDate, endDate, sortBy }) => {


    return treatments.filter((treatment) => {
        const createdAtMoment = moment(treatment.date);

        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = treatment.clientName.toLowerCase().includes(text.toLowerCase());

        return textMatch && startDateMatch && endDateMatch;

    }).sort((a, b) => {
        if (sortBy === 'date up') {
            return a.date < b.date ? -1 : 1;
        }
        else if (sortBy === 'date down') {
            return a.date < b.date ? 1 : -1;
        }
        else if (sortBy === 'name up') {
            return a.clientName < b.clientName ? -1 : 1;
        }
        else if (sortBy === 'name down') {
            return a.clientName < b.clientName ? 1 : -1;
        }
    })
};

