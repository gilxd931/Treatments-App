const treatmentsArrayReduerDefaultState = [];

export default (state = treatmentsArrayReduerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ARRAY':
            return [...state, action.array]
        case 'REMOVE_ARRAY':
            return state.filter(({ id }) => (id !== action.id))
        case 'EDIT_ARRAY':
            return state.map((array) => {
                if (array.id === action.id) {
                    return {
                        ...array,
                        ...action.updates
                    }
                } else {
                    return array;
                }
            })
        default:
            return state;
    }
};

