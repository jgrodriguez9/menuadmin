import firebase from 'firebase/app';
import 'firebase/auth';

export const app = firebase.initializeApp({
    apiKey: "AIzaSyCCE_KvyKf3tpNp2qNlA_Du9UKDvbFu_oc",
    authDomain: "menuadmin-b7fce.firebaseapp.com",
    projectId: "menuadmin-b7fce",
    storageBucket: "menuadmin-b7fce.appspot.com",
    messagingSenderId: "784926561914",
    appId: "1:784926561914:web:948abd925ade6370a78dc3"
});

export default app;