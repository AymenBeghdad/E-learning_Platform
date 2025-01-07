document.addEventListener('DOMContentLoaded', function () {
  
  // Read More / Read Less functionality in the taught by section
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

  // // Toggle content visibility for additional courses
  // const seeMoreBtn = document.querySelector(".see-more-btn");
  // const hiddenCourses = document.querySelector(".hidden-courses");

  // if (seeMoreBtn && hiddenCourses) {
  //   seeMoreBtn.addEventListener("click", () => {
  //     const isHidden = hiddenCourses.style.display === "none" || hiddenCourses.style.display === "";
  //     hiddenCourses.style.display = isHidden ? "block" : "none";
  //     seeMoreBtn.textContent = isHidden ? "See Less Courses" : "See More Courses";
  //   });
  // }

  // // Scroll to courses section functionality
  // const enrollButton = document.getElementById("enroll-now-btn");
  // const courseContainer = document.querySelector(".cours");

  // if (enrollButton && courseContainer) {
  //   enrollButton.addEventListener("click", (e) => {
  //     e.preventDefault(); // Prevent default link behavior
  //     courseContainer.scrollIntoView({ behavior: "smooth" });
  //   });
  // }

  // Modal display for course enrollment
  const keyModal = document.getElementById("keyModal");
  const closeModal = document.getElementById("closeModal");
  const keyInput = document.getElementById("keyInput");
  const submitKey = document.getElementById("submitKey");
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");
  const courseName = document.getElementById("courseName");

  // Open modal when enrolling
  document.querySelectorAll(".enrollbtn").forEach((button) => {
    button.addEventListener("click", () => {
      // Set the course name dynamically
      const course = button.getAttribute("data-course-name");
      courseName.textContent = course;

      // Show the modal
      if (keyModal) keyModal.style.display = "block";

      // Reset input and messages
      keyInput.value = "";
      errorMessage.style.display = "none";
      successMessage.style.display = "none";
    });
  });

  // Close modal functionality
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      keyModal.style.display = "none";
      keyInput.value = ""; // Clear input when modal is closed
    });
  }

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === keyModal) {
      keyModal.style.display = "none";
      keyInput.value = ""; // Clear input when modal is closed
    }
  });

  // Handle key submission
  function handleKeySubmission() {
    const enteredKey = keyInput.value.trim();
    const validKey = "12345"; // Replace with your logic for key validation

    if (enteredKey === validKey) {
      successMessage.style.display = "block";
      errorMessage.style.display = "none";

      // Clear the input field and close the modal after success
      keyInput.value = "";
      setTimeout(() => {
        keyModal.style.display = "none";
      }, 1000); // Close after 1 second
    } else {
      successMessage.style.display = "none";
      errorMessage.style.display = "block";
    }
  }

  // Handle key submission with Enter key (only if keyInput exists)
  if (keyInput) {
    keyInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if any
        handleKeySubmission();
      }
    });
  }

  // Attach event to Submit button for key validation (only if submitKey exists)
  if (submitKey) {
    submitKey.addEventListener("click", handleKeySubmission);
  }

  // Function to validate key
  function validateKey() {
    const correctKey = "12345"; 
    const errorMessage = document.getElementById("errorMessage");

    if (keyInput.value === correctKey) {
      errorMessage.classList.add("hidden");
      alert("Key is correct! Redirecting...");
      // Example redirection: window.location.href = "nextPage.html";
    } else {
      errorMessage.classList.remove("hidden");
      keyInput.value = ""; // Clear input if the key is incorrect
    }
  }

});
