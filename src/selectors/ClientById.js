

export default (clientsList, id) => {
    return clientsList.filter((client) => client.id === id)[0]
}