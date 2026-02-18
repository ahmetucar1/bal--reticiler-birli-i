---
title: "Bitlis ve Hizan birlik başkanlarımızla birlikte gerçekleştirdiğimiz Bitlis Valimiz Sayın Ahmet Karakaya ziyareti"
summary: "Türkiye Bal Üreticileri Merkez Birliği olarak, Bitlis ve Hizan birlik başkanlarımızla birlikte bugün Bitlis Valimiz Sayın Ahmet Karakaya'yı ziyaret ederek Bitlis ilimizde yürüteceğimiz projeler ve arıcılık faaliyetlerinin geliştirilmesine yönelik konular hakkında istişarelerde bulunduk, ilimiz arıcılığına gösterdikleri ilgi ve yapıcı yaklaşımı için kendilerine teşekkür ederiz."
date: "2026-02-18"
tags: ["duyuru", "genel kurul", "ziyaret"]
featured_image: "/assets/duyurular/1.jpeg"
---

## Duyuruya ait diğer fotoğraflar

<div class="gallery-grid">
  <img src="/assets/duyurular/1.1.jpeg" alt="Bitlis Valiliği ziyareti 1" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/1.2.jpeg" alt="Bitlis Valiliği ziyareti 2" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/1.3.jpeg" alt="Bitlis Valiliği ziyareti 3" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/1.4.jpeg" alt="Bitlis Valiliği ziyareti 4" loading="lazy" decoding="async" />
  <img src="/assets/duyurular/1.5.jpeg" alt="Bitlis Valiliği ziyareti 5" loading="lazy" decoding="async" />
</div>

<div class="lightbox" data-lightbox hidden>
  <button class="lightbox-close" type="button" aria-label="Kapat">×</button>
  <img class="lightbox-image" alt="Duyuru görseli" />
</div>

<script>
  window.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.querySelector('[data-lightbox]');
    const lightboxImage = lightbox?.querySelector('.lightbox-image');
    const closeBtn = lightbox?.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    if (!lightbox || !lightboxImage || !closeBtn) return;

    const open = (src, alt) => {
      lightboxImage.src = src;
      lightboxImage.alt = alt || 'Duyuru görseli';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.hidden = true;
      lightboxImage.src = '';
      document.body.style.overflow = '';
    };

    galleryImages.forEach((img) => {
      img.addEventListener('click', () => open(img.src, img.alt));
    });

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) close();
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.hidden && event.key === 'Escape') close();
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
</style>
