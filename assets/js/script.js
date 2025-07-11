/* CODE TO HIDE HEADER AND SHOW ON SCROLL */
let lastScrollPosition = window.scrollY;
let scrollUpDistance = 0;

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollPosition) {
    header.classList.add("hide");
    scrollUpDistance = 0; // reset
  } else {
    scrollUpDistance += lastScrollPosition - currentScroll;
    if (scrollUpDistance > 200 || currentScroll === 0) {
      // We only want to show the header if the user has scrolled up 200px
      header.classList.remove("hide");
      scrollUpDistance = 0;
    }
  }

  lastScrollPosition = currentScroll;
});

/* CODE FOR THE ORBITING orbiters */

const orbiters = document.querySelectorAll(".orbiter");
const count = orbiters.length;

let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0,
);
let vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);

let measure = Math.min(vh, vw) < 450 ? "px" : vh > vw ? "vw" : "vh";
let radius = Math.min(vh, vw) < 450 ? 150 : 30;
const img_size = "45px";

orbiters.forEach((orbiter, i) => {
  const angle = (i / count) * Math.PI * 2;
  orbiter.style.transform = `translateX(${radius * Math.cos(angle)}${measure}) translateY(${radius * Math.sin(angle)}${measure})`;
});

let image_div = document.getElementById("section3__images");
image_div.style.width = `calc(${radius * 2}${measure} + 2*${img_size})`;
image_div.style.height = `calc(${radius * 2}${measure} + 2*${img_size})`;

window.addEventListener("resize", () => {
  vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0,
  );
  vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0,
  );
  measure = Math.min(vh, vw) < 450 ? "px" : vh > vw ? "vw" : "vh";
  radius = Math.min(vh, vw) < 450 ? 150 : 30;
  image_div.style.width = `calc(${radius * 2}${measure} + 2*${img_size})`;
  image_div.style.height = `calc(${radius * 2}${measure} + 2*${img_size})`;
});

let angleOffset = 0;
function animate() {
  if (image_div.classList.contains("not_orbiting")) {
    requestAnimationFrame(animate);
    return;
  }
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + angleOffset;
    orbiters[i].style.transform =
      `translateX(${radius * Math.cos(angle)}${measure}) translateY(${radius * Math.sin(angle)}${measure})`;
  }
  requestAnimationFrame(animate);
  angleOffset += 0.01;
  if (angleOffset > Math.PI * 2) {
    angleOffset -= Math.PI * 2;
  }
}

animate();

function translateIfNeeded(orbit) {
  const rect = orbit.getBoundingClientRect();
  const space_right = window.innerWidth - rect.left;
  // const space_left = rect.left;

  if (rect.right - rect.left > 100) {
    return;
  }

  if (space_right < 300) {
    orbit.style.transform = `translateX(${-(300 - space_right)}px)`;
    // }
    // else if (space_left < 300) {
    // orbit.style.transform = `translateX(${(300 - space_left)}px)`;
  } else {
    orbit.style.transform = "";
  }
}

const orbits = document.querySelectorAll(".orbit");
let is_hovering = false;
for (const orbit of orbits) {
  orbit.addEventListener("mouseover", () => {
    is_hovering = true;
    translateIfNeeded(orbit);
    image_div.classList.add("not_orbiting");
    orbit.parentElement.classList.add("active");
  });

  orbit.addEventListener("mouseout", () => {
    is_hovering = false;
    image_div.classList.remove("not_orbiting");
    orbit.style.transform = "translate(0)";
    orbit.parentElement.classList.remove("active");
  });
  orbit.addEventListener("click", () => {
    if (is_hovering) return;
    translateIfNeeded(orbit);
    orbit.classList.toggle("active");
    orbit.parentElement.classList.toggle("active");
    image_div.classList.toggle("not_orbiting");
  });
}

/* CODE TO TOGGLE DARK MODE */

// Icon
const icon = document.getElementById("theme_icon");
function toggleIcon(isLight) {
  icon.innerHTML = !isLight
    ? `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>`
    : `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>`;
}

const toggle = document.getElementById("toggleDarkMode");
const body = document.body;

if (!localStorage.getItem("theme")) {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    body.classList.add("light");
  }
}

// Load saved preference
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  toggleIcon(true);
} else {
  body.classList.remove("light");
  toggleIcon(false);
}

toggle.addEventListener("click", () => {
  body.classList.toggle("light");

  // Save preference
  const isLight = body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  toggleIcon(isLight);
});

/* Filtering cards */

function updateScrollers() {
  if (container.scrollLeft <= 30) {
    scrollLeft.classList.add("hidden");
  } else {
    scrollLeft.classList.remove("hidden");
  }
  if (Math.abs(container.scrollLeft + container.offsetWidth - container.scrollWidth) < 30) {
    scrollRight.classList.add("hidden");
  } else {
    scrollRight.classList.remove("hidden");
  }
}

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const container = document.querySelector(".container");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.getAttribute("data-category");
    cards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
    updateScrollers();
  });
});

const scrollLeft = document.querySelector(".scroll.left");
const scrollRight = document.querySelector(".scroll.right");

container.addEventListener("scroll", () => {
  updateScrollers();
});

scrollLeft.addEventListener("click", () => {
  container.scrollBy({ left: -300, behavior: "smooth" });
});

scrollRight.addEventListener("click", () => {
  container.scrollBy({ left: 300, behavior: "smooth" });
});

updateScrollers()

cards.forEach((card) => {
  card.addEventListener("mouseover", () => {
    is_hovering = true;
  });
  card.addEventListener("mouseout", () => {
    is_hovering = false;
  });
  card.addEventListener("click", () => {
    if (is_hovering) return;
    card.classList.toggle("active");
  });
});

/* Animations to appear */

let animateItems = document.querySelectorAll(".appear");

animateItems.forEach((item, i) => {
  item.classList.add("hidden");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      observer.unobserve(entry.target);
    }
  });
});

animateItems.forEach((i) => observer.observe(i));
