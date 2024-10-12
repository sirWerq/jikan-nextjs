
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCzxjBFL6KX0dFTIz70X-7HaKTXhXijR9k",
    authDomain: "mangkrak-c5276.firebaseapp.com",
    projectId: "mangkrak-c5276",
    storageBucket: "mangkrak-c5276.appspot.com",
    messagingSenderId: "942026673474",
    appId: "1:942026673474:web:bcfcce7d14ed744e378cdb",
    measurementId: "G-FQWPYST0PG"
};

app = initializeApp(firebaseConfig);

const storage = getStorage(app)

module.exports = { storage }