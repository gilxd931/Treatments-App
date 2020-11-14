import moment from 'moment';

const clientsFilterReducerDefaultState = {
    text: '',
    sortBy: 'name up',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    active: 'all',
    selectedClient: ''
}


export default (state = clientsFilterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_CLIENT_TEXT_FILTER':
            return { ...state, text: action.text }
        case 'SORT_CLIENT_NAME_UP':
            return { ...state, sortBy: 'name up' }
        case 'SORT_CLIENT_NAME_DOWN':
            return { ...state, sortBy: 'name down' }
        case 'SORT_CLIENT_LAST_TREAT_UP':
            return { ...state, sortBy: 'lastTreat up' }
        case 'SORT_CLIENT_LAST_TREAT_DOWN':
            return { ...state, sortBy: 'lastTreat down' }
        case 'SET_ACTIVE':
            return { ...state, active: action.text }
        case 'SET_SELECTED_CLIENT':
            return { ...state, selectedClient: action.text }
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate }
        case 'SET_END_DATE':
            return { ...state, endDate: action.endDate }
        default:
            return state;
    }
}