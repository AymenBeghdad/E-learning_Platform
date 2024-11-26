document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const textContainer = this.closest('.taught-text'); // Find the closest text container
        textContainer.classList.toggle('show-more'); // Toggle the visibility of the extra content
        if (textContainer.classList.contains('show-more')) {
          this.textContent = 'Read Less'; 
        } else {
          this.textContent = 'Read More'; 
        }
      });
    });
  });
  
   function toggleReadMore(button) {
    const moreContent = button.previousElementSibling;
    const isVisible = moreContent.style.display === "block";
    
    // Toggle between showing and hiding the extra content
    moreContent.style.display = isVisible ? "none" : "block";
    
    // Update button text
    button.textContent = isVisible ? "Read More" : "Read Less";
  }

  function toggleCourses() {
    const course3 = document.getElementById("course3");
    const seeMoreButton = document.querySelector(".see-more-btn");
  
    // Show the course3 container and hide the button
    course3.style.display = "block";
    seeMoreButton.style.display = "none";
  }
  
  //scrool btn
  document.addEventListener("DOMContentLoaded", () => {
    const enrollButton = document.getElementById("enroll-now-btn");
    const courseContainer = document.querySelector(".cours");
  
    enrollButton.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      courseContainer.scrollIntoView({ behavior: "smooth" });
    });
  });
  
  // Function to handle the modal display
const keyModal = document.getElementById("keyModal");
const closeModal = document.getElementById("closeModal");
const keyInput = document.getElementById("keyInput");
const submitKey = document.getElementById("submitKey");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const courseName = document.getElementById("courseName");

document.querySelectorAll(".enrollbtn").forEach((button) => {
button.addEventListener("click", () => {
  // Set the course name dynamically
  const course = button.getAttribute("data-course-name");
  courseName.textContent = course;

  // Show the modal
  keyModal.style.display = "block";

  // Reset input and messages
  keyInput.value = "";
  errorMessage.style.display = "none";
  successMessage.style.display = "none";
});
});

// Close modal functionality
closeModal.addEventListener("click", () => {
keyModal.style.display = "none";
});

window.addEventListener("click", (event) => {
if (event.target === keyModal) {
  keyModal.style.display = "none";
}
});

// Handle key submission
submitKey.addEventListener("click", () => {
const enteredKey = keyInput.value.trim();
const validKey = "12345"; // Replace with your logic for key validation

if (enteredKey === validKey) {
  successMessage.style.display = "block";
  errorMessage.style.display = "none";
} else {
  successMessage.style.display = "none";
  errorMessage.style.display = "block";
}
});

// Function to toggle additional courses
const seeMoreBtn = document.querySelector(".see-more-btn");
const hiddenCourses = document.querySelector(".hidden-courses");

seeMoreBtn.addEventListener("click", () => {
if (hiddenCourses.style.display === "none" || hiddenCourses.style.display === "") {
  hiddenCourses.style.display = "block";
  seeMoreBtn.textContent = "See Less Courses";
} else {
  hiddenCourses.style.display = "none";
  seeMoreBtn.textContent = "See More Courses";
}
});

// Handle key submission with Enter key
keyInput.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
  event.preventDefault(); // Prevent form submission if any
  handleKeySubmission();
}
});

// Handle key submission logic
function handleKeySubmission() {
const enteredKey = keyInput.value.trim();
const validKey = "12345"; // Replace with your key validation logic

if (enteredKey === validKey) {
  successMessage.style.display = "block";
  errorMessage.style.display = "none";

  // Clear the input field and close the modal after success
  keyInput.value = "";
  setTimeout(() => {
    keyModal.style.display = "none";
  }, 1000); // Close after 1 seconds
} else {
  successMessage.style.display = "none";
  errorMessage.style.display = "block";
}
}

// Handle modal close
closeModal.addEventListener("click", () => {
keyModal.style.display = "none";
keyInput.value = ""; // Clear input when modal is closed
});

// Close modal when clicking outside it
window.addEventListener("click", (event) => {
if (event.target === keyModal) {
  keyModal.style.display = "none";
  keyInput.value = ""; // Clear input when modal is closed
}
});

// Attach event to Submit button
submitKey.addEventListener("click", () => {
handleKeySubmission();
});

function validateKey() {
const correctKey = "12345"; 
const keyInput = document.getElementById("keyInput");
const errorMessage = document.getElementById("errorMessage");

if (keyInput.value === correctKey) {
    errorMessage.classList.add("hidden");
    // TODO: Rediriger vers une autre page ou effectuer une autre action
    alert("Key is correct! Redirecting...");
    // Exemple de redirection : window.location.href = "nextPage.html";
} else {
    errorMessage.classList.remove("hidden");
    keyInput.value = ""; // Efface la saisie
}
}

