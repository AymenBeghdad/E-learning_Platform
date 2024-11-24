document.addEventListener('DOMContentLoaded', () => {
    // Dropdown Hover
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdown && dropdownContent) {
        // Show dropdown on hover (mouseenter)
        dropdown.addEventListener('mouseenter', () => {
            dropdownContent.classList.add('show');
        });

        // Hide dropdown when mouse leaves (mouseleave)
        dropdown.addEventListener('mouseleave', () => {
            dropdownContent.classList.remove('show');
        });
    }

    // Search form handling
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchForm.querySelector('input[name="search-box"]').value;
            if (query) {
                // Redirect to the search results page with the query
                window.location.href = `/search?q=${query}`;
            }
        });
    }

    const descriptions = document.querySelectorAll('.hero-description');
    const images = document.querySelectorAll('.hero-image');
    const getStartedBtn = document.querySelector('.get-started');
    if (descriptions.length > 0 && images.length > 0 && getStartedBtn) {
        let currentIndex = 0;
        const totalItems = descriptions.length;
        let cycleCount = 0;

        function updateHeroContent() {
            // Reset active states for all descriptions and images
            descriptions.forEach((desc, index) => {
                desc.classList.remove('active');
                images[index].classList.remove('active');
            });

            // Activate the current description and image
            descriptions[currentIndex].classList.add('active');
            images[currentIndex].classList.add('active');

            // Move to the next index
            currentIndex = (currentIndex + 1) % totalItems;
            cycleCount++;

            // Show "Get Started" button after 3 full cycles (or any specified number)
            if (cycleCount === totalItems * 3) {
                clearInterval(slideshowInterval);
                getStartedBtn.style.display = 'inline-block';
            }
        }

        // Start the slideshow and change every 5 seconds
        const slideshowInterval = setInterval(updateHeroContent, 5000);

        // Show the first set of content immediately
        updateHeroContent();
    }
});

// Get the link and the target section
const scrollToAboutBtn = document.querySelector('.scroll-to-about');
const aboutSection = document.querySelector('#about-section');
if (scrollToAboutBtn && aboutSection) {
    // Add a click event listener to the "About" link
    scrollToAboutBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor link behavior
        aboutSection.scrollIntoView({
            behavior: 'smooth', // Smooth scroll
            block: 'start', // Align at the top of the section
        });
    });
}

window.onload = function () {
    const learnMoreBtn = document.querySelector('.secondary-button');
    const aboutSection = document.querySelector('#about-section');

    if (learnMoreBtn && aboutSection) {
        learnMoreBtn.addEventListener('click', function (event) {
            event.preventDefault();
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    }
};

// Back to Top Button Logic
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    // Show the button when scrolling down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Smooth scrolling to the top
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}
const num = localStorage.getItem('num');

document.getElementById("signOUT").addEventListener('click', function() {
    localStorage.clear();
});