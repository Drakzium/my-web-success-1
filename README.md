# NO ONE LABS — Portfolio

Premium cinematic 3D portfolio for **No One Labs**.

## Stack

- React + TypeScript + Vite
- Three.js / React Three Fiber
- GSAP + Framer Motion

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Edit content

| Content | File |
| --- | --- |
| Projects | `src/data/projects.ts` |
| Expertise | `src/data/expertise.ts` |
| Services | `src/data/services.ts` |
| Process steps | `src/data/process.ts` |
| Navigation / Discord | `src/data/navigation.ts` |

## Add a project

1. Open `src/data/projects.ts`
2. Append a new object to the `projects` array with `id`, `title`, `slug`, `summary`, `description`, `status`, `tags`, and `accent`
3. The Projects section and detail modal update automatically

## Limitations

- Contact form submission is intentionally disconnected until an external service is configured; Discord is the live contact path.
- 3D uses procedural geometry (no large model downloads). Devices without WebGL, reduced-motion preferences, or constrained mobile hardware receive a CSS fallback / lighter scene.
