// Video Progress Tracker
const video = document.querySelector('video');
const progressDisplay = document.createElement('p');
progressDisplay.id = 'progressDisplay';
document.querySelector('.video-section').appendChild(progressDisplay);

video.addEventListener('timeupdate', () => {
    const progress = Math.floor((video.currentTime / video.duration) * 100);
    progressDisplay.textContent = `Progress: ${progress}%`;
});

// 
// Save Checklist Progress
const checklist = document.querySelectorAll('.course-checklist input');

checklist.forEach((item, index) => {
    // Load saved state
    const saved = localStorage.getItem(`checklist-${index}`);
    if (saved) item.checked = saved === 'true';

    // Save state on change
    item.addEventListener('change', () => {
        localStorage.setItem(`checklist-${index}`, item.checked);
    });
});

// Interactive Star Rating System
const stars = document.querySelectorAll('.course-meta span');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((s, i) => {
            s.textContent = i <= index ? '⭐' : '☆';
        });
    });
});

// Course Checklist: Update styles when tasks are checked
const checklistItems = document.querySelectorAll('.course-checklist input');

checklistItems.forEach((item) => {
    item.addEventListener('change', () => {
        const label = item.nextElementSibling;
        label.style.textDecoration = item.checked ? 'line-through' : 'none';
        label.style.color = item.checked ? '#888' : '#555';
    });
});

// Comment Section: Handle comment submission
document.getElementById("comment-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input
    const commentText = document.getElementById("comment-text").value.trim();
    const ratingValue = document.getElementById("rating").value;

    // Validate input
    if (!commentText || !ratingValue) {
        alert("Please enter both a comment and a rating.");
        return;
    }

    // Create new comment element
    const newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.innerHTML = `
        <p>${commentText}</p>
        <span class="stars">${"⭐".repeat(ratingValue)}</span>
    `;

    // Add new comment to the top of the comments container
    const commentsContainer = document.getElementById("comments-container");
    commentsContainer.insertBefore(newComment, commentsContainer.firstChild);

    // Clear form inputs
    document.getElementById("comment-text").value = "";
    document.getElementById("rating").value = "";
});

// Video Controls: Toggle between background and video
document.getElementById("play-video").addEventListener("click", function () {
    const video = document.getElementById("course-video");
    const videoBg = document.getElementById("video-bg");

    // Hide background, show video, and play it
    videoBg.style.display = "none";
    video.style.display = "block";
    video.play();
});

// Automatically check tasks once a video is finished
document.querySelectorAll('.video-link').forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const videoUrl = link.href;
        const videoWindow = window.open(videoUrl, '_blank');

        // Poll to check if the video tab is closed
        const pollTimer = setInterval(() => {
            if (videoWindow.closed) {
                clearInterval(pollTimer);

                // Mark the corresponding checkbox as checked
                const checkbox = document.getElementById(`module${index + 1}`);
                checkbox.checked = true;
                const label = checkbox.nextElementSibling;
                label.style.textDecoration = 'line-through';
                label.style.color = '#888';

                // Move to the next task if available
                const nextTask = document.getElementById(`module${index + 2}`);
                if (nextTask) {
                    nextTask.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 500);
    });
});

// Fullscreen Toggle
const fullscreenButton = document.getElementById("fullscreen-button");
if (fullscreenButton) {
    fullscreenButton.addEventListener("click", toggleFullscreen);
}

function toggleFullscreen() {
    const video = document.getElementById("course-video");
    if (!document.fullscreenElement) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Keyboard Support for Fullscreen Toggle
document.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "F") {
        toggleFullscreen();
    }
});
