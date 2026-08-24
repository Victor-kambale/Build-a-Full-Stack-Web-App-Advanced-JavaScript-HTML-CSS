const toggleInput = document.querySelector(".toggle-input");
const isDark = localStorage.getItem("theme") === "dark";

// save into local
if (isDark) {
  document.body.classList.add("body");
  if (toggleInput) toggleInput.checked = true;
} else {
  document.body.classList.remove("body");
  if (toggleInput) toggleInput.checked = false;
}

toggleInput.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("body");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("body");
    localStorage.setItem("theme", "light");
  }
});

// 2. carousel

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const totalSlides = track.children.length;

  let index = 0;

  // update
  const update = () => {
    track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
  };

  // nextSlide
  const nextSlide = () => {
    index = (index + 1) % totalSlides;
    update();
  };

  // dom

  document.querySelector(".next-btn").addEventListener("click", nextSlide);
  document.querySelector(".prev-btn").addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    update();
  });

  setInterval(nextSlide, 4000);
});

// ADVANCE Search Functional
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

// optimized spined transaction

input.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();
  if (!q) return hideResults();

  // live
  const live = Array.from(
    document.querySelectorAll(
      "h1, h2, h3, h4, p, li a, .card-title, [class=*'title']"
    )
  ).map((el) => {
    const txt = el.innerHTML.trim();
    return {
      name: txt.length > 45 ? txt.slice(0, 45) + "..." : txt,
      url:
        el.getAttribute("href") && !el.getAttribute("href").startsWith("/")
          ? el.getAttribute("href")
          : "#text-match",
    };
  });


  //
});
