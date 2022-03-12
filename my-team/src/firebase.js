import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAg_Gjvsj8fV4sut-pLcxDeXrRJpY8kwg4",
    authDomain: "myteam-b976d.firebaseapp.com",
    projectId: "myteam-b976d",
    storageBucket: "myteam-b976d.appspot.com",
    messagingSenderId: "691326751528",
    appId: "1:691326751528:web:4cb366653bfd0e3f37761d"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;  