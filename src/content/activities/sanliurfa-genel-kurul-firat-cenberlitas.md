---
title: "Şanlıurfa Bal Üreticiler Birliğinde gerçekleştirilen genel kurulda Fırat Çenberlitaş güven tazeleyerek görevine devam etti."
summary: "Şanlıurfa Bal Üreticiler Birliğinde gerçekleştirilen genel kurulda Fırat Çenberlitaş güven tazeleyerek görevine devam etti."
tags: ["duyuru", "genel kurul"]
featured_image: "/assets/duyurular/0.jpeg"
---

## Duyuruya ait diğer fotoğraflar

<div class="gallery-grid">
  <img src="/assets/duyurular/0.1.jpeg" alt="Şanlıurfa genel kurul 1" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.2.jpeg" alt="Şanlıurfa genel kurul 2" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.3.jpeg" alt="Şanlıurfa genel kurul 3" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.4.jpeg" alt="Şanlıurfa genel kurul 4" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.5.jpeg" alt="Şanlıurfa genel kurul 5" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.6.jpeg" alt="Şanlıurfa genel kurul 6" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.7.jpeg" alt="Şanlıurfa genel kurul 7" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.8.jpeg" alt="Şanlıurfa genel kurul 8" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.9.jpeg" alt="Şanlıurfa genel kurul 9" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.10.jpeg" alt="Şanlıurfa genel kurul 10" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.11.jpeg" alt="Şanlıurfa genel kurul 11" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.12.jpeg" alt="Şanlıurfa genel kurul 12" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.13.jpeg" alt="Şanlıurfa genel kurul 13" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/0.14.jpeg" alt="Şanlıurfa genel kurul 14" loading="lazy" decoding="async" />
</div>

<div class="lightbox" data-lightbox hidden>
  <button class="lightbox-close" type="button" aria-label="Kapat">×</button>
  <button class="lightbox-nav lightbox-prev" type="button" aria-label="Önceki görsel">‹</button>
  <img class="lightbox-image" alt="Duyuru görseli" />
  <button class="lightbox-nav lightbox-next" type="button" aria-label="Sonraki görsel">›</button>
</div>

<script>
  window.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.querySelector('[data-lightbox]');
    const lightboxImage = lightbox?.querySelector('.lightbox-image');
    const closeBtn = lightbox?.querySelector('.lightbox-close');
    const prevBtn = lightbox?.querySelector('.lightbox-prev');
    const nextBtn = lightbox?.querySelector('.lightbox-next');
    const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    let activeIndex = 0;

    if (!lightbox || !lightboxImage || !closeBtn || !prevBtn || !nextBtn) return;

    const open = (index) => {
      const img = galleryImages[index];
      if (!img) return;
      activeIndex = index;
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || 'Duyuru görseli';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.hidden = true;
      lightboxImage.src = '';
      document.body.style.overflow = '';
    };

    const showPrev = () => {
      const nextIndex = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
      open(nextIndex);
    };

    const showNext = () => {
      const nextIndex = (activeIndex + 1) % galleryImages.length;
      open(nextIndex);
    };

    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => open(index));
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      showPrev();
    });
    nextBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      showNext();
    });
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) close();
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.hidden && event.key === 'Escape') close();
      if (!lightbox.hidden && event.key === 'ArrowLeft') showPrev();
      if (!lightbox.hidden && event.key === 'ArrowRight') showNext();
    });
  });
</script>

<style>
  .gallery-grid {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  .gallery-grid img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12);
    background: #f8fafc;
    cursor: zoom-in;
  }
  @media (max-width: 640px) {
    .gallery-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.85);
    display: grid;
    place-items: center;
    z-index: 9999;
    padding: 24px;
  }
  .lightbox-image {
    max-width: min(1100px, 92vw);
    max-height: 86vh;
    border-radius: 18px;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.4);
    background: #0f172a;
  }
  .lightbox-close {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 38px;
    height: 38px;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    color: #0f172a;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .lightbox-nav {
    position: absolute;
    top: 50%;
    width: 44px;
    height: 44px;
    margin-top: -22px;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    color: #0f172a;
    font-size: 1.6rem;
    cursor: pointer;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.25);
  }
  .lightbox-prev {
    left: 18px;
  }
  .lightbox-next {
    right: 18px;
  }
</style>
