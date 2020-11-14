const treatmentsReduerDefaultState = [];

export default (state = treatmentsReduerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_TREATMENT':
            return [...state, action.treatment]
        case 'REMOVE_TREATMENT':
            return state.filter(({ id }) => (id !== action.id))
        case 'EDIT_TREATMENT':
            return state.map((treatment) => {
                if (treatment.id === treatment.id) {
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
        case 'REMOVE_TREATMENT':
            return state.filter(({ id }) => (id !== action.id))
        default:
            return state;
    }
};

