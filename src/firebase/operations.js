import db from './firebase';

export const getClientFutureTreatments = (uid, fullName) => {
    return db.ref(`${uid}/futureTreatments`).orderByChild('clientName').equalTo(fullName).once('value').then((snapshot) => {
        let clientsTreatments = []
        snapshot.forEach(childSnapshot => {

            clientsTreatments.push({
                date: childSnapshot.val().date,
                id: childSnapshot.key
            });

        });
        return clientsTreatments;
    });
};


export const getUnoticedTreatments = (uid) => {

    return db.ref(`${uid}/historyTreatments`).orderByChild('noticed').equalTo(false).once('value').then((snapshot) => {
        let unoticedTreatments = []
        snapshot.forEach(childSnapshot => {

            unoticedTreatments.push({
                treatment: childSnapshot.val(),
                id: childSnapshot.key
            });

        });
        return unoticedTreatments;
    });
};