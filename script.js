(function(){
  
  const right = document.getElementById("rightTime");

  function pad(n){ return n < 10 ? "0" + n : n; }

  function tick(){
    const d = new Date();
   
    right.textContent = `${d.getHours()}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  tick();
  setInterval(tick, 1000);

  // Lightbox
  const imgs = Array.from(document.querySelectorAll("img"));
  const box = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImage");
  const closeBtn = document.getElementById("lbClose");
  const nextBtn = document.getElementById("lbNext");
  const prevBtn = document.getElementById("lbPrev");

  let index = 0;
  const gallery = imgs.map(i => i.src);

  function open(i){
    index = i;
    lbImg.src = gallery[index];
    box.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function close(){
    box.classList.remove("show");
    document.body.style.overflow = "";
  }

  imgs.forEach((img, i)=>{
    img.addEventListener("click", ()=> open(i));
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", ()=> open((index + 1) % gallery.length));
  prevBtn.addEventListener("click", ()=> open((index - 1 + gallery.length) % gallery.length));

  window.addEventListener("keydown", (e)=>{
    if(!box.classList.contains("show")) return;
    if(e.key === "Escape") close();
    if(e.key === "ArrowRight") nextBtn.click();
    if(e.key === "ArrowLeft") prevBtn.click();
  });

  // Domain pill
  document.getElementById("domainPill").onclick = () => {
    window.open("https://bintabarrie.com", "_blank");
  };
})();
