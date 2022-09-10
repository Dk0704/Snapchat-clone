import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCGLj32IRaKEXwx-mMcsK2dI5dzleuPAuk",
    authDomain: "snapchat-clone-9cb94.firebaseapp.com",
    projectId: "snapchat-clone-9cb94",
    storageBucket: "snapchat-clone-9cb94.appspot.com",
    messagingSenderId: "118338138761",
    appId: "1:118338138761:web:a5849499f61c7aa1698c58"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, storage, provider};   
  