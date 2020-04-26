import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyB6B2iS2f7y6BkoypUCfXzsC7-Fp_o5XDA",
    authDomain: "jenius-test.firebaseapp.com",
    databaseURL: "https://jenius-test.firebaseio.com",
    projectId: "jenius-test",
    storageBucket: "jenius-test.appspot.com",
    messagingSenderId: "699079954698",
    appId: "1:699079954698:web:249f885149e886fafb2af3",
    measurementId: "G-L66XSE6K5G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };