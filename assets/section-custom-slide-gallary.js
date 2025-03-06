class CustomSlides extends HTMLElement {
  constructor() {
    super();

    try {
      const slides = this.querySelectorAll(".slide");
      if (slides.length === 0) {
        console.error("No slides found with the class 'slide'.");
        return;
      }

      let currentIndex = 0;
      const intervalTime = 5000; // Change slide every 5 seconds

      function setInitialSlide() {
        slides.forEach((slide, index) => {
          slide.classList.remove("active");
          const progressBar = slide.querySelector(".progress-bar");
          if (progressBar) {
            progressBar.style.width = "0%"; // Reset progress bar
          }
          if (index === currentIndex) {
            slide.classList.add("active");
            if (progressBar) {
              progressBar.style.width = "100%";
            }
          }
        });
      }

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

      // Set the initial slide immediately
      setInitialSlide();

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

    } catch (error) {
      console.error("Error initializing CustomSlides:", error);
    }
  }
}

customElements.define('custom-slides', CustomSlides);