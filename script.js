// ================= ПЕРВЫЙ ЭКРАН =================
const lockScreen = document.getElementById("lockScreen");
const mainScreen = document.getElementById("mainScreen");
const slider = document.getElementById("sliderHandle");
const sliderArea = document.getElementById("sliderArea");
const audio = document.getElementById("bgAudio");

let dragging = false;
let startX = 0;
let currentLeft = 0;

function startDrag(x) {
    dragging = true;
    startX = x;
    currentLeft = slider.offsetLeft;
    slider.style.transition = "none";
    audio.play().catch(() => {});
}

function moveDrag(x) {
    if (!dragging) return;
    let delta = x - startX;
    let newLeft = currentLeft + delta;
    const maxLeft = sliderArea.offsetWidth - slider.offsetWidth;
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    slider.style.left = newLeft + "px";
}

function endDrag() {
    if (!dragging) return;
    dragging = false;
    slider.style.transition = "left 0.3s ease";
    const maxLeft = sliderArea.offsetWidth - slider.offsetWidth;

    if (slider.offsetLeft >= maxLeft * 0.7) {
        lockScreen.style.display = "none";
        mainScreen.style.display = "block";
        setTimeout(() => {
            handleScroll();
            animateProgram();
        }, 100);
    } else {
        slider.style.left = "0px";
    }
}

// TOUCH
slider.addEventListener("touchstart", e => startDrag(e.touches[0].clientX));
document.addEventListener("touchmove", e => moveDrag(e.touches[0].clientX));
document.addEventListener("touchend", endDrag);

// MOUSE
slider.addEventListener("mousedown", e => {
    e.preventDefault();
    startDrag(e.clientX);
});
document.addEventListener("mousemove", e => moveDrag(e.clientX));
document.addEventListener("mouseup", endDrag);

// ================= ТАЙМЕР =================
const weddingDate = new Date("2026-05-30T15:00:00");

function updateTimer() {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) return;

    document.getElementById("days").textContent =
        Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("hours").textContent =
        Math.floor((diff / (1000 * 60 * 60)) % 24);
    document.getElementById("minutes").textContent =
        Math.floor((diff / (1000 * 60)) % 60);
    document.getElementById("seconds").textContent =
        Math.floor((diff / 1000) % 60);
}

setInterval(updateTimer, 1000);
updateTimer();

// ================= SCROLL =================
const scrollItems = document.querySelectorAll(
    ".scroll-item, .scroll-timer, .scroll-location, .details-text, .form-question, .program-item, .program-title"
);

function handleScroll() {
    const triggerPoint = window.innerHeight * 0.85;
    scrollItems.forEach(item => {
        if (item.getBoundingClientRect().top < triggerPoint) {
            item.classList.add("show");
        }
    });
}

window.addEventListener("scroll", handleScroll);

// ================= PROGRAM =================
function animateProgram() {
    document.querySelector(".prog-1")?.classList.add("program-left");
    document.querySelector(".prog-2")?.classList.add("program-right");
    document.querySelector(".prog-3")?.classList.add("program-left");
}
