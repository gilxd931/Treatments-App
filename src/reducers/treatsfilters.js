import moment from 'moment';

const treatsFilterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}


export default (state = treatsFilterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TREAT_TEXT_FILTER':
            return { ...state, text: action.text }
        case 'SORT_TREAT_NAME':
            return { ...state, sortBy: 'name' }
        case 'SORT_TREAT_LAST_TREAT':
            return { ...state, sortBy: 'lastTreat' }
        case 'SET_TREAT_START_DATE':
            return { ...state, startDate: action.startDate }
        case 'SET_TREAT_END_DATE':
            return { ...state, endDate: action.endDate }
        default:
            return state;
    }
}