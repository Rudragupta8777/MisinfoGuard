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

const upload = document.getElementById("googleSignOutButton");

upload.addEventListener("click", function () {
    window.location.href = "index.html";
});

// // File Upload Modal Logic
// document.addEventListener('DOMContentLoaded', function() {
//   const modal = document.getElementById('uploadModal');
//   const dropZone = document.getElementById('dropZone');
//   const fileInput = document.getElementById('fileInput');
//   const closeModal = document.getElementById('closeModal');
//   const getStartedButton = document.querySelector('.btn-detect-button');
//   const fileInputButton = document.querySelector('.file-input-button');
//   const analyzeButton = document.getElementById('analyzeButton');
//   const fileInfo = document.getElementById('fileInfo');
//   const successAlert = document.getElementById('successAlert');

//   let currentFile = null;

//   // Open modal when clicking "GET STARTED"
//   getStartedButton.addEventListener('click', function(e) {
//       e.preventDefault();
//       modal.style.display = 'block';
//   });

//   // Close modal when clicking the close button
//   closeModal.addEventListener('click', function() {
//       modal.style.display = 'none';
//       resetUploadState();
//   });

//   // Close modal when clicking outside
//   modal.addEventListener('click', function(e) {
//       if (e.target === modal) {
//           modal.style.display = 'none';
//           resetUploadState();
//       }
//   });

//   // Handle file selection button
//   fileInputButton.addEventListener('click', function() {
//       fileInput.click();
//   });

//   // Handle analyze button
//   analyzeButton.addEventListener('click', function() {
//       if (currentFile) {
//           // Here you can add your analysis logic
//           console.log('Analyzing file:', currentFile.name);

//           // Show success alert
//           showAlert();

//           // Close modal after short delay
//           setTimeout(() => {
//               modal.style.display = 'none';
//               resetUploadState();
//           }, 1500);
//       }
//   });

//   // Handle file input change
//   fileInput.addEventListener('change', handleFileSelect);

//   // Prevent default drag behaviors
//   ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//       dropZone.addEventListener(eventName, preventDefaults, false);
//       document.body.addEventListener(eventName, preventDefaults, false);
//   });

//   // Highlight drop zone when dragging over it
//   ['dragenter', 'dragover'].forEach(eventName => {
//       dropZone.addEventListener(eventName, highlight, false);
//   });

//   ['dragleave', 'drop'].forEach(eventName => {
//       dropZone.addEventListener(eventName, unhighlight, false);
//   });

//   // Handle dropped files
//   dropZone.addEventListener('drop', handleDrop, false);

//   function preventDefaults(e) {
//       e.preventDefault();
//       e.stopPropagation();
//   }

//   function highlight(e) {
//       dropZone.classList.add('dragover');
//   }

//   function unhighlight(e) {
//       dropZone.classList.remove('dragover');
//   }

//   function handleDrop(e) {
//       const dt = e.dataTransfer;
//       const files = dt.files;
//       handleFiles(files);
//   }

//   function handleFileSelect(e) {
//       const files = e.target.files;
//       handleFiles(files);
//   }

//   function handleFiles(files) {
//       if (files.length > 0) {
//           currentFile = files[0];

//           // Update UI to show file is selected
//           dropZone.classList.add('has-file');
//           fileInfo.textContent = `Selected: ${currentFile.name}`;
//           fileInfo.classList.add('show');
//           analyzeButton.classList.add('show');
//       }
//   }

//   function resetUploadState() {
//       currentFile = null;
//       dropZone.classList.remove('has-file');
//       fileInfo.classList.remove('show');
//       analyzeButton.classList.remove('show');
//       fileInput.value = '';
//   }

//   function showAlert() {
//       successAlert.classList.add('show');
//       setTimeout(() => {
//           successAlert.classList.remove('show');
//       }, 3000);
//   }
// });


document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('uploadModal');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const closeModal = document.getElementById('closeModal');
    const detectButton = document.getElementById('uploadfile'); // Detect button
    const fileInputButton = document.querySelector('.file-input-button');
    const analyzeButton = document.getElementById('analyzeButton');
    const fileInfo = document.getElementById('fileInfo');
    const successAlert = document.getElementById('successAlert');
    const detectText = document.querySelector('.detect-text'); // Text inside detect button

    let currentFile = null;

    detectButton.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        resetUploadState();
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            resetUploadState();
        }
    });

    fileInputButton.addEventListener('click', function () {
        fileInput.click();
    });

    analyzeButton.addEventListener('click', function () {
        if (currentFile) {
            uploadFile(currentFile);
        }
    });

    fileInput.addEventListener('change', handleFileSelect);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    dropZone.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropZone.classList.add('dragover');
    }

    function unhighlight() {
        dropZone.classList.remove('dragover');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            currentFile = files[0];
            dropZone.classList.add('has-file');
            fileInfo.textContent = `Selected: ${currentFile.name}`;
            fileInfo.classList.add('show');
            analyzeButton.classList.add('show');
        }
    }

    function resetUploadState() {
        currentFile = null;
        dropZone.classList.remove('has-file');
        fileInfo.classList.remove('show');
        analyzeButton.classList.remove('show');
        fileInput.value = '';
    }

    function showAlert() {
        successAlert.classList.add('show');
        setTimeout(() => {
            successAlert.classList.remove('show');
        }, 3000);
    }

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        detectText.textContent = 'Processing...'; // Show processing text

        const token = localStorage.getItem("token"); // Replace with your actual token

        fetch('http://localhost:3000/user/data/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                modal.style.display = 'none';
                detectText.textContent = data.result; // Replace button text with result
            })
            .catch(error => {
                console.error('Error:', error);
                detectText.textContent = 'Error!';
            });

    }
});




