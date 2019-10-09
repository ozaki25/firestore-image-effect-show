import firebase from 'firebase/app';
import 'firebase/firestore';

const SAVED_NUMBER = 10;

class Firestore {
  constructor() {
    this.images = [];
    this.stock = [];
    this.savedStock = [];
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
      .limit(SAVED_NUMBER);
  }

  subscribeImages() {
    this.dbImagesRef.onSnapshot(this.receivedImages.bind(this));
  }

  receivedImages(snapshot) {
    const images = snapshot.docs.map(doc => doc.data());
    console.log('reveived', { images });
    this.addImage(images[0]);
    this.putStock(images);
    this.putSavedStock(images);
  }

  addImage(image) {
    this.images = [...this.images, image];
  }

  putImages(images) {
    this.images = images;
  }

  putStock(images) {
    this.stock = images;
  }

  putSavedStock(images) {
    this.savedStock = images;
  }

  getImage() {
    const images = [...this.images];
    const stock = [...this.stock];
    console.log('get', { images, stock });
    if (this.images.length) {
      this.putImages(images.slice(1));
      return images[0];
    } else if (this.stock.length) {
      this.putStock(stock.slice(0, -1));
      return stock[stock.length - 1];
    } else {
      this.putStock(this.savedStock);
      return this.getImage();
    }
  }
}

export default Firestore;
