const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const datab = admin.database();


exports.addTeacherRole = functions.https.onCall((data, context) => {
    //get user and add custom claim (teacher)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return{
            message: `Added ${data.email} as a teacher account`
        }

    }).catch(error => {
        return error;
    });
});

exports.testFunction = functions.https.onCall((data, context) => {
    functions.logger.info(data.text);
    return { text: "Server Text" };
});
