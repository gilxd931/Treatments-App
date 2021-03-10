import db, { storage } from '../firebase/firebase';
import { getClientFutureTreatments } from '../firebase/operations';
import ClientNearestTreat from '../selectors/ClientNearestTreat';
import { startEditClient, startSetClientsTreatments } from './clients';
import { maxStorageFileSize, maxStorageFilesNumber } from '../utils';


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
            clientId = undefined,
            price = 0
        } = treatmentData;

        const sentSelected = { ...selected }

        const treatment = { clientName, date, selected: sentSelected, reason, price, clientId };
        const dispatchTreatment = { clientName, date, selected, reason, price, clientId };

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
                    dispatch(startAddHistoryTreatment(childSnapshot.val()));
                    dispatch(startRemoveFutureTreatment({ id: childSnapshot.key }))
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
            if (clientTreatments.length === 0) { // no treats. update next treat to none
                dispatch(startEditClient(cid, { nextTreat: '' }));

            }
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

            if (updates.date && updates.date <= new Date().getTime()) {
                dispatch(startAddHistoryTreatment(updates));
                dispatch(startRemoveFutureTreatment({ id })).then(() => {
                    console.log('removed future treatment')
                    dispatch(checkForNearestDateUpdate(updates.clientName, updates.clientId));
                })
            }
        });
    }
}


export const setHistoryTreatments = (treatments) => ({
    type: 'SET_HISTORY_TREATMENTS',
    treatments
})


export const startSetHistoryTreatments = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`${uid}/historyTreatments`).once('value').then((snapshot) => {
            const historyTreatments = [];

            snapshot.forEach((childSnapshot) => {
                historyTreatments.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setHistoryTreatments(historyTreatments));
        });
    };
};


export const addHistoryTreatment = (treatment = {}) => ({
    type: 'ADD_HISTORY_TREATMENT',
    treatment
})

export const startAddHistoryTreatment = (treatmentData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            clientName = '',
            selected = [],
            date = 1604540165785, // dummy
            reason = '',
            clientId = undefined,
            noticed = false,
            price = 0
        } = treatmentData;

        const sentSelected = { ...selected }

        const treatment = { clientName, date, selected: sentSelected, reason, clientId, noticed, price };
        const dispatchTreatment = { clientName, date, selected, reason, clientId, noticed, price };

        return db.ref(`${uid}/historyTreatments`).push(treatment).then((ref) => {
            dispatch(addHistoryTreatment({
                id: ref.key,
                ...dispatchTreatment
            }))
        });
    }
};

export const setTreatmentNoticed = (id) => ({
    type: 'SET_TREATMENT_NOTICED',
    id
})

export const startSetTreatmentNoticed = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return db.ref(`/${uid}/historyTreatments/${id}`).update({ noticed: true }).then(() => {

            dispatch(setTreatmentNoticed(id));

        });
    }
}


export const editHistoryTreatment = (id, updates) => ({
    type: 'EDIT_HISTORY_TREATMENT',
    id,
    updates
});

export const startEditHistoryTreatment = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`/${uid}/historyTreatments/${id}`).update(updates).then(() => {
            dispatch(editHistoryTreatment(id, updates));
        });
    }
}

export const removeHistoryTreatment = ({ id } = {}) => ({
    type: 'REMOVE_HISTORY_TREATMENT',
    id
});

export const startRemoveHistoryTreatment = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return db.ref(`${uid}/historyTreatments/${id}`).remove().then(() => {
            dispatch(removeHistoryTreatment({ id }));
        });
    };
};

export const uploadImages = (treatmentId, files) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        if (files.length <= maxStorageFilesNumber) {
            // loop through files
            for (let i = 0; i < files.length; i++) {

                const currentFile = files[i];

                if (currentFile.type && currentFile.size <= maxStorageFileSize && acceptedImageTypes.includes(currentFile['type'])) {
                    storage.ref(`${uid}/${treatmentId}`).child(currentFile.name).put(currentFile).then(() => {
                        console.log("upldaoded files to storage");
                    })
                }
            }
        }
        else {
            alert("מספר התמונות להעלאה גדול מדי");
        }
    };
}

export const getTreatmentImages = (treatmentId, imageName) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        console.log(treatmentId);
        const storageRef = storage.ref(`${uid}/${treatmentId}`);
        return storageRef.child(`${imageName}`).getDownloadURL();
    };
}

