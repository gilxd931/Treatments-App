

export default (treatmentsList, id) => {
    return treatmentsList.filter((treatment) => treatment.id === id)[0]
}