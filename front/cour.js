// Example lessons with video URLs and descriptions
const lessons = [
    { title: "Lesson 1: Introduction to Cybersecurity", videoSrc: "video1.mp4", description: "This lesson covers the basics of cybersecurity." },
    { title: "Lesson 2: Cryptography Basics", videoSrc: "video2.mp4", description: "This lesson introduces you to cryptography and its importance in cybersecurity." },
    { title: "Lesson 3: Network Security", videoSrc: "video3.mp4", description: "Learn about network vulnerabilities and how to defend against them." },
    // Add more lessons as necessary
];

let currentLessonIndex = 0;

function loadLesson(lessonIndex) {
    const lesson = lessons[lessonIndex];
    document.getElementById("courseTitle").innerText = lesson.title;
    document.getElementById("courseDescription").innerText = lesson.description;
    const video = document.getElementById("lessonVideo");
    video.src = lesson.videoSrc;

    // Hide Next button if it's the last lesson
    document.getElementById("nextLessonBtn").style.display = (lessonIndex === lessons.length - 1) ? "none" : "block";
    
    // Show quiz if all lessons are completed
    if (lessonIndex === lessons.length - 1) {
        // Hide the course details and show the quiz section
        document.getElementById("course-details").style.display = "none"; // Hide course details
        document.getElementById("quizSection").style.display = "block"; // Show quiz section
    }
}

// Function to go to the next lesson
function loadNextLesson() {
    currentLessonIndex++;
    if (currentLessonIndex < lessons.length) {
        loadLesson(currentLessonIndex);
    }
}

// Function to start the quiz
function startQuiz() {
    document.getElementById("quizContent").style.display = "block"; // Show quiz content
    document.querySelector("button[onclick='startQuiz()']").style.display = "none"; // Hide Start Quiz button
}

// Function to submit the quiz
function submitQuiz() {
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const q2Answer = document.querySelector('input[name="q2"]:checked');

    if (q1Answer && q2Answer) {
        alert("Quiz Submitted! Your answers have been recorded.");
        // Optionally, process answers here to grade the quiz
    } else {
        alert("Please answer all questions before submitting.");
    }
}

// Initially load the first lesson
loadLesson(currentLessonIndex);
