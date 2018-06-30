import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCyz9lKvLJKHEpCirTV9n6YtU_e9-wfZ4s",
  authDomain: "catch-of-the-day-eias-duong.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-eias-duong.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;
