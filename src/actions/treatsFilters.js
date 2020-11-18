export const setTreatTextFilter = (text = '') => ({
    type: 'SET_TREAT_TEXT_FILTER',
    text
})

export const displayByFutureTreatments = () => ({
    type: 'DISPLAY_BY_FUTURE_TREATMENTS'
})

export const displayByHistoryTreatments = () => ({
    type: 'DISPLAY_BY_HISTORY_TREATMENTS'
})

export const setTreatStartDate = (startDate = undefined) => ({
    type: 'SET_TREAT_START_DATE',
    startDate
});

export const setTreatEndDate = (endDate = undefined) => ({
    type: 'SET_TREAT_END_DATE',
    endDate
});

export const setSelectedTreatment = (text = '') => ({
    type: 'SET_SELECTED_TREATMENT',
    text
})


export const sortTreatmentByNameUp = () => ({
    type: 'SORT_TREATMENT_NAME_UP'
})

export const sortTreatmentByNameDown = () => ({
    type: 'SORT_TREATMENT_NAME_DOWN'
})
export const sortTreatmentByDateUp = () => ({
    type: 'SORT_TREATMENT_DATE_UP'
})

export const sortTreatmentByDateDown = () => ({
    type: 'SORT_TREATMENT_DATE_DOWN'
})