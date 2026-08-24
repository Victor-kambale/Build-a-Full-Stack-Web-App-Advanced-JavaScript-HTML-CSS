// 1 toggle-checkbox
const toggleInput = document.querySelector(".toggle-input");
const isDark = localStorage.getItem("theme") === "dark";

if (isDark) {
  document.body.classList.add("body");
  if (toggleInput) toggleInput.checked = true;
} else {
  document.body.classList.remove("body");
  if (toggleInput) toggleInput.checked = false;
}

// 2. Watch for clicks using your memorized listener
toggleInput.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("body");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("body");
    localStorage.setItem("theme", "light");
  }
});

// ------Carousels----------↓
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const totalSlides = track.children.length;
  let index = 0;

  const update = () => {
    track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
  };

  const nextSlide = () => {
    index = (index + 1) % totalSlides; // Steps forward and auto-loops to 0 at the end
    update();
  };

  // 1. Manual User Triggers
  document.querySelector(".next-btn").addEventListener("click", nextSlide);
  document.querySelector(".prev-btn").addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    update();
  });

  // 2. nextSlide automatically every 3000ms (3 seconds)
  setInterval(nextSlide, 4000);
});

// end carousel

//  fro pro toggle
/*
    const toggleInput = document.querySelector(".toggle-input");
const isDark = localStorage.getItem("theme") === "dark";

// 1. Set the initial state instantly
document.body.classList.toggle("body", isDark);
if (toggleInput) toggleInput.checked = isDark;

// 2. Watch for clicks and save the choice in 3 short lines
toggleInput?.addEventListener("change", function () {
  document.body.classList.toggle("body", this.checked);
  localStorage.setItem("theme", this.checked ? "dark" : "light");
});


// ------Carousels----------↓
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const totalSlides = track.children.length;
  let index = 0;

  const update = () => {
    track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
  };

  document.querySelector(".next-btn").addEventListener("click", () => {
    index = (index + 1) % totalSlides; // Automatic infinite resetting loop
    update();
  });

  document.querySelector(".prev-btn").addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides; // Reverse infinite loop
    update();
  });
});

//

*/

// ===============ADVANCE SEARCH WORKING================= //

// ====⚡ The Elite Shorthand Engine (100% Functional) ===//
const input = document.querySelector(".js-search-circle"),
  resultsBox = document.querySelector(".js-results-box");
const database = [
  { name: "Partners List", url: "/partners" },
  { name: "Paris Office", url: "/offices/paris" },
  { name: "Partial Scholarships", url: "/scholarships" },
  { name: "Dashboard Analytics", url: "/dashboard" },
  { name: "User Profile Settings", url: "/settings" },
  { name: "System Logs", url: "/logs" },
  { name: "API Configurations", url: "/api" },
  { name: "Billing and Invoices", url: "/billing" },
  { name: "Crucible of Extreme Hardship", url: "#Hardship" },
  { name: "Reframing Obstacles into Assets", url: "#Obstacles" },
  { name: "Dawn of the Digital Paradigm", url: "#Digital" },
  { name: "Your Definitive Strategic Roadmap", url: "#Strategic Roadmap" },
  { name: "The Absolute Architecture of Tomorrow", url: "#architecture" },
];

const hideResults = () => (resultsBox.style.display = "none");

// ⚡ 1. CRAWL & RENDER (Strict layout extraction with optimized snippet truncation inline)
input.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();
  if (!q) return hideResults();

  const live = Array.from(
    document.querySelectorAll(
      "h1, h2, h3, h4, p, .card-title, li a, [class*='title']"
    )
  ).map((el) => {
    const txt = el.innerText.trim();
    return {
      name: txt.length > 45 ? txt.slice(0, 45) + "..." : txt,
      url:
        el.getAttribute("href") && !el.getAttribute("href").startsWith("/")
          ? el.getAttribute("href")
          : "#text-match",
    };
  });

  const clean = [...database, ...live].filter(
    (item, i, self) =>
      item.name.length > 2 &&
      i ===
        self.findIndex((t) => t.name.toLowerCase() === item.name.toLowerCase())
  );
  const matches = clean
    .filter((item) => item.name.toLowerCase().includes(q))
    .slice(0, 5);

  resultsBox.innerHTML =
    matches.length === 0
      ? `<div class="no-result">No results found</div>`
      : matches
          .map(
            (item) =>
              `<a href="${item.url}" class="js-search-link">${item.name}</a>`
          )
          .join("");
  resultsBox.style.display = "block";
});

// ⚡ 2. INTERCEPT, SCROLL & DYNAMIC FLASH (Safe text lookup with lookahead HTML shield)
resultsBox.addEventListener("click", (e) => {
  const link = e.target.closest(".js-search-link");
  if (!link) return e.preventDefault();

  const url = link.getAttribute("href"),
    text = link.textContent.replace("...", "").trim(),
    word = input.value.trim();

  if (url.startsWith("#")) {
    let target = null;
    if (url !== "#text-match") {
      try {
        target = document.querySelector(url);
      } catch {
        target = null;
      }
    }

    if (!target) {
      target = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, p, span, li, a, .card-title")
      ).find(
        (el) =>
          !el.closest(".search-circle") &&
          el.innerText.trim().toLowerCase().includes(text.toLowerCase())
      );
    }

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      const orig = target.innerHTML,
        regex = new RegExp(`(${word})(?![^<>]*>)`, "gi");
      target.innerHTML = orig.replace(
        regex,
        `<mark class="search-word-glow">$1</mark>`
      );
      setTimeout(() => (target.innerHTML = orig), 1800);
    }
  } else {
    window.location.href = url;
  }
  hideResults();
});

document.addEventListener(
  "click",
  (e) => e.target.closest(".search-circle") || hideResults()
);


// for MEDIA DEVICE MENU HIDDEN
  // const menuToggle = document.getElementById('menuToggle');
  // const navMenu = document.querySelector('.linklists');

  // menuToggle.addEventListener('click', () => {
  //   // Toggles the sliding menu panel
  //   navMenu.classList.toggle('menu-open');
  //   // Toggles the hamburger lines animation into an X shape
  //   menuToggle.classList.toggle('open');
  // });

  // // Instant menu collapse engine on search result click
  // document.querySelector('.js-results-box')?.addEventListener('click', () => {
  //   const menuCheck = document.getElementById('menu-check');
  //   if (menuCheck) menuCheck.checked = false;
  // });


  /* ==========================================================
   INSTANT MOBILE MENU INSTANT COLLAPSE ENGINE (FAST CLOSING)
   ========================================================== */
const menuCheck = document.getElementById('menu-check');

// 1. Instantly uncheck when a user clicks inside the search results dropdown box
document.querySelector('.js-results-box')?.addEventListener('click', () => {
  if (menuCheck) menuCheck.checked = false;
});

// 2. Instantly uncheck when a user clicks any navigation page target link text
document.querySelectorAll('.linklists ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (menuCheck) menuCheck.checked = false;
  });
});

// 
