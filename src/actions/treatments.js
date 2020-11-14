import db from '../firebase/firebase';

export const addTreatment = (treatment = {}) => ({
    type: 'ADD_TREATMENT',
    treatment
})

export const startAddTreatment = (treatmentData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            clientName = '',
            selected = {},
            date = 1604540165785, // dummy
            reason = '',
        } = treatmentData;

        console.log(treatmentData)

        const sentSelected = { ...selected }

        const treatCount = 1;// get treatment count and send next and update curr to next

        const treatment = { clientName, date, sentSelected, reason };
        return db.ref(`${uid}/treatments`).push(treatment).then((ref) => {
            dispatch(addTreatment({
                id: ref.key,
                ...treatment
            }))
        });
    }
};

export const setTreatments = (treatments) => ({
    type: 'SET_TREATMENTS',
    treatments
})


export const startSetTreatments = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return db.ref(`${uid}/treatments`).once('value').then((snapshot) => {
            const treatments = [];

            snapshot.forEach((childSnapshot) => {
                treatments.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setTreatments(treatments));
        });
    };
};