// // File Details Modal Functionality
// const fileDetailsModal = document.getElementById('fileDetailsModal');
// const closeFileDetailsModal = document.getElementById('closeFileDetailsModal');
// const fileCards = document.querySelectorAll('.file-card');

// // File details to display
// const fileDetails = {
//     url: "https://drive.google.com/uc?id=1udW6bX-sIAEQjXEJcFpvRN1MNAJKTCmS",
//     score: 0.5,
//     isDeepfake: false
// };

// // Close modal when clicking the close button
// closeFileDetailsModal.addEventListener('click', () => {
//     fileDetailsModal.style.display = 'none';
// });

// // Close modal when clicking outside
// fileDetailsModal.addEventListener('click', (e) => {
//     if (e.target === fileDetailsModal) {
//         fileDetailsModal.style.display = 'none';
//     }
// });

// // Add click event to all file cards
// fileCards.forEach(card => {
//     card.addEventListener('click', () => {
//         // Update modal content with file details
//         document.getElementById('fileUrl').href = fileDetails.url;
//         document.getElementById('fileUrl').textContent = fileDetails.url;
//         document.getElementById('fileScore').textContent = fileDetails.score;
//         document.getElementById('deepfakeStatus').textContent = fileDetails.isDeepfake ? 'Yes' : 'No';

//         // Show modal
//         fileDetailsModal.style.display = 'block';
//     });
// });


// [
//     {
//         "fileName": "SampleFile1.mp4",
//         "url": "https://drive.google.com/uc?id=123456",
//         "score": 0.8,
//         "isDeepfake": true
//     },
//     {
//         "fileName": "SampleFile2.mp4",
//         "url": "https://drive.google.com/uc?id=789012",
//         "score": 0.2,
//         "isDeepfake": false
//     }
// ]



document.addEventListener("DOMContentLoaded", async () => {
    const historyList = document.querySelector(".history-list");
    const fileDetailsModal = document.getElementById("fileDetailsModal");
    const closeFileDetailsModal = document.getElementById("closeFileDetailsModal");

    async function fetchHistory() {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/user/data/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseData = await response.json();
            console.log("Raw response:", responseData); // Debug log

            // Extract files array from response object
            const files = responseData.files || [];  // Ensure it's an array

            // Clear existing history
            historyList.innerHTML = "";

            // Create file cards
            files.forEach((file) => {
                const isDeepfake = file.is_deepfake === true;

                // Create card element
                const card = document.createElement("div");
                card.classList.add("file-card", isDeepfake ? "fake" : "genuine");

                card.innerHTML = `
                    <span class="status-badge">${isDeepfake ? "Fake" : "Genuine"}</span>
                    <div class="file-icon">
                        <img src="assets/File.png" alt="File Image">
                    </div>
                    <span class="file-name">${file.fileName || "Unnamed File"}</span>
                `;

                // Attach event listener properly
                card.addEventListener("click", () => {
                    document.getElementById("fileUrl").href = file.fileUrl || "#";
                    document.getElementById("fileUrl").textContent = file.fileUrl || "URL not available";
                    
                    // Multiply score by 100, round it off
                    document.getElementById("fileScore").textContent = file.score 
                        ? Math.round(file.score * 100) + "%" 
                        : "N/A";
                    
                    document.getElementById("deepfakeStatus").textContent = isDeepfake ? "Yes" : "No";
                
                    fileDetailsModal.style.display = "block";
                });
                

                // Append card to list
                historyList.appendChild(card);
            });

            if (files.length === 0) {
                historyList.innerHTML = `<p style="color: white; text-align: center;">No files found.</p>`;
            }
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    }

    // Initial fetch
    fetchHistory();

    // Modal close handlers
    closeFileDetailsModal.addEventListener("click", () => {
        fileDetailsModal.style.display = "none";
    });

    fileDetailsModal.addEventListener("click", (e) => {
        if (e.target === fileDetailsModal) {
            fileDetailsModal.style.display = "none";
        }
    });
});






// Service card flip functionality
document.querySelector('.service-card-container').addEventListener('click', function () {
    this.classList.toggle('flipped');
});

// Pay button functionality
document.querySelector('.pay-button').addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent card from flipping when clicking the button
    document.querySelector('.api-modal-overlay').style.display = 'block';
});

// Close modal functionality
document.querySelector('.close-api-modal').addEventListener('click', function () {
    document.querySelector('.api-modal-overlay').style.display = 'none';
});

// Close modal when clicking outside
document.querySelector('.api-modal-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

// Copy API key functionality
document.querySelector('.copy-button').addEventListener('click', function () {
    const apiKey = document.getElementById('apiKeyText').textContent;
    navigator.clipboard.writeText(apiKey).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
});