import db from '../firebase/firebase';

export const addClient = (client = {}) => ({
    type: 'ADD_CLIENT',
    client
})

export const startAddClient = (clientData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            fullName = '',
            address = '',
            note = '',
            selected = {},
            lastTreat = 1604580865785, // dummy
            nextTreat = 1604580865785,  //dummy
            isActive = true,
            birthday = '',
            sex,
            treatsCount = 0
        } = clientData;

        const sentSelected = { ...selected }

        const client = { fullName, address, note, sentSelected, lastTreat, nextTreat, isActive, birthday, sex, treatsCount };
        return db.ref(`${uid}/clients`).push(client).then((ref) => {
            dispatch(addClient({
                id: ref.key,
                ...client
            }))
        });
    }
};

export const setClients = (clients) => ({
    type: 'SET_CLIENTS',
    clients
})


export const startSetClients = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return db.ref(`${uid}/clients`).once('value').then((snapshot) => {
            const clients = [];

            snapshot.forEach((childSnapshot) => {
                clients.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setClients(clients));
        });
    };
};

export const removeClient = ({ id } = {}) => ({
    type: 'REMOVE_CLIENT',
    id
});

export const startRemoveClient = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return db.ref(`${uid}/clients/${id}`).remove().then(() => {
            dispatch(removeClient({ id }));
        });
    };
};

export const editClient = (id, updates) => ({
    type: 'EDIT_CLIENT',
    id,
    updates
});

export const startEditClient = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`/${uid}/clients/${id}`).update(updates).then(() => {
            dispatch(editClient(id, updates))
        });
    }
}