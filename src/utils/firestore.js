import firebase from 'firebase/app'; //必須
import 'firebase/firestore'; //必要なモジュールごとにimport

class Firestore {
  constructor() {
    this.initFirebase();
    this.setImagesRef();
  }

  initFirebase() {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      projectId: process.env.REACT_APP_PROJECT_ID,
    });
  }

  setImagesRef() {
    this.dbImagesRef = firebase
      .firestore()
      .collection('images')
      .orderBy('timestamp', 'desc')
      .limit(1);
  }

  subscribe({ ref, onRecive }) {
    ref.onSnapshot(snapshot => {
      // 1件目だけ返す
      snapshot.docs.forEach(doc => onRecive(doc.data()));
    });
  }
}

export default Firestore;
