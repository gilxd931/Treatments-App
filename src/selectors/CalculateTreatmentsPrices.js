

export default (treatmentsList) => {
    let prices = {}
    treatmentsList.forEach(function (treatment) {

        const treatmentKey = treatment.selected.join([", "]);
        if (prices[treatmentKey]) {

            if (treatment.price) {
                prices[treatmentKey] = prices[treatmentKey] + parseInt(treatment.price);
            }
        }
        else {
            treatment.price ? prices[treatmentKey] = parseInt(treatment.price) : undefined;
        }
    });

    return prices;
}