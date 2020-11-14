export default (ClientTreatmentsList) => {
    const now = new Date().getTime();
    let nearestTreatId = undefined;
    let minDiff = Number.MAX_VALUE;
    ClientTreatmentsList.forEach(treat => {
        if (treat.date - now >= 0 && treat.date - now < minDiff) {
            nearestTreatId = treat.id;
            minDiff = treat.date - now;

        }
    });
    return nearestTreatId;
}