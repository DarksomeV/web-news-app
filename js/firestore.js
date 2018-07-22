const FirestoreInit = (function(){
	var instance;
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAs55HENWwGTuJ_nDzSYk_s8OE5W49aT_4",
    authDomain: "news-app-5b78a.firebaseapp.com",
    databaseURL: "https://news-app-5b78a.firebaseio.com",
    projectId: "news-app-5b78a",
    storageBucket: "news-app-5b78a.appspot.com",
    messagingSenderId: "994125844797"
  };
  firebase.initializeApp(config);

  // Initialize Cloud Firestore through Firebase
		var db = firebase.firestore();

		function getDb() {
			return db;
		}
		function createInstance() {
			return {
				getDb
			}
		}

		return {
			getInstance() {
				return instance || (instance = createInstance());
			}
		}

})()