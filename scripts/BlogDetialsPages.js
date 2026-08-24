// blogs-cultures-details-pages

 blogDetails = [{}];
// const database = [
//   { name: "Partners List", url: "/partners" },
//   { name: "Paris Office", url: "/offices/paris" },
//   { name: "Partial Scholarships", url: "/scholarships" },
//   { name: "Dashboard Analytics", url: "/dashboard" },
//   { name: "User Profile Settings", url: "/settings" },
//   { name: "System Logs", url: "/logs" },
//   { name: "API Configurations", url: "/api" },
//   { name: "Billing and Invoices", url: "/billing" },
//   {name: "The Absolute Architecture of Tomorrow"}
// ];

// const input = document.querySelector(".js-search-circle");
// const resultsBox = document.querySelector(".js-results-box");

// input.addEventListener("input", (e) => {
//   const query = e.target.value.toLowerCase().trim();
//   if (!query) return hideResults();

//   const matches = database
//     .filter((item) => item.name.toLowerCase().includes(query))
//     .slice(0, 5);

//   if (matches.length === 0) {
//     resultsBox.innerHTML = `<div class="no-result">No results found for "${e.target.value}"</div>`;
//   } else {
//     resultsBox.innerHTML = matches
//       .map(
//         (item) => `
//       <a href="${item.url}" class="js-search-link">${item.name}</a>
//     `
//       )
//       .join("");
//   }
//   resultsBox.style.display = "block";
// });

// // ⚡ ADVANCED ROUTING INTERCEPTOR (EVENT DELEGATION)
// resultsBox.addEventListener("click", (e) => {
//   const link = e.target.closest(".js-search-link");
//   if (!link) return;

//   e.preventDefault(); // Prevents browser from forcing a hard page reload reload
//   const targetUrl = link.getAttribute("href");

//   // Elite Choice: Swap your internal routing mechanics below
//   console.log(`Routing internally to: ${targetUrl}`);

//   // Choice A: For native browser routing without opening tab/external window
//   window.location.href = targetUrl;

//   // Choice B: If you use a framework router (e.g., React/Vue/Vanilla Router)
//   // router.navigate(targetUrl);

//   hideResults();
// });

// const hideResults = () => {
//   resultsBox.style.display = "none";
// };
// document.addEventListener("click", (e) => {
//   if (!e.target.closest(".search-circle")) hideResults();
// });



// =========================


// for good

const OPEN_IN_NEW_TAB = false;

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
  { name: "The Absolute Architecture of Tomorrow", url: "#architecture" }, // Fixed: This will now match fuzzy text seamlessly!
];

const input = document.querySelector(".js-search-circle");
const resultsBox = document.querySelector(".js-results-box");

// ⚡ ADVANCED DYNAMIC PAGE CRAWLER (Indexes live text, headings, or titles on your webpage)
const getLivePageElements = () => {
  const elements = document.querySelectorAll(
    "h1, h2, h3, .card-title, p, a, span, li"
  );
  return Array.from(elements)
    .map((el, index) => {
      const text = el.textContent.trim();
      // Ensure unique element ID exists so we can snap-scroll to it later
      if (!el.id) el.id = `scroll-target-${index}`;
      return { name: text, url: `#${el.id}`, isDOMElement: true };
    })
    .filter((item) => item.name.length > 2 && item.name.length < 120); // Expanded to capture longer descriptive titles
};

input.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!query) return hideResults();

  // Combine hardcoded database array with freshly crawled live web page text elements
  const combinedData = [...database, ...getLivePageElements()];

  // Elite Fix: Deduplicate values completely so that matching items only display once
  const uniqueData = combinedData.filter(
    (item, index, self) =>
      index ===
      self.findIndex((t) => t.name.toLowerCase() === item.name.toLowerCase())
  );

  const matches = uniqueData
    .filter((item) => item.name.toLowerCase().includes(query))
    .slice(0, 5);

  if (matches.length === 0) {
    resultsBox.innerHTML = `<div class="no-result">No results found for "${e.target.value}"</div>`;
  } else {
    resultsBox.innerHTML = matches
      .map(
        (item) => `
      <a href="${item.url}" class="js-search-link">${item.name}</a>
    `
      )
      .join("");
  }
  resultsBox.style.display = "block";
});

// ⚡ MODULE: ADVANCED TEXT HIGHLIGHTER ENGINE (Easy to remove or adjust anytime)
const highlightMatchedWordOnPage = (targetElement, searchWord) => {
  if (!targetElement || !searchWord) return;

  // Store original raw layout string text HTML cleanly
  const originalHTML = targetElement.innerHTML;

  // JavaScript Regex pattern mechanics to find the keyword case-insensitively
  const regex = new RegExp(`(${searchWord})`, "gi");

  // Replaces the raw characters directly with custom styled layout wrapper markup nodes
  targetElement.innerHTML = originalHTML.replace(
    regex,
    `<mark class="search-word-glow">$1</mark>`
  );

  // Clear timeout callback pattern execution to restore text when flashing ends
  setTimeout(() => {
    targetElement.innerHTML = originalHTML;
  }, 2000);
};

