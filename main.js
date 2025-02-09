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
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Send token to backend for verification
        const token = await user.getIdToken();
        localStorage.setItem("token", token);

        const response = await fetch("https://c84f-2409-40f4-ae-a14c-ac17-6087-d358-2e2e.ngrok-free.app/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            localStorage.setItem("firstName", user.displayName.split(" ")[0]);
            localStorage.setItem("email", user.email);
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("lastLogin", new Date().toISOString());

            alert("Login Successful");
            window.location.href = "page2.html"; // Redirect if needed
        } else {
            alert("Login Failed: " + data.message);
        }
    }
});

// Set up the Google sign-in button click handler
const googleLogin = document.getElementById("googleSignInButton");

googleLogin.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            const token = await user.getIdToken();

            // Send token to backend
            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                localStorage.setItem("firstName", user.displayName.split(" ")[0]);
                localStorage.setItem("email", user.email);
                localStorage.setItem("uid", user.uid);
                localStorage.setItem("lastLogin", new Date().toISOString());

                // alert("Authentication Done");
                window.location.href = "page2.html";
            } else {
                alert("Login Failed: " + data.message);
            }
        })
        .catch((error) => {
            console.error("Error signing in: ", error);
        });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".footer-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1); // Get ID from href
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust for navbar height
                    behavior: "smooth"
                });
            }
        });
    });
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1); // Get ID from href
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust for navbar height
                    behavior: "smooth"
                });
            }
        });
    });
});


const upload = document.getElementById("redirect");

upload.addEventListener("click", function() {
    window.location.href = "page2.html";
});

// Manually handles scrollable

// const carousel = document.querySelector('.carousel');
// const dots = document.querySelectorAll('.dot');
// const items = document.querySelectorAll('.carousel-item');

// // Update active dot based on scroll position
// carousel.addEventListener('scroll', () => {
//   const scrollPosition = carousel.scrollLeft;
//   const itemWidth = items[0].offsetWidth + 24; // Width + gap
//   const activeIndex = Math.round(scrollPosition / itemWidth);
  
//   dots.forEach((dot, index) => {
//       dot.classList.toggle('active', index === activeIndex);
//   });
// });

// // Scroll to corresponding item when dot is clicked
// dots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         const itemWidth = items[0].offsetWidth + 24; // Width + gap
//         carousel.scrollTo({
//             left: itemWidth * index,
//             behavior: 'smooth'
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", async function () {
    const carousel = document.querySelector(".carousel");
    const dotsContainer = document.querySelector(".carousel-dots");

    async function fetchImages() {
        try {
            const response = await fetch("YOUR_BACKEND_ROUTE_HERE"); // Replace with your API route
            const images = await response.json(); // Assuming backend returns an array of { url, detection }

            carousel.innerHTML = ""; // Clear existing images
            dotsContainer.innerHTML = ""; // Clear existing dots

            images.forEach((image, index) => {
                // Create carousel item
                const item = document.createElement("div");
                item.classList.add("carousel-item");
                item.setAttribute("data-detection", image.detection);

                const img = document.createElement("img");
                img.src = image.url;
                img.alt = `Image ${index + 1}`;

                item.appendChild(img);
                carousel.appendChild(item);

                // Create dot for navigation
                const dot = document.createElement("div");
                dot.classList.add("dot");
                if (index === 0) dot.classList.add("active");

                dot.addEventListener("click", () => {
                    const itemWidth = item.offsetWidth + 24; // Width + gap
                    carousel.scrollTo({ left: itemWidth * index, behavior: "smooth" });
                });

                dotsContainer.appendChild(dot);
            });

            updateActiveDot(); // Initialize dot updates
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    function updateActiveDot() {
        const items = document.querySelectorAll(".carousel-item");
        const dots = document.querySelectorAll(".dot");

        carousel.addEventListener("scroll", () => {
            const scrollPosition = carousel.scrollLeft;
            const itemWidth = items[0]?.offsetWidth + 24; // Width + gap
            const activeIndex = Math.round(scrollPosition / itemWidth);

            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === activeIndex);
            });
        });
    }

    fetchImages(); // Fetch images on page load
});
