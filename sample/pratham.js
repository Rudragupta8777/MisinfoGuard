async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const responseDiv = document.getElementById("response");

    if (!fileInput.files.length) {
        alert("Please select a video file.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token"); // Replace with actual method to get Firebase token

    try {
        document.querySelector(".progress-container").style.display = "block";
        progressBar.value = 0;
        progressText.innerText = "Uploading...";

        const response = await axios.post("http://localhost:3000/user/data/upload", formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    let percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    progressBar.value = percent;
                    progressText.innerText = percent + "%";
                }
            }
        });

        document.querySelector(".progress-container").style.display = "none";
        
        if (response.status === 200) {
            const { fileUrl, score, is_deepfake } = response.data;
            responseDiv.innerHTML = `
                <p><strong>Upload Successful!</strong></p>
                <p><strong>File URL:</strong> <a href="${fileUrl}" target="_blank">${fileUrl}</a></p>
                <p><strong>Score:</strong> ${score}</p>
                <p><strong>Deepfake Detected:</strong> ${is_deepfake ? "Yes" : "No"}</p>
            `;
        }
    } catch (error) {
        document.querySelector(".progress-container").style.display = "none";
        responseDiv.innerHTML = `<p style="color: red;">Error: ${error.response?.data?.message || "Upload failed."}</p>`;
    }
}