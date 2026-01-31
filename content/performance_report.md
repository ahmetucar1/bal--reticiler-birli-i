# Performans ve kalite notları
- Tarih: 2026-01-26
- Build: `npm run build` (Astro SSG)

## Yapılan iyileştirmeler
- Sunum PNG’leri `magick` ile 1600px ve 900px WebP çıktılarına dönüştürüldü; sayfa içi `loading="lazy"` uygulandı.
- Marka logoları yeniden boyutlandırıldı (128/180/400/512/800) ve favicon/og görselleri güncellendi.
- Yerel, değişken font kullanımı: `@fontsource-variable/manrope` (harici CDN yok).
- Minimal JS: yalnızca faaliyet listesinde arama/etiket filtresi için küçük vanilla script.
- Sitemap ve robots.txt üretildi; canonical, OG/Twitter meta ve JSON-LD eklendi.
- Tailwind utility tabanlı kritik CSS; fazladan framework veya paket eklenmedi.

## İzlenecekler / sonraki adımlar
- Lighthouse hedefleri: Performans ≥90, SEO ≥95, Erişilebilirlik ≥90, Best Practices ≥90 (yayın ortamında doğrulanacak).
- Gerekirse görseller için ek AVIF varyantları üretilebilir.
- Alt birlik adresleri ve yönetim kurulu isimleri doğrulandığında içerik güncellemesi yapılmalı.
