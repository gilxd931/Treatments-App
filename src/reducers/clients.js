const clientsReduerDefaultState = [];

export default (state = clientsReduerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CLIENT':
            return [...state, action.client]
        case 'REMOVE_CLIENT':
            return state.filter(({ id }) => (id !== action.id))
        case 'EDIT_CLIENT':
            return state.map((client) => {
                if (client.id === action.id) {
                    return {
                        ...client,
                        ...action.updates
                    }
                } else {
                    return client;
                }
            })
        case 'SET_CLIENTS':
            return action.clients;
        case 'REMOVE_CLIENT':
            return state.filter(({ id }) => (id !== action.id))
        default:
            return state;
    }
};

