import db from './firebase';


export const getClientTreatments = (name, uid) => {
    return db.ref(`ziEKalvvB7gu32vX61kpuiJfL4k1/treatments`).once('value').then((snapshot) => {

        const treatments = [];

        snapshot.forEach((childSnapshot) => {
            treatments.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
    })


    // console.log(name)
    // let treatmentsRef = db.ref(`${uid}/treatments`);
    // return treatmentsRef.where("clientName", "==", name);
}