export const setTreatTextFilter = (text = '') => ({
    type: 'SET_TREAT_TEXT_FILTER',
    text
})

export const sortTreatByName = () => ({
    type: 'SORT_TREAT_NAME'
})

export const sortTreatByLastTreat = () => ({
    type: 'SORT_TREAT_LAST_TREAT'
})

export const setTreatStartDate = (startDate = undefined) => ({
    type: 'SET_TREAT_START_DATE',
    startDate
});

export const setTreatEndDate = (endDate = undefined) => ({
    type: 'SET_TREAT_END_DATE',
    endDate
});