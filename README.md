# axelbernal.dev

Portafolio de Axel Bernal. Una sola página, en español e inglés, con una
entrada en 3D (una esfera de vidrio que la cámara atraviesa) y paneles de
vidrio líquido sobre una aurora animada.

**Producción:** https://axelbernal-dev.web.app

## Con qué está hecho

| Capa | Qué |
|---|---|
| Base | React 19 · Vite 6 · TypeScript · Tailwind 4 |
| 3D | Three.js con React Three Fiber y drei (`MeshTransmissionMaterial`, `Environment` con `Lightformer`) |
| Vidrio | CSS `backdrop-filter` + filtro SVG de desplazamiento (`#liquid-glass`, sólo Chromium) |
| Movimiento | Framer Motion (revelado y transiciones) · Lenis (scroll suave) |
| Textos | i18next con detección de idioma; `src/i18n/{es,en}.json` |
| Contacto | EmailJS (formulario) y enlaces directos |
| Hosting | Firebase Hosting, proyecto `axelbernal-dev` |

## Correr

```bash
npm install --legacy-peer-deps   # fiber declara peers opcionales de Expo que npm intenta resolver
npm run dev                      # http://localhost:5173
npm run build                    # tsc + vite build → dist/
npm run preview                  # sirve dist/ en :4173
```

Node 20.9 o superior. `npm run typecheck` corre `tsc -b`.

## Desplegar

```powershell
# En Windows, firebase-tools necesita ComSpec y System32 en el PATH
$env:ComSpec='C:\Windows\System32\cmd.exe'; $env:PATH += ';C:\Windows\System32'
npm run build
firebase deploy --only hosting --project axelbernal-dev
```

Las cabeceras de `firebase.json` dejan `index.html` y las rutas con
`no-cache`, y los `assets/` con hash como inmutables.

## Dónde vive cada cosa

```
src/
  App.tsx            fases (intro → entrando → sitio), Lenis, cursor
  hooks/useSite.tsx  estado de fase, equipo modesto, reduced-motion
  state/view.ts      valores mutables que leen los bucles de animación
  three/             Scene (Canvas fijo), Aurora (shader), GlassSphere,
                     Shapes (objetos que huyen del cursor), CameraRig
  components/        Glass, Nav, Intro, Section, Reveal, LiquidFilter, Brand
  sections/          Hero, About, Cases, Platform, Projects, Path, Contact, Footer
  content/           cases.ts, projects.ts, modules.ts (textos ES/EN)
  i18n/              es.json, en.json (interfaz)
  styles/global.css  tokens, vidrio, píldoras, capas
public/img/          fotos y capturas optimizadas (webp), logo AB
```

### Reglas que costaron descubrir

- **Todo CSS propio va en `@layer base` o `@layer components`.** El CSS sin
  capa le gana a cualquier capa, así que un `.pill { display: inline-flex }`
  suelto anula `md:hidden`, y un `h3 { margin: 0 }` suelto anula `mt-10`.
- **`last:pb-0` sólo sirve si el elemento es hijo directo de la lista.** Un
  `<li>` envuelto en un `<div>` de animación es siempre el último hijo de su
  envoltorio.
- **La entrada se enseña una vez por sesión** (`sessionStorage.ab_intro`) y
  nunca con `prefers-reduced-motion`. Para volver a verla:
  `sessionStorage.removeItem('ab_intro')` y recargar.
- **Equipos modestos** (pantalla ≤ 820 px o ≤ 4 núcleos) usan
  `meshPhysicalMaterial` con transmisión en vez de `MeshTransmissionMaterial`,
  menos objetos y DPR 1.
- **Las capturas con Playwright no sirven aquí**: el WebGL por software tarda
  más que el tiempo de espera. Se revisa en un Chrome con GPU.

## Contenido

Las cifras de los casos salen de la documentación de cada módulo de SATIUM
(`docs/<área>/RELEVO.md` en el backend). Si una cifra cambia allá, cambia en
`src/content/cases.ts`.