// ⚡ ADVANCED ROUTING INTERCEPTOR (EVENT DELEGATION)
resultsBox.addEventListener("click", (e) => {
  const link = e.target.closest(".js-search-link");
  if (!link) return;

  e.preventDefault(); // Prevents browser from forcing a hard page reload reload
  const targetUrl = link.getAttribute("href");
  const clickedText = link.textContent.trim();

  // Elite Choice: Swap your internal routing mechanics below
  console.log(`Routing internally to: ${targetUrl}`);

  // Handle local page jumps (smooth scroll to elements found by our page crawler)
  if (targetUrl.startsWith("#")) {
    let targetEl = document.querySelector(targetUrl);

    // 🔥 FUZZY BACKUP FALLBACK: If direct ID selector fails, search the screen elements directly for the phrase!
    if (!targetEl) {
      const allTextNodes = document.querySelectorAll(
        "h1, h2, h3, p, span, li, a"
      );
      targetEl = Array.from(allTextNodes).find((el) =>
        el.textContent.toLowerCase().includes(clickedText.toLowerCase())
      );
    }

    if (targetEl) {
      // 🔥 ELITE BOX INTERCEPTOR: Checks if the targeted word lives inside an inner scroll box container
      const scrollableParent = targetEl.closest("div, section, article");

      if (
        scrollableParent &&
        scrollableParent.scrollHeight > scrollableParent.clientHeight
      ) {
        // Force the layout container box itself to execute the scrolling calculations internally instead of the main viewport window
        scrollableParent.scrollTo({
          top: targetEl.offsetTop - scrollableParent.clientHeight / 2,
          behavior: "smooth",
        });
      } else {
        // Standard viewport window action backup line fallback
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Execute the word flash highlighter engine seamlessly
      highlightMatchedWordOnPage(targetEl, input.value.trim());
    }
  } else {
    // Toggles natively between opening inside the website or opening outside based on your config flag
    if (OPEN_IN_NEW_TAB) {
      window.open(targetUrl, "_blank"); // Opens outside (new tab)
    } else {
      window.location.href = targetUrl; // Choice A: For native browser routing without opening tab/external window
    }
  }

  hideResults();
});

const hideResults = () => {
  resultsBox.style.display = "none";
};
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-circle")) hideResults();
});




// ================
//

// -------------------//


// AMAZING WORKING
// const input = document.querySelector(".js-search-circle"), resultsBox = document.querySelector(".js-results-box");
// const database = [
//   { name: "Partners List", url: "/partners" }, { name: "Paris Office", url: "/offices/paris" },
//   { name: "Partial Scholarships", url: "/scholarships" }, { name: "Dashboard Analytics", url: "/dashboard" },
//   { name: "User Profile Settings", url: "/settings" }, { name: "System Logs", url: "/logs" },
//   { name: "API Configurations", url: "/api" }, { name: "Billing and Invoices", url: "/billing" },
//   { name: "Crucible of Extreme Hardship", url: "#Hardship" }, { name: "Reframing Obstacles into Assets", url: "#Obstacles" },
//   { name: "Dawn of the Digital Paradigm", url: "#Digital" }, { name: "Your Definitive Strategic Roadmap", url: "#Strategic Roadmap" },
//   { name: "The Absolute Architecture of Tomorrow", url: "#architecture" }
// ];

// // ⚡ 1. CRAWL & RENDER (Strict layout extraction without modifying live DOM elements with random IDs)
// input.addEventListener("input", (e) => {
//   const query = e.target.value.toLowerCase().trim();
//   if (!query) return hideResults();

//   // FIXED: Removed ID injection code entirely from the .map function loop to protect navbar HTML
//   const live = Array.from(document.querySelectorAll("h1, h2, h3, h4, .card-title, li a, [class*='title']"))
//     .map(el => ({ name: el.innerText.trim(), url: el.getAttribute("href") && !el.getAttribute("href").startsWith("/") ? el.getAttribute("href") : `#text-match` }));
    
//   const clean = [...database, ...live].filter((item, i, self) => item.name.length > 2 && i === self.findIndex(t => t.name.toLowerCase() === item.name.toLowerCase()));
//   const matches = clean.filter(item => item.name.toLowerCase().includes(query)).slice(0, 5);

