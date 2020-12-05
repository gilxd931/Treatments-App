import moment from 'moment';

const treatsFilterReducerDefaultState = {
    text: '',
    display: 'historyTreatments',
    startDate: moment().subtract(1, 'M').startOf('month'),
    endDate: moment().add(1, 'M').endOf('month'),
    selectedTreatment: '',
    sortBy: 'name up'
}


export default (state = treatsFilterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TREAT_TEXT_FILTER':
            return { ...state, text: action.text }
        case 'DISPLAY_BY_HISTORY_TREATMENTS':
            return { ...state, display: "historyTreatments" }
        case 'DISPLAY_BY_FUTURE_TREATMENTS':
            return { ...state, display: "futureTreatments" }
        case 'SET_TREAT_START_DATE':
            return { ...state, startDate: action.startDate }
        case 'SET_TREAT_END_DATE':
            return { ...state, endDate: action.endDate }
        case 'SET_SELECTED_TREATMENT':
            return { ...state, selectedTreatment: action.text }
        case 'SORT_TREATMENT_NAME_UP':
            return { ...state, sortBy: 'name up' }
        case 'SORT_TREATMENT_NAME_DOWN':
            return { ...state, sortBy: 'name down' }
        case 'SORT_TREATMENT_DATE_UP':
            return { ...state, sortBy: 'date up' }
        case 'SORT_TREATMENT_DATE_DOWN':
            return { ...state, sortBy: 'date down' }
        default:
            return state;
    }
}




