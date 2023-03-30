import firebase from "firebase";

const firebaseConfig ={
 
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider =  new firebase.auth.GoogleAuthProvider();



export  {db, auth, storage, provider};




