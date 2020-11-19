import db from '../firebase/firebase';
import { getClientFutureTreatments } from '../firebase/operations';
import ClientNearestTreat from '../selectors/ClientNearestTreat';


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
            selected = [],
            lastTreat = null,
            nextTreat = null,
            isActive = true,
            birthday = '',
            sex,
        } = clientData;

        const sentSelected = { ...selected }


        const client = { fullName, address, note, selected: sentSelected, lastTreat, nextTreat, isActive, birthday, sex };
        const dispatchClient = { fullName, address, note, selected, lastTreat, nextTreat, isActive, birthday, sex }
        return db.ref(`${uid}/clients`).push(client).then((ref) => {
            dispatch(addClient({
                id: ref.key,
                ...dispatchClient
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
        })
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
            // then remove all clients treatments
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

export const startSetClientsTreatments = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return db.ref(`${uid}/clients`).once('value').then((snapshot) => {
            snapshot.forEach(childSnapshot => {
                const fullName = childSnapshot.val().fullName;
                getClientFutureTreatments(uid, fullName).then((clientsTreatments) => {

                    if (clientsTreatments && clientsTreatments.length > 0) { // if client have treatments update it
                        const nearestTreat = ClientNearestTreat(clientsTreatments, fullName);

                        if (nearestTreat) {
                            dispatch(startEditClient(childSnapshot.key, { nextTreat: nearestTreat }))
                        }
                    }
                    else {  // update to non exist 
                        dispatch(startEditClient(childSnapshot.key, { nextTreat: '' }))

                    }
                })

            })
            return undefined;
        });
    }
};

