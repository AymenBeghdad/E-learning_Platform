// Array of lesson data (parts within each lesson)
const lessons = [
    { title: 'Lesson 1: Introduction', parts: ['video', 'summary', 'quiz', 'pdf'] },
    { title: 'Lesson 2: Basics', parts: ['video', 'summary', 'quiz', 'pdf'] },
];

let currentLessonIndex = 0;
let currentPart = 'video'; // Default part is video

// Function to load the selected part of the current lesson
function loadLesson(lessonIndex, part) {
    const lesson = lessons[lessonIndex];
    const videoElement = document.getElementById('lesson-video');
    const titleElement = document.getElementById('lesson-title');
    const summaryElement = document.getElementById('lesson-summary');
    const prevButton = document.getElementById('prevLessonBtn');
    const nextButton = document.getElementById('nextLessonBtn');

    // Set current lesson and part
    currentLessonIndex = lessonIndex;
    currentPart = part;

    // Update lesson title
    titleElement.innerText = lesson.title;

    // Handle content switching based on part type
    switch (part) {
        case 'video':
            videoElement.src = `lesson${lessonIndex + 1}.mp4`; // Assuming video files follow a naming convention
            videoElement.style.display = 'block'; // Show video element
            summaryElement.innerText = '';
            break;
        case 'summary':
            videoElement.style.display = 'none'; // Hide video for summary part
            summaryElement.innerText = 'This is the lesson summary.';
            break;
        case 'quiz':
            videoElement.style.display = 'none'; // Hide video for quiz part
            summaryElement.innerText = 'Complete the quiz for this lesson.';
            break;
        case 'pdf':
            videoElement.style.display = 'none'; // Hide video for PDF part
            summaryElement.innerText = 'Download the PDF for this lesson.';
            break;
    }

    // Enable or disable the previous/next buttons
    prevButton.disabled = currentLessonIndex === 0 && part === 'video';
    nextButton.disabled = currentLessonIndex === lessons.length - 1 && part === 'pdf';
}

// Toggle dropdown visibility for each lesson
function toggleDropdown(lessonIndex) {
    const dropdown = document.querySelectorAll('.dropdown-container')[lessonIndex];
    const lessonItem = document.querySelectorAll('.lesson-item')[lessonIndex];

    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        lessonItem.classList.remove('active');
    } else {
        dropdown.style.display = 'block';
        lessonItem.classList.add('active');
    }
}

// Function to go to the next part or lesson
document.getElementById('nextLessonBtn').addEventListener('click', () => {
    const lesson = lessons[currentLessonIndex];
    const partIndex = lesson.parts.indexOf(currentPart);

    // Move to the next part of the current lesson
    if (partIndex < lesson.parts.length - 1) {
        loadLesson(currentLessonIndex, lesson.parts[partIndex + 1]);
    }
    // Move to the next lesson if the current lesson is completed
    else if (currentLessonIndex < lessons.length - 1) {
        loadLesson(currentLessonIndex + 1, 'video'); // Start from the first part (video) of the next lesson
    }
});

// Function to go to the previous part or lesson
document.getElementById('prevLessonBtn').addEventListener('click', () => {
    const lesson = lessons[currentLessonIndex];
    const partIndex = lesson.parts.indexOf(currentPart);

    // Move to the previous part of the current lesson
    if (partIndex > 0) {
        loadLesson(currentLessonIndex, lesson.parts[partIndex - 1]);
    }
    // Move to the previous lesson if at the beginning of the current lesson
    else if (currentLessonIndex > 0) {
        loadLesson(currentLessonIndex - 1, 'pdf'); // Go to the last part of the previous lesson
    }
});

// Initialize the first lesson on page load
window.onload = () => loadLesson(0, 'video'); // Default to the first lesson and video

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
