/* ==========================================================================
   VIRAT KOHLI PORTFOLIO INTERACTIVITY - REDESIGN ALIGNMENT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Stats Data Store
  const statsData = {
    test: {
      title: "TEST CRICKET STATS",
      subtitle: "Red Ball Domination",
      matches: 123,
      runs: 9230,
      avg: 46.85,
      hs: 254,
      hsSuffix: "*",
      hsLabel: "Highest Score",
      hundreds: 30,
      fifties: 31,
      impact: "85%",
      highlight: "Kohli has scored 7 double hundreds in Test cricket, the most by an Indian.",
      isHsDecimal: false
    },
    odi: {
      title: "ODI CRICKET STATS",
      subtitle: "King of Chases",
      matches: 311,
      runs: 14797,
      avg: 58.72,
      hs: 183,
      hsSuffix: "",
      hsLabel: "Highest Score",
      hundreds: 54,
      fifties: 77,
      impact: "98%",
      highlight: "Kohli broke Sachin Tendulkar's record, scoring the most centuries in ODI history (54).",
      isHsDecimal: false
    },
    t20: {
      title: "T20 INTERNATIONAL STATS",
      subtitle: "International Masterclass",
      matches: 125,
      runs: 4188,
      avg: 48.69,
      hs: 137.04,
      hsSuffix: "",
      hsLabel: "Strike Rate",
      hundreds: 1,
      fifties: 38,
      impact: "91%",
      highlight: "Kohli retired from T20Is as the highest run scorer in T20I World Cup history.",
      isHsDecimal: true
    },
    ipl: {
      title: "IPL CAREER STATS",
      subtitle: "RCB Loyal Vanguard",
      matches: 283,
      runs: 9336,
      avg: 40.42,
      hs: 130.40,
      hsSuffix: "",
      hsLabel: "Strike Rate",
      hundreds: 9,
      fifties: 68,
      impact: "88%",
      highlight: "Kohli is the all-time leading run-scorer in IPL history with over 9,300 runs.",
      isHsDecimal: true
    }
  };

  // DOM Elements Selection
  const formatButtons = document.querySelectorAll(".format-item");
  const activeTitle = document.getElementById("active-format-title");
  const activeSubtitle = document.getElementById("active-format-subtitle");
  
  const valMatches = document.getElementById("stat-matches");
  const valRuns = document.getElementById("stat-runs");
  const valAvg = document.getElementById("stat-avg");
  const valHs = document.getElementById("stat-hs");
  const labelHs = document.getElementById("label-hs");
  
  const valHundreds = document.getElementById("stat-100s");
  const valFifties = document.getElementById("stat-50s");
  
  const impactProgressFill = document.getElementById("impact-progress");
  const highlightText = document.getElementById("highlight-text");
  const backgroundJerseys = document.querySelectorAll(".background-jersey");

  // Keep track of active animation frame IDs to cancel running animations if format changes rapidly
  let activeAnimations = [];

  // Count up value animation helper
  function animateValue(element, start, end, duration, isDecimal = false, suffix = "") {
    let startTimestamp = null;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);
      const currentValue = easeProgress * (end - start) + start;
      
      if (isDecimal) {
        element.textContent = currentValue.toFixed(2) + suffix;
      } else {
        element.textContent = Math.floor(currentValue).toLocaleString() + suffix;
      }
      
      if (progress < 1) {
        const frameId = window.requestAnimationFrame(step);
        activeAnimations.push(frameId);
      } else {
        if (isDecimal) {
          element.textContent = end.toFixed(2) + suffix;
        } else {
          element.textContent = Math.floor(end).toLocaleString() + suffix;
        }
      }
    };
    
    const initialFrameId = window.requestAnimationFrame(step);
    activeAnimations.push(initialFrameId);
  }

  // Clear all pending animation frames
  function clearRunningAnimations() {
    activeAnimations.forEach(id => window.cancelAnimationFrame(id));
    activeAnimations = [];
  }

  // Update Stats and trigger animations
  function updateStats(formatKey) {
    const data = statsData[formatKey];
    if (!data) return;

    // Reset animations
    clearRunningAnimations();

    // 1. Update Title and Highlights
    activeTitle.textContent = data.title;
    activeSubtitle.textContent = data.subtitle;
    highlightText.textContent = data.highlight;

    // 2. Animate progress bar
    impactProgressFill.style.width = "0%";
    setTimeout(() => {
      impactProgressFill.style.width = data.impact;
    }, 50);

    // 3. Update Stat Labels
    if (labelHs) {
      labelHs.textContent = data.hsLabel;
    }

    // 4. Animate Stat Values (Matches, Runs, Average, HS, Hundreds, Fifties)
    animateValue(valMatches, 0, data.matches, 1000);
    animateValue(valRuns, 0, data.runs, 1200);
    animateValue(valAvg, 0, data.avg, 1100, true);
    animateValue(valHs, 0, data.hs, 1100, data.isHsDecimal, data.hsSuffix);
    animateValue(valHundreds, 0, data.hundreds, 900);
    animateValue(valFifties, 0, data.fifties, 950);
  }

  // Switch Format Jersey in background
  function switchJersey(formatKey) {
    backgroundJerseys.forEach(jersey => {
      jersey.classList.remove("active");
      
      // Select jersey matching id
      if (jersey.id === `jersey-${formatKey}`) {
        jersey.classList.add("active");
      }
    });
  }

  const scorecardPanel = document.querySelector(".scorecard-panel");

  // Add event listener to each bubble item
  formatButtons.forEach(button => {
    button.addEventListener("click", () => {
      const format = button.getAttribute("data-format");
      
      if (format === "test") {
        window.location.href = "test.html";
        return;
      }
      
      if (format === "odi") {
        window.location.href = "odi.html";
        return;
      }
      
      if (format === "t20") {
        window.location.href = "t20.html";
        return;
      }
      
      if (format === "ipl") {
        window.location.href = "ipl.html";
        return;
      }
    });

    // Hover event listeners to show vector jersey previews and scorecard stats temporarily for all formats
    button.addEventListener("mouseenter", () => {
      const format = button.getAttribute("data-format");
      button.classList.add("active");
      if (scorecardPanel) {
        scorecardPanel.classList.add("active");
      }
      updateStats(format);
      switchJersey(format);
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove("active");
      if (scorecardPanel) {
        scorecardPanel.classList.remove("active");
      }
      switchJersey("test");
    });
  });

  // Intersection Observer for scroll-reveal images (blur-to-focus reveal)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".scroll-reveal-img").forEach(el => {
    revealObserver.observe(el);
  });

  // Parallax Scroll Effect for Hero Image
  window.addEventListener("scroll", () => {
    const heroImg = document.querySelector(".hero-profile-image");
    if (heroImg) {
      const rect = heroImg.getBoundingClientRect();
      const viewCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (elementCenter - viewCenter) * 0.08;
      heroImg.style.transform = `scale(1.05) translateY(${offset}px)`;
    }
  });

  // Init stats with Test format on page load
  // updateStats("test");
});
