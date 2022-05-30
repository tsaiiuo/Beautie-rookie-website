// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDMJSXMDgvRVAWukhYQXzVfVYYB8rjtnI",
  authDomain: "family-demo-703f5.firebaseapp.com",
  databaseURL:
    "https://family-demo-703f5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "family-demo-703f5",
  storageBucket: "family-demo-703f5.appspot.com",
  messagingSenderId: "18404961240",
  appId: "1:18404961240:web:1b5d6bfddc1d47fa2fa0ad",
  measurementId: "G-X6QT6V45G2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);
const submit = document.querySelector("#submit");

function writeUserData(userId, username, email, password) {
  const db = getDatabase();
  var email1 = email.replace("@", "").replace(".", "");
  set(ref(db, "unittest/" + email1), {
    username: username,
    userId: userId,
    email: email,
    password: password,
  });
  console.log("add success");
}
// write data
submit.addEventListener("click", (e) => {
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var email = document.getElementById("email").value;

  const userId = push(child(ref(database), "unittest")).key;
  writeUserData(userId, firstName, email, lastName);
  alert("saved");
});
// read data
getData.addEventListener("click", (e) => {
  $("#dataTbl td").remove();
  var rowNum = 0;
  const dbRef = ref(database, "users/");

  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // ...
        rowNum += 1;
        var row =
          "<tr><td>" +
          rowNum +
          "</td><td>" +
          childData.firstname +
          "</td><td>" +
          childData.lastname +
          "</td><td>" +
          childData.email +
          "</td></tr>";

        $(row).appendTo("#dataTbl");
      });
    },
    {
      onlyOnce: true,
    }
  );
});
