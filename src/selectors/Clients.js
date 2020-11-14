
export default (clients, { text, sortBy, active }) => {

    return clients.filter((client) => {
        const textMatch = client.fullName.toLowerCase().includes(text.toLowerCase());

        let activeMatch = true;

        if (client.isActive) {
            activeMatch = active === 'not active' ? false : true;
        }
        else {
            activeMatch = active === 'active' ? false : true;

        }
        return textMatch && activeMatch;

    }).sort((a, b) => {
        if (sortBy === 'lastTreat up') {
            return a.lastTreat < b.lastTreat ? -1 : 1;
        }
        else if (sortBy === 'lastTreat down') {
            return a.lastTreat < b.lastTreat ? 1 : -1;
        }
        else if (sortBy === 'name up') {
            return a.fullName < b.fullName ? -1 : 1;
        }
        else if (sortBy === 'name down') {
            return a.fullName < b.fullName ? 1 : -1;
        }
    })
};

