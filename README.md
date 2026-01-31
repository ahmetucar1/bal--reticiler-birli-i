# balmerkezbirligi.org — Astro + Tailwind (SSG)

Kurumsal, hızlı ve SEO odaklı statik site. İçerik kaynağı: Astro Content Collections (Markdown), sunum OCR çıktıları, mevcut site envanteri.

## Gereksinimler
- Node.js 20.x
- npm 10.x

## Kurulum ve komutlar
- `npm install` – bağımlılıkları kurar.
- `npm run dev` – geliştime sunucusu (localhost:4321).
- `npm run build` – üretim derlemesi (`dist/`).
- `npm run preview` – derlenen çıktıyı yerelde önizler.
- `npm run crawl` – mevcut siteyi tarar, `content/site_inventory.json` ve `content/audit.md` dosyalarını günceller.
- `npm run ocr` – `Sunum - Merkez Birliği` klasöründeki PNG’leri OCR ile işler, WebP çıktıları üretir ve `src/content/activities/` dosyalarını günceller.

## İçerik akışı
- Sayfa içerikleri: `src/content/pages/*.md` (frontmatter: `title`, `description`, `canonical`, `order`, `draft`).
- Faaliyetler: `src/content/activities/*.md` (frontmatter: `title`, `summary`, `date`, `tags`, `source_slide`, `featured_image`, `draft`). `draft: true` olanlar listede gösterilmez.
- OCR doğrulama listesi: `content/ocr_review.md`.
- Performans notları: `content/performance_report.md`.

## Yapı ve bileşenler
- Tasarım: Tailwind CSS, Manrope Variable font (yerel).
- Sayfalar: Ana sayfa, Hakkımızda, Yönetim Kurulu, Faaliyetler (liste+detay), Temsil, İletişim, Gizlilik, 404.
- SEO/teknik: Canonical, OG/Twitter kartları, JSON-LD Organization, sitemap.xml, robots.txt.

## Dağıtım

### Cloudflare Pages
- Build komutu: `npm run build`
- Output klasörü: `dist`
- Node sürümü: 20
- Çevre değişkeni: gerekmiyor
- Proje kurulduktan sonra `Custom domains` bölümünden `balmerkezbirligi.org` ve `www.balmerkezbirligi.org` alanlarını ekleyin, DNS’te CNAME kayıtları Cloudflare tarafından otomatik oluşturulur. “Always Use HTTPS” ve “Automatic HTTPS Rewrites” açık olmalı.

### Netlify
- Build komutu: `npm run build`
- Publish klasörü: `dist`
- Node sürümü: 20 (Netlify UI > Site settings > Environment)
- Dinamik işlev yok; Functions gereksiz. `Deploy > Domain management` alanından alan adını ekleyin, Netlify’nin verdiği nameserver’ları kullanın veya CNAME yönlendirmesi yapın.

## DNS yönergeleri (balmerkezbirligi.org)
- `Apex (root)`: Cloudflare Pages kullanıyorsanız CNAME flattening ile `<proje>.pages.dev` adresine yönlendirin. Netlify kullanıyorsanız `balmerkezbirligi.org` için Netlify hedefi (sitenin `.netlify.app` adresi) CNAME olarak eklenebilir.
- `www`: CNAME ile `<proje>.pages.dev` (Cloudflare Pages) veya `<site>.netlify.app` (Netlify) adresine yönlendirin.
- SSL/HTTPS: Cloudflare/Netlify otomatik sertifika sağlar; yönlendirmeleri (301) zorunlu HTTPS olacak şekilde ayarlayın.

## 301 yönlendirme stratejisi (eski URL → yeni URL)
- `/about-4` → `/hakkimizda`
- `/about-4-1` → `/yonetim-kurulu`
- `/yönetim-kurulu-1` → `/yonetim-kurulu`
- `/alt-birlikler` → `/temsil`
- `/standartlar` → `/faaliyetler`
- `/tüzük` → `/gizlilik` (geçici; tüzük PDF’i eklendiğinde yeni hedefe güncellenmeli)

Bu yönlendirmeleri Cloudflare Pages’da `_redirects` dosyasıyla, Netlify’da `_redirects` veya panel üzerinden ekleyebilirsiniz.
