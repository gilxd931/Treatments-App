// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

// messages
const messaging = firebase.messaging();

messaging.getToken({
    vapidKey: "AAAADj6r0SA:APA91bG1Tn_trHi49EKttGFMhAFE7D8qHRblzzsHYKII3qVhmX1ieIRrTxFlXAEfkU9tmO_QDf5kFfy__TywHk24_hDpkr_yll-gVpP7LIp0SiFI4CMlHU1rmhPwVetfafxacAxB47DG"
});

const token = "AAAADj6r0SA:APA91bG1Tn_trHi49EKttGFMhAFE7D8qHRblzzsHYKII3qVhmX1ieIRrTxFlXAEfkU9tmO_QDf5kFfy__TywHk24_hDpkr_yll-gVpP7LIp0SiFI4CMlHU1rmhPwVetfafxacAxB47DG"
messaging.getToken({ vapidKey: token }).then((currentToken) => {
    if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
    } else {
        // Show permission request.
        console.log('No registration token available. Request permission to generate one.');
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving registration token. ', err);
    setTokenSentToServer(false);
});