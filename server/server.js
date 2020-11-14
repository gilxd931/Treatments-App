const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const herokuPort = process.env.PORT || 3000;
var admin = require("firebase-admin");


app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(herokuPort, () => {
    console.log('Server is up!');
});

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("ziEKalvvB7gu32vX61kpuiJfL4k1/clients");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function (snapshot) {
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

