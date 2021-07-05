import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAgpSkgXR3iDhMYv8he95N24EZZDO31gbg",
	authDomain: "slack-clone-62add.firebaseapp.com",
	projectId: "slack-clone-62add",
	storageBucket: "slack-clone-62add.appspot.com",
	messagingSenderId: "498901324899",
	appId: "1:498901324899:web:ae0cba54709544fa981456",
};

//creates a firebase app (connects front end to firebase)
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
//google authentication
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
