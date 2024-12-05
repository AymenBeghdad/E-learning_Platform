const lessons = [
    { title: 'Lesson 1: Introduction', parts: ['video', 'quiz', 'pdf'] },
    { title: 'Lesson 2: Basics', parts: ['video', 'quiz', 'pdf'] },
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
    const quizSection = document.getElementById('quizSection');
    const pdfSection = document.getElementById('pdfSection');

    // Set current lesson and part
    currentLessonIndex = lessonIndex;
    currentPart = part;

    // Update lesson title
    titleElement.innerText = lesson.title;

    // Handle content switching based on part type
    switch (part) {
        case 'video':
            videoElement.style.display = 'block'; // Show video element
            quizSection.style.display = 'none'; // Hide quiz
            pdfSection.style.display = 'none'; // Hide PDF
            summaryElement.innerText = '';
            break;
        case 'quiz':
            videoElement.style.display = 'none'; // Hide video
            quizSection.style.display = 'block'; // Show quiz
            pdfSection.style.display = 'none'; // Hide PDF
            summaryElement.innerText = 'Complete the quiz for this lesson.';
            displayQuiz();  // Show quiz when quiz part is selected
            break;
        case 'pdf':
            videoElement.style.display = 'none'; // Hide video
            quizSection.style.display = 'none'; // Hide quiz
            pdfSection.style.display = 'block'; // Show PDF
            summaryElement.innerText = 'Download the PDF for this lesson.';
            break;
    }

    // Enable or disable the previous/next buttons
    prevButton.disabled = currentLessonIndex === 0 && part === 'video';
    nextButton.disabled = currentLessonIndex === lessons.length - 1 && part === 'pdf';
}

// Function to navigate to the next or previous part of the lesson
function navigateLesson(direction) {
    const currentLesson = lessons[currentLessonIndex];
    const currentPartIndex = currentLesson.parts.indexOf(currentPart);

    if (direction === 'next') {
        if (currentPartIndex < currentLesson.parts.length - 1) {
            loadLesson(currentLessonIndex, currentLesson.parts[currentPartIndex + 1]);
        } else if (currentLessonIndex < lessons.length - 1) {
            loadLesson(currentLessonIndex + 1, 'video');
        }
    } else if (direction === 'prev') {
        if (currentPartIndex > 0) {
            loadLesson(currentLessonIndex, currentLesson.parts[currentPartIndex - 1]);
        } else if (currentLessonIndex > 0) {
            loadLesson(currentLessonIndex - 1, 'pdf');
        }
    }
}

// Quiz Data (Cybersecurity-related questions)
const quizData = [
    {
        question: "What is a firewall?",
        options: ["A type of malware", "A network security system", "A hardware device", "A programming language"],
        correct: "A network security system"
    },
    {
        question: "What does VPN stand for?",
        options: ["Very Private Network", "Virtual Private Network", "Viral Protection Network", "Virtual Protection Node"],
        correct: "Virtual Private Network"
    },
    {
        question: "Which is an example of two-factor authentication?",
        options: ["Username and password", "Password and PIN", "Password and SMS code", "Username and fingerprint"],
        correct: "Password and SMS code"
    },
    {
        question: "What does phishing involve?",
        options: ["Hacking into a network", "Sending fraudulent emails", "Brute force attack", "Malicious software download"],
        correct: "Sending fraudulent emails"
    }
];

let currentQuestion = 0;
let score = 0;

// Display Quiz
function displayQuiz() {
    const quizContainer = document.getElementById("quizContainer");

    if (currentQuestion < quizData.length) {
        const quiz = quizData[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-question">${quiz.question}</div>
            <div class="quiz-options">
                ${quiz.options
                    .map(
                        (option) => `<button onclick="checkAnswer(this, '${option}')">${option}</button>`
                    )
                    .join("")}
            </div>
        `;
    } else {
        quizContainer.innerHTML = `<div class="quiz-score">You scored ${score} out of ${quizData.length}</div>`;
        setTimeout(() => {
            currentQuestion = 0;
            score = 0;
            loadLesson(currentLessonIndex + 1, 'video'); // Reset and move to next lesson
        }, 3000);
    }
}

// Check Answer
function checkAnswer(button, answer) {
    const quiz = quizData[currentQuestion];
    const buttons = document.querySelectorAll(".quiz-options button");

    // Disable all buttons after selection
    buttons.forEach((btn) => (btn.disabled = true));

    // Check if the answer is correct
    if (answer === quiz.correct) {
        score++;
        button.classList.add("correct");
        button.style.backgroundColor = "green";  // Make entire button green
    } else {
        button.classList.add("wrong");
        button.style.backgroundColor = "red";  // Make entire button red
        buttons.forEach((btn) => {
            if (btn.textContent === quiz.correct) btn.style.backgroundColor = "green";  // Highlight correct answer
        });
    }

    // Move to the next question after 2 seconds
    setTimeout(() => {
        currentQuestion++;
        displayQuiz();
    }, 2000);
}

// Reset Quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = "";
}

// Function to toggle dropdown visibility for lessons
function toggleDropdown(index) {
    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach((item, i) => {
        const dropdown = item.querySelector('.dropdown-container');
        if (i === index) {
            item.classList.toggle('active');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        } else {
            item.classList.remove('active');
            item.querySelector('.dropdown-container').style.display = 'none';
        }
    });
}

// Handle comments submission
document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const commentText = document.getElementById('comment-text').value;
    const rating = document.getElementById('rating').value;

    if (commentText && rating) {
        const commentsContainer = document.getElementById('comments-container');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `
            <p>"${commentText}"</p>
            <span class="stars">${'⭐'.repeat(rating)}</span>
        `;
        commentsContainer.appendChild(newComment);

        // Reset form
        document.getElementById('comment-form').reset();
    }
});

// Initialize the page with the first lesson and part
loadLesson(0, 'video');

// Event listeners for navigation buttons
document.getElementById('prevLessonBtn').addEventListener('click', () => navigateLesson('prev'));
document.getElementById('nextLessonBtn').addEventListener('click', () => navigateLesson('next'));
