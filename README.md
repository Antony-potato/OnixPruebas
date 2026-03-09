# work kit by HITOBA DESIGN — Next.js Recreation

Recreación componente por componente del sitio https://hitoba-office.com/

## Setup

### 1. Crear el proyecto Next.js
```bash
npx create-next-app@latest hitoba-office --typescript --tailwind --app
cd hitoba-office
```

### 2. Instalar dependencias
```bash
npm install swiper framer-motion lucide-react
```

### 3. Copiar archivos
Copia todos los archivos de esta carpeta a tu proyecto, reemplazando los que ya existen.

### 4. Correr
```bash
npm run dev
```

---

## Estructura de componentes

```
app/
  globals.css          ← Fuentes, variables CSS, overrides Swiper
  layout.tsx           ← Root layout con metadata
  page.tsx             ← Home page principal

components/
  layout/
    Navbar.tsx         ← Header fijo con scroll effect + menú mobile
    Footer.tsx         ← Footer dark con nav, redes, dirección

  sections/
    HeroSlider.tsx     ← Full-screen fade slider con counter y CTA
    WorksSection.tsx   ← Slider de obras (Swiper) + lista de proyectos
    AboutSection.tsx   ← Sección About con imagen y texto
    JournalSection.tsx ← Grid de artículos del journal
    ContactSection.tsx ← CTA de contacto con fondo de imágenes

  ui/
    LoadingScreen.tsx  ← Pantalla de carga animada

lib/
  data.ts              ← Datos de works, journal posts, nav links
```

## Librerías utilizadas

| Librería | Uso |
|----------|-----|
| `swiper` | Sliders del hero y sección Works |
| `framer-motion` | Animaciones de entrada (fadeUp, slide) y loading screen |
| `lucide-react` | Íconos de flechas |
| `next/image` | Optimización de imágenes |
| `next/link` | Navegación interna |

## Fuentes (Google Fonts)
- **Cormorant Garamond** — Display / títulos (serif elegante)
- **DM Sans** — Body / UI text
- **Noto Sans JP** — Texto japonés

## Notas
- Las imágenes usan Unsplash como placeholder (reemplazar con las originales)
- Los datos en `lib/data.ts` se pueden conectar a un CMS o API
- Los colores están definidos como CSS variables en `globals.css`
