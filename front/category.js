document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const textContainer = this.closest('.taught-text'); // Find the closest text container
        textContainer.classList.toggle('show-more'); // Toggle the visibility of the extra content
        if (textContainer.classList.contains('show-more')) {
          this.textContent = 'Read Less'; // Change button text to 'Read Less'
        } else {
          this.textContent = 'Read More'; // Revert button text to 'Read More'
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
  