//   resultsBox.innerHTML = matches.length === 0 ? `<div class="no-result">No results found</div>` : matches.map(item => `<a href="${item.url}" class="js-search-link">${item.name}</a>`).join("");
//   resultsBox.style.display = "block";
// });

// // ⚡ 2. INTERCEPT, SCROLL & DYNAMIC FLASH (Safe text lookup)
// resultsBox.addEventListener("click", (e) => {
//   const link = e.target.closest(".js-search-link");
//   if (!link) return e.preventDefault();

//   const url = link.getAttribute("href"), text = link.textContent.trim();
//   const searchWord = input.value.trim(); // Grab the exact word user typed in the search bar
  
//   if (url.startsWith("#")) {
//     let target = null;
    
//     // Attempt absolute hash lookup if a real target ID is explicitly hardcoded in your database array
//     if (url !== "#text-match") {
//       try { target = document.querySelector(url); } catch(err) { target = null; }
//     }

//     // Dynamic Text Target Lookup: FIXED by removing 'div' entirely so it never targets background wrappers
//     if (!target) {
//       target = Array.from(document.querySelectorAll("h1, h2, h3, h4, p, span, li, a, .card-title")).find(el => 
//         !el.closest(".search-circle") && el.innerText.trim().toLowerCase().includes(text.toLowerCase())
//       );
//     }

//     if (target) {
//       // FIXED: Native scrollIntoView cleanly snaps the page and inner layout containers straight to center view
//       target.scrollIntoView({ behavior: "smooth", block: "center" });
      
//       // FIXED: Flashes the specific typed characters directly inside both the target text AND its surrounding block layout matching zones
//       const regex = new RegExp(`(${searchWord})`, "gi");
//       const origTargetHTML = target.innerHTML;
      
//       // Inject flash highlight mark wrap node to the scrolled-to target element
//       target.innerHTML = origTargetHTML.replace(regex, `<mark class="search-word-glow">$1</mark>`);
      
//       // Remove text highlights from page elements clean after exactly 1.8 seconds execution duration time
//       setTimeout(() => {
//         target.innerHTML = origTargetHTML;
//       }, 1800);
//     }
//   } else { 
//     window.location.href = url; // Standard internal page redirection transition
//   } 
//   hideResults();
// });

// const hideResults = () => resultsBox.style.display = "none";
// document.addEventListener("click", (e) => e.target.closest(".search-circle") || hideResults());


// ===============AMAZING WORK====================//


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

// ⚡ 1. CRAWL & RENDER (Strict layout extraction with automatic snippet truncation)
input.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!query) return hideResults();

  const live = Array.from(
    document.querySelectorAll(
      "h1, h2, h3, h4, p, .card-title, li a, [class*='title']"
    )
  ).map((el) => {
    const rawText = el.innerText.trim();
    // FIXED: Limits dropdown layout text size to 45 chars so long description body text stays small and compact
    const displayName =
      rawText.length > 45 ? rawText.slice(0, 45) + "..." : rawText;
    return {
      name: displayName,
      url:
        el.getAttribute("href") && !el.getAttribute("href").startsWith("/")
          ? el.getAttribute("href")
          : `#text-match`,
    };
  });

  const clean = [...database, ...live].filter(
    (item, i, self) =>
      item.name.length > 2 &&
      i ===
        self.findIndex((t) => t.name.toLowerCase() === item.name.toLowerCase())
  );
  const matches = clean
    .filter((item) => item.name.toLowerCase().includes(query))
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

// ⚡ 2. INTERCEPT, SCROLL & DYNAMIC FLASH (Safe text lookup)
resultsBox.addEventListener("click", (e) => {
  const link = e.target.closest(".js-search-link");
  if (!link) return e.preventDefault();

  const url = link.getAttribute("href"),
    text = link.textContent.replace("...", "").trim();
  const searchWord = input.value.trim();

  if (url.startsWith("#")) {
    let target = null;

    if (url !== "#text-match") {
      try {
        target = document.querySelector(url);
      } catch (err) {
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

      // FIXED: Advanced Regex ensures letters inside HTML IDs, links, or classes are never modified or corrupted
      const regex = new RegExp(`(${searchWord})(?![^<>]*>)`, "gi");
      const origTargetHTML = target.innerHTML;

      target.innerHTML = origTargetHTML.replace(
        regex,
        `<mark class="search-word-glow">$1</mark>`
      );
      setTimeout(() => {
        target.innerHTML = origTargetHTML;
      }, 1800);
    }
  } else {
    window.location.href = url;
  }
  hideResults();
});

const hideResults = () => (resultsBox.style.display = "none");
document.addEventListener(
  "click",
  (e) => e.target.closest(".search-circle") || hideResults()
);
