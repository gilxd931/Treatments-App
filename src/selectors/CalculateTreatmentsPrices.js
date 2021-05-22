

export default (treatmentsList, year = new Date().getFullYear()) => {
    let prices = {}
    treatmentsList.forEach(function (treatment) {
        if (new Date(treatment.date).getFullYear() == year) {
            const treatmentKey = treatment.selected.join([", "]);
            if (prices[treatmentKey]) {
                prices[treatmentKey][0] = prices[treatmentKey][0] + 1;
                if (treatment.price) {
                    prices[treatmentKey][1] = prices[treatmentKey][1] + parseInt(treatment.price);
                }
            }
            else {
                prices[treatmentKey] = [1, 0];
                treatment.price ? prices[treatmentKey][1] = parseInt(treatment.price) : 0;

            }
        }
    });
    let returnList = []
    for (const [key, value] of Object.entries(prices)) {
        returnList.push({ treat: key, price: value[1], count: value[0] })
    }

    return returnList;
}
