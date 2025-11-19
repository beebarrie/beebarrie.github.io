// Basic interactivity: clock update + lightbox preview + keyboard nav

(function(){
  // Update header clock (left static-ish, right seconds)
  const left = document.getElementById('leftTime');
  const right = document.getElementById('rightTime');

  function two(n){ return n < 10 ? '0' + n : n; }

  function updateTime(){
    const d = new Date();
    left.textContent = `${d.getHours()}:${two(d.getMinutes())}`;
    right.textContent = `${d.getHours()}:${two(d.getMinutes())}:${two(d.getSeconds())}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Lightbox logic
  const images = Array.from(document.querySelectorAll('img'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let currentIndex = -1;
  // create array of unique image srcs (exclude UI images if any)
  const gallery = images.map(i => i.getAttribute('src'));

  function openLightbox(index){
    if(index < 0 || index >= gallery.length) return;
    currentIndex = index;
    lbImg.src = gallery[currentIndex];
    lbImg.alt = images[currentIndex].alt || '';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  function next(){
    if(currentIndex < gallery.length - 1) openLightbox(currentIndex + 1);
    else openLightbox(0);
  }
  function prev(){
    if(currentIndex > 0) openLightbox(currentIndex - 1);
    else openLightbox(gallery.length - 1);
  }

  // click on any image opens lightbox at that index
  images.forEach((img, idx) => {
    img.addEventListener('click', (e) => {
      openLightbox(idx);
    });
    img.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') openLightbox(idx);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', next);
  lbPrev.addEventListener('click', prev);

  // close when clicking the backdrop (but not when clicking image)
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });

  // keyboard support
  window.addEventListener('keydown', (e) => {
    if(lightbox.classList.contains('show')){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowRight') next();
      if(e.key === 'ArrowLeft') prev();
    }
  });

  // domain pill click (open in new tab)
  document.getElementById('domainPill').addEventListener('click', () => {
    window.open('https://khalilghani.com', '_blank');
  });

  // make keyboard accessible
  document.getElementById('domainPill').addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') window.open('https://khalilghani.com', '_blank');
  });
})();
