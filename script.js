// ===============================
// DARK MODE / LIGHT MODE
// ===============================

const body = document.body;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("mila-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀";
} else {
  themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  const dark = body.classList.contains("dark");

  themeToggle.textContent = dark ? "☀" : "☾";

  localStorage.setItem("mila-theme", dark ? "dark" : "light");
});

// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));

  menuToggle.textContent = open ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";
  });
});

// ===============================
// SCROLL ANIMATIONS
// ===============================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// ===============================
// PORTFOLIO FILTERS
// ===============================

const filters = document.querySelectorAll(".filter");

const cards = document.querySelectorAll(".project-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const chosen = button.dataset.filter;

    cards.forEach((card) => {
      card.classList.toggle(
        "hidden",
        chosen !== "all" && card.dataset.category !== chosen,
      );
    });
  });
});

// ===============================
// SCROLL PROGRESS BAR
// ===============================

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;

  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;

  document.getElementById("scrollProgress").style.width = `${progress}%`;
});

// ===============================
// CURRENT YEAR
// ===============================

document.getElementById("year").textContent = new Date().getFullYear();

// ===============================
// AUTO SELECT SERVICE
// ===============================

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.getElementById("serviceSelect");

    if (select) {
      select.value = link.dataset.service;
    }
  });
});

// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);

  const subject = encodeURIComponent("Project enquiry — Mila Moodboard");

  const message = encodeURIComponent(
    `Name: ${data.get("name")}

Email: ${data.get("email")}

Business / brand: ${data.get("company") || "Not provided"}

Service: ${data.get("service")}

Project details:
${data.get("message")}`,
  );

  document.getElementById("formMessage").textContent =
    "Your email app should open with your enquiry ready to send.";

  window.location.href = `mailto:hello@milamoodboard.com?subject=${subject}&body=${message}`;
});

// ===============================
// NEWSLETTER FORM
// ===============================

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  document.getElementById("newsletterMessage").textContent =
    "Thank you for your interest! Connect an email marketing service to activate subscriptions.";

  newsletterForm.reset();
});

// ===============================
// PORTFOLIO LIGHTBOX
// ===============================

const lightbox = document.getElementById("lightbox");

const closeLightbox = () => {
  lightbox.classList.remove("open");

  lightbox.setAttribute("aria-hidden", "true");
};

document.querySelectorAll(".view-project").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");

    document.getElementById("lightboxTitle").textContent = card.dataset.title;

    document.getElementById("lightboxDescription").textContent =
      card.dataset.description;

    lightbox.classList.add("open");

    lightbox.setAttribute("aria-hidden", "false");
  });
});

// CLOSE LIGHTBOX BUTTON

document
  .getElementById("lightboxClose")
  .addEventListener("click", closeLightbox);

// CLOSE WHEN CLICKING OUTSIDE

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// CLOSE WITH ESCAPE KEY

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// CLOSE LIGHTBOX WHEN GOING TO CONTACT

document
  .getElementById("lightboxContact")
  .addEventListener("click", closeLightbox);
