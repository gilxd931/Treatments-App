export const setClientTextFilter = (text = '') => ({
    type: 'SET_CLIENT_TEXT_FILTER',
    text
})

export const sortClientByNameUp = () => ({
    type: 'SORT_CLIENT_NAME_UP'
})

export const sortClientByNameDown = () => ({
    type: 'SORT_CLIENT_NAME_DOWN'
})
export const sortClientByLastTreatUp = () => ({
    type: 'SORT_CLIENT_LAST_TREAT_UP'
})

export const sortClientByLastTreatDown = () => ({
    type: 'SORT_CLIENT_LAST_TREAT_DOWN'
})

export const setActive = (text = 'all') => ({
    type: 'SET_ACTIVE',
    text
})

export const setSelectedClient = (text = '') => ({
    type: 'SET_SELECTED_CLIENT',
    text
})
