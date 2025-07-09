/* CODE TO HIDE HEADER AND SHOW ON SCROLL */
let lastScrollPosition = window.scrollY;
let animateItems = document.querySelectorAll(".appear");

animateItems.forEach((item, i) => {
  item.style.opacity = 0;
  item.style.transform = "translateX(50%)";
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateX(0)";
      observer.unobserve(entry.target);
    }
  });
});

animateItems.forEach(i => observer.observe(i));

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > lastScrollPosition) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPosition = window.scrollY;
});

/* CODE FOR THE ORBITING IMAGES */

const images = document.querySelectorAll(".orbit");
const count = images.length;

let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0,
);
let vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);
// TODO: Work when resizing
let measure = Math.min(vh, vw) < 450 ? "px" : vh > vw ? "vw" : "vh";
let radius = Math.min(vh, vw) < 450 ? 150 : 30;
const img_size = "45px";

images.forEach((img, i) => {
  const angle = (i / count) * Math.PI * 2;
  img.style.transform = `translateX(${radius * Math.cos(angle)}${measure}) translateY(${radius * Math.sin(angle)}${measure})`;
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
  images.forEach((image, i) => {
    const angle = (i / count) * Math.PI * 2;
    image.style.transform = `translateX(${radius * Math.cos(angle)}${measure}) translateY(${radius * Math.sin(angle)}${measure})`;
  });
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + angleOffset;
    images[i].style.transform =
      `translateX(${radius * Math.cos(angle)}${measure}) translateY(${radius * Math.sin(angle)}${measure})`;
  }
  requestAnimationFrame(animate);
  angleOffset += 0.01;
  if (angleOffset > Math.PI * 2) {
    angleOffset -= Math.PI * 2;
  }
}

animate();

let is_hovering = false;
for (const image of images) {
  image.addEventListener("mouseover", () => {
    is_hovering = true;
    image_div.classList.add("not_orbiting");
  });
  image.addEventListener("mouseout", () => {
    is_hovering = false;
    image_div.classList.remove("not_orbiting");
  });
  image.addEventListener("click", () => {
    if (is_hovering) return;
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
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const container = document.querySelector(".container");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.getAttribute("data-category");
    cards.forEach((card) => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

document.querySelector(".scroll.left").addEventListener("click", () => {
  container.scrollBy({ left: -300, behavior: "smooth" });
});

document.querySelector(".scroll.right").addEventListener("click", () => {
  container.scrollBy({ left: 300, behavior: "smooth" });
});
