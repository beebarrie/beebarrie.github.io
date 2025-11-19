/* --------------------------
   RIGHT TIME (California)
---------------------------*/

function updateTime() {
  document.getElementById("rightTime").textContent =
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Los_Angeles"
    });
}

updateTime();
setInterval(updateTime, 1000);


/* --------------------------
   LIGHTBOX LOGIC
---------------------------*/

const imgs = document.querySelectorAll("img");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImage");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let currentIndex = 0;
const images = Array.from(imgs).map(img => img.src);

// open lightbox
imgs.forEach((img, i) => {
  img.addEventListener("click", () => {
    currentIndex = i;
    lbImg.src = images[i];
    lightbox.classList.add("show");
  });
});

// close
lbClose.onclick = () => lightbox.classList.remove("show");

// next
lbNext.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  lbImg.src = images[currentIndex];
};

// prev
lbPrev.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lbImg.src = images[currentIndex];
};
