// ---- TIME DISPLAY ----
function updateTime() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes().toString().padStart(2,"0");
  let ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  document.getElementById("rightTime").textContent = `${h}:${m} ${ampm}`;
}
updateTime();
setInterval(updateTime, 10000);

// ---- LIGHTBOX ----
const images = Array.from(document.querySelectorAll("img"));
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    openLightbox(images[currentIndex].src);
  });
});

function openLightbox(src){
  lbImage.src = src;
  lightbox.classList.add("show");
}

function closeLightbox(){
  lightbox.classList.remove("show");
}

lbClose.onclick = closeLightbox;

lbPrev.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lbImage.src = images[currentIndex].src;
};

lbNext.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  lbImage.src = images[currentIndex].src;
};

// close on background click
lightbox.addEventListener("click", (e) => {
  if(e.target === lightbox) closeLightbox();
});
