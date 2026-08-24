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

/* ==========================================================================
   [SECTION 3 - VIDEO SECTION] - TYPOGRAPHY INTEGRATED CASCADE
   ========================================================================== */

@media (width < 576px) {
  /* Mobile Default Layout Rules */
  .section-3 h1 { 
    font-size: clamp(1.4rem, 6vw, 1.8rem); /* Dynamically shrinks long titles to fit tiny widths */
    line-height: 1.3; 
    padding: 0 10px; 
  }
  .title-hidden { 
    font-size: 1.1rem !important; /* Prevents sticky subtitle from clipping column frame */
  }
  
  .containers-grid { grid-template-columns: 1fr; height: auto; margin-top: 30px; }
  .left-side { margin: 0 10px 20px 10px; height: auto; max-height: 350px; }
  .left-desc { height: auto; max-height: 280px; margin: 10px 15px; }
  .left-desc p { font-size: 14px; line-height: 22px; padding-right: 5px; }
  .right-side { margin: 0 10px; height: auto; }
  .video-title h2 { font-size: 16px; line-height: 1.3; }
  .presentation-video, .presentation-video video { height: auto; margin-top: 0; padding: 5px; border-radius: 1em; }
}

@media (width > 576px) {
  /* Wide Desktop Constraints */
  .section-3 h1 { font-size: 2.2rem; line-height: 1.4; margin-bottom: 20px; }
  .title-hidden { font-size: 1.5rem; }
  .containers-grid { grid-template-columns: 1fr minmax(380px, 500px); }
  .right-side { margin-right: 20px; }
}

@media (max-width: 1100px) {
  /* Laptop Resolution Adjustments */
  .section-3 h1 { font-size: 1.8rem; }
  .title-hidden { font-size: 1.2rem; }
  .containers-grid { grid-template-columns: 1fr 400px; height: auto; }
  .left-side, .right-side { height: 400px; }
  .left-desc { height: calc(400px - 65px); }
  .left-desc p { font-size: 15px; line-height: 24px; }
  .video-title h2 { font-size: 18px; }
  .presentation-video, .presentation-video video { height: 350px; }
}

@media (max-width: 675px) {
  /* Layout Breakpoint Collapse to Vertical Block Flow */
  .section-3 h1 { font-size: 1.5rem; text-align: center; }
  .containers-grid { grid-template-columns: 1fr; height: auto; }
  .left-side, .right-side { margin: 0 15px 20px 15px; height: auto; }
  .left-desc { height: auto; max-height: 300px; }
  .presentation-video, .presentation-video video { height: auto; margin-top: 0; }
}

@media (576px < width < 992px) {
  /* Mid-Range Tablet Boundary Spacing overrides */
  .section-3 h1 { font-size: 1.6rem; }
  .title-hidden { font-size: 1.1rem; }
  .containers-grid { grid-template-columns: 1fr 350px; gap: 15px; }
  .left-side { margin-right: 0; }
  .right-side { margin-right: 15px; }
  .video-title h2 { font-size: 16px; }
}

/* ==========================================================================
   CRITICAL MOBILE STEP-DOWNS (Fast Overwrites for Micro-Viewports)
   ========================================================================== */
@media (max-width: 576px) {
  .section-3 h1 { font-size: 1.3rem; text-align: center; }
  .video-title h2 { font-size: 15px; padding: 8px; }
}

@media (max-width: 376px) {
  .section-3 h1 { font-size: 1.15rem; word-break: break-word; } /* Safely splits text on ultra narrow viewports */
  .title-hidden { font-size: 0.95rem !important; }
  .left-desc p { font-size: 13px; line-height: 20px; }
  .video-title h2 { font-size: 13px; }
}

@media (max-width: 276px) {
  .section-3 h1 { font-size: 1rem; }
  .title-hidden { font-size: 0.85rem !important; }
  .left-side, .right-side { margin: 0 5px 15px 5px; }
  .left-desc { margin: 5px 10px; }
  .left-desc p { font-size: 12px; line-height: 18px; text-align: left; }
}




/* ===========MEDIA SECTION 2============= */
/* ==========================================================================
   [SECTION 2 - UNIVERSITY CARDS] - ADVANCED MEDIA QUERY CASCADE
   ========================================================================== */

@media (width < 576px) {
  /* Mobile Default Setup: Stack cards vertically into a single column */
  #h1-media { font-size: clamp(1.4rem, 6vw, 1.8rem); line-height: 1.3; text-align: center; }
  .cardslists.grid { grid-template-columns: 1fr !important; gap: 30px; justify-items: center; }
  .card-image { width: 100%; max-width: 320px; margin: 0 auto; }
  .card-image img { width: calc(100% - 40px); height: auto; aspect-ratio: 6/5; }
  .title-detail { font-size: 20px; text-align: center; margin-right: 25px; }
  .card-desc p { font-size: 14px; text-align: justify; padding-right: 20px; }
  .learn-btn { width: 95%; justify-content: center; margin-right: 15px; }
}

@media (width > 576px) {
  /* Desktop Wide Default Setup: Fit all 3 cards side-by-side cleanly */
  #h1-media { font-size: 35px; margin-bottom: 20px; }
  .cardslists.grid { grid-template-columns: repeat(3, 1fr) !important; gap: 20px; }
  .card-image { width: 100%; max-width: 360px; margin: 0; }
  .card-image img { width: calc(100% - 40px); height: 210px; }
}

@media (max-width: 1100px) {
  /* Laptop Resolution: Shrink card image height and text sizes to prevent grid bursting */
  #h1-media { font-size: 28px; }
  .cardslists.grid { gap: 15px; }
  .title-detail { font-size: 20px; }
  .card-desc p { font-size: 13px; }
  .card-image img { height: 180px; }
}

@media (max-width: 675px) {
  /* Small Tablets: Drop down from a compressed 3-column row into an explicit 1-column stack */
  #h1-media { font-size: 22px; text-align: center; }
  .cardslists.grid { grid-template-columns: 1fr !important; gap: 25px; justify-items: center; }
  .card-image { width: 85%; max-width: 350px; }
  .card-image img { height: 220px; width: calc(100% - 40px); }
}

@media (576px < width < 992px) {
  /* Medium Tablet Boundary: Keep cards in a row but optimize internal spacings */
  #h1-media { font-size: 24px; }
  .cardslists.grid { gap: 10px; }
  .title-detail { font-size: 18px; }
  .card-desc p { font-size: 12px; line-height: 18px; }
  .card-image img { height: 150px; }
}

/* ==========================================================================
   CRITICAL MOBILE STEP-DOWNS (Overwriting Cards Architecture for Micro-Devices)
   ========================================================================== */
@media (max-width: 576px) {
  #h1-media { font-size: 1.4rem; padding: 0 10px; }
  .card-image { max-width: 290px; }
}

@media (max-width: 376px) {
  #h1-media { font-size: 1.2rem; }
  .card-image { max-width: 260px; }
  .title-detail { font-size: 18px; }
  .card-desc p { font-size: 12px; }
  .learn-btn a { padding: 6px 12px; font-size: 13px; }
}

@media (max-width: 276px) {
  #h1-media { font-size: 1.05rem; }
  .card-image { max-width: 210px; border-width: 1px; }
  .card-image img { margin: 10px 10px 0 10px; width: calc(100% - 20px); }
  .card-details { margin-left: 10px; }
  .title-detail { font-size: 16px; text-align: left; }
  .card-desc p { font-size: 11px; padding: 0 5px; }
  .learn-btn { justify-content: flex-start; margin-left: 5px; }
}










/* ==============HEADER NAV MAIN========================= */
