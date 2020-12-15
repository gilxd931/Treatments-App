const treatmentsReduerDefaultState = [];

export default (state = treatmentsReduerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY_TREATMENT':
            return [...state, action.treatment]
        case 'EDIT_HISTORY_TREATMENT':
            return state.map((treatment) => {
                if (treatment.id === action.id) {
                    return {
                        ...treatment,
                        ...action.updates
                    }
                } else {
                    return treatment;
                }
            })
        case 'SET_TREATMENT_NOTICED':
            return state.map((treatment) => {
                if (treatment.id === action.id) {
                    return {
                        ...treatment,
                        ...action.noticed
                    }
                } else {
                    return treatment;
                }
            })
        case 'SET_HISTORY_TREATMENTS':
            return action.treatments;
        case 'REMOVE_HISTORY_TREATMENT':
            return state.filter(({ id }) => (id !== action.id))
        default:
            return state;
    }
};

