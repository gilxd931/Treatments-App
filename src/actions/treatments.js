import db from '../firebase/firebase';
import { getClientFutureTreatments } from '../firebase/operations';
import ClientNearestTreat from '../selectors/ClientNearestTreat';
import { startEditClient, startSetClientsTreatments } from './clients';

export const addTreatment = (treatment = {}) => ({
    type: 'ADD_TREATMENT',
    treatment
})

export const startAddTreatment = (treatmentData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            clientName = '',
            selected = [],
            date = 1604540165785, // dummy
            reason = '',
            clientId = undefined
        } = treatmentData;

        const sentSelected = { ...selected }

        const treatment = { clientName, date, selected: sentSelected, reason, clientId };
        const dispatchTreatment = { clientName, date, selected, reason, clientId };

        return db.ref(`${uid}/futureTreatments`).push(treatment).then((ref) => {
            dispatch(addTreatment({
                id: ref.key,
                ...dispatchTreatment
            }))
        }).then(() => {
            dispatch(checkForNearestDateUpdate(clientName, clientId));
        });
    }
};

export const setFutureTreatments = (treatments) => ({
    type: 'SET_TREATMENTS',
    treatments
})


export const startSetFutureTreatments = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`${uid}/futureTreatments`).once('value').then((snapshot) => {
            const futureTreatments = [];

            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().date <= new Date().getTime()) {
                    //remove treat from future and add it to history
                    console.log("remove treat from future and add it to history")
                }

                futureTreatments.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setFutureTreatments(futureTreatments));
        }).then(() => {
            dispatch(startSetClientsTreatments());
        })
    };
};


export const checkForNearestDateUpdate = (clientName, cid) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        getClientFutureTreatments(uid, clientName).then((clientTreatments) => {
            const nearestTreat = ClientNearestTreat(clientTreatments);
            if (nearestTreat)
                dispatch(startEditClient(cid, { nextTreat: nearestTreat }));

        })
    }
};


export const removeFutureTreatment = ({ id } = {}) => ({
    type: 'REMOVE_FUTURE_TREATMENT',
    id
});

export const startRemoveFutureTreatment = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return db.ref(`${uid}/futureTreatments/${id}`).remove().then(() => {
            dispatch(removeFutureTreatment({ id }));
        });
    };
};

export const editFutureTreatment = (id, updates) => ({
    type: 'EDIT_FUTURE_TREATMENT',
    id,
    updates
});

export const startEditFutureTreatment = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`/${uid}/futureTreatments/${id}`).update(updates).then(() => {
            dispatch(editFutureTreatment(id, updates))
            dispatch(checkForNearestDateUpdate(updates.clientName, updates.clientId));
        });
    }
}
