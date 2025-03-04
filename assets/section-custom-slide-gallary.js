class CustomSlides extends HTMLElement {
  constructor() {
    super();

    try {
      const slides = document.querySelectorAll(".slide");
      if (slides.length === 0) {
        console.error("No slides found with the class 'slide'.");
        return;
      }

      let currentIndex = 0;
      const intervalTime = 5000; // Change slide every 3 seconds

      function changeSlide() {
        slides.forEach((slide) => {
          slide.classList.remove("active");
          const progressBar = slide.querySelector(".progress-bar");
          if (progressBar) {
            progressBar.style.width = "0%"; // Reset progress bar
          }
        });

        // Move to the next slide, loop back if at the end
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");

        // Restart progress bar animation
        setTimeout(() => {
          const progressBar = slides[currentIndex].querySelector(".progress-bar");
          if (progressBar) {
            progressBar.style.width = "100%";
          }
        }, 50);
      }

      // Auto-change slides at a fixed interval
      let slideInterval = setInterval(changeSlide, intervalTime);

      // Allow manual click to change slide and reset interval
      slides.forEach((slide, index) => {
        slide.addEventListener("click", () => {
          slides.forEach((s) => {
            s.classList.remove("active");
            const progressBar = s.querySelector(".progress-bar");
            if (progressBar) {
              progressBar.style.width = "0%";
            }
          });

          slide.classList.add("active");
          currentIndex = index;

          // Restart progress bar animation
          setTimeout(() => {
            const progressBar = slide.querySelector(".progress-bar");
            if (progressBar) {
              progressBar.style.width = "100%";
            }
          }, 50);

          // Restart interval to prevent immediate next slide change
          clearInterval(slideInterval);
          slideInterval = setInterval(changeSlide, intervalTime);
        });
      });

      // Start initial progress bar animation
      const initialProgressBar = slides[currentIndex].querySelector(".progress-bar");
      if (initialProgressBar) {
        initialProgressBar.style.width = "100%";
      }
    } catch (error) {
      console.error("Error initializing CustomSlides:", error);
    }
  }
}

customElements.define('custom-slides', CustomSlides);