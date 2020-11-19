const treatmentsReduerDefaultState = [];

export default (state = treatmentsReduerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_TREATMENT':
            return [...state, action.treatment]
        case 'EDIT_FUTURE_TREATMENT':
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
        case 'SET_TREATMENTS':
            return action.treatments;
        case 'REMOVE_FUTURE_TREATMENT':
            return state.filter(({ id }) => (id !== action.id))
        default:
            return state;
    }
};

