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
        case 'SET_HISTORY_TREATMENTS':
            return action.treatments;
        default:
            return state;
    }
};

