import app from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const appInstance = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
})

class Firebase {
     
    constructor() {
        this.db = app.database();
    }
    tests = () => this.db.ref('tests');
    grades = () => this.db.ref('grades');
    addTeacherRole = firebase.functions().httpsCallable('addTeacherRole'); 
}


export const auth = appInstance.auth()

export default Firebase
