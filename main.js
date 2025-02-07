import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { firebaseConfig } from "./config.js"; // Import credentials from config.js

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// Check if the user is already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, save user details and redirect
    const firstName = user.displayName.split(" ")[0];
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("email", user.email);
    localStorage.setItem("uid", user.uid);  // Save user's unique ID
    localStorage.setItem("lastLogin", new Date().toISOString());  // Save last login time

    // Redirect to the next page
    // window.location.href = "Desktop_2.html";
  }
});

// Set up the Google sign-in button click handler
const googleLogin = document.getElementById("googleSignInButton");

googleLogin.addEventListener("click", function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // Save user details to localStorage
      const firstName = user.displayName.split(" ")[0];
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("uid", user.uid);  // Save user's unique ID
      localStorage.setItem("lastLogin", new Date().toISOString());  // Save last login time
      
    //   window.location.href = "Desktop_2.html";
      alert("Authentication Done");
      
    })
    .catch((error) => {
      console.error("Error signing in: ", error);
    });
});