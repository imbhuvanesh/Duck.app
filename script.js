/* =========================================================
   DUCK — Landing Page Scripts
   ========================================================= */

/* ---- Editable links ---- */
const DOWNLOAD_URL = "https://www.mediafire.com/file/rjrpsbuz8td251v/duck.exe/file";
const GITHUB_URL = "https://github.com/imbhuvanesh";
const PORTFOLIO_URL = "https://imbhuvanesh.github.io/dev/";

/* ---- Apply links ---- */
document.addEventListener("DOMContentLoaded", () => {
  shown("[id$='DownloadBtn'], .nav-download", "href", DOWNLOAD_URL);
  shown("#githubLink", "href", GITHUB_URL);
  shown("#portfolioLink", "href", PORTFOLIO_URL);
});

function shown(selector, attr, value) {
  document.querySelectorAll(selector).forEach((el) => {
    el.setAttribute(attr, value);
  });
}

/* ---- Preloader ---- */
const preloader = document.getElementById("preloader");
const body = document.body;
let preloaderDone = false;

const MIN_LOAD_TIME = 1400;
const loadedAt = Date.now();

const finishPreloader = () => {
  if (preloaderDone) return;
  preloaderDone = true;
  preloader.classList.add("hidden");
  body.style.overflow = "";
  setTimeout(() => preloader.remove(), 700);
};

const hidePreloader = () => {
  const remaining = MIN_LOAD_TIME - (Date.now() - loadedAt);
  setTimeout(finishPreloader, Math.max(0, remaining));
};

body.style.overflow = "hidden";
window.addEventListener("load", hidePreloader);
setTimeout(hidePreloader, 4000);

/* ---- Sticky navbar ---- */
const nav = document.getElementById("navbar");
const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---- Mobile menu ---- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("active", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---- Reveal on scroll ---- */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}