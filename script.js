
/* =========================================
   BRAND NEW DAY FAN HUB
   JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 1. CURRENT YEAR
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 2. MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("show");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // Close menu after selecting a link
    mainNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";

        mainNav.querySelectorAll("a").forEach(item => {
          item.classList.remove("active");
        });

        link.classList.add("active");

      });

    });

  }


  // 3. WEBSITE SEARCH
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {

    searchForm.addEventListener("submit", event => {

      event.preventDefault();

      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        alert("Please enter something to search.");
        return;
      }

      const searchableElements = document.querySelectorAll(
        ".panel, .extra-card, .quick-link, .about-section"
      );

      let firstMatch = null;

      searchableElements.forEach(element => {

        const text = element.textContent.toLowerCase();

        if (!firstMatch && text.includes(query)) {
          firstMatch = element;
        }

      });

      if (firstMatch) {

        firstMatch.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        firstMatch.style.outline = "2px solid #ff1515";

        setTimeout(() => {
          firstMatch.style.outline = "";
        }, 2500);

      } else {

        alert("No matching content found. Try another keyword.");

      }

    });

  }


  // 4. MOVIE COUNTDOWN
  // Set the confirmed official release date here
  // Format: YYYY-MM-DDTHH:MM:SS

  const releaseDate = null;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const countdownNote = document.querySelector(".countdown-note");

  function updateCountdown() {

    if (!releaseDate) {

      if (countdownNote) {
        countdownNote.textContent =
          "Official release date will be announced here.";
      }

      return;
    }

    const target = new Date(releaseDate).getTime();
    const now = Date.now();
    const difference = target - now;

    if (Number.isNaN(target)) return;

    if (difference <= 0) {

      if (countdownNote) {
        countdownNote.textContent = "The big day is here!";
      }

      if (daysElement) daysElement.textContent = "00";
      if (hoursElement) hoursElement.textContent = "00";
      if (minutesElement) minutesElement.textContent = "00";
      if (secondsElement) secondsElement.textContent = "00";

      return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    if (daysElement) daysElement.textContent = String(days).padStart(2, "0");
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, "0");
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, "0");
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, "0");

  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // 5. SEARCH KEYBOARD SUPPORT
  if (searchInput) {

    searchInput.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        searchInput.value = "";
        searchInput.blur();
      }

    });

  }


  // 6. ACTIVE NAVIGATION ON SCROLL
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );

          });

        }

      });

    }, {
      threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));

  }

});
