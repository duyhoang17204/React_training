# React Training

A responsive tenant profile built with React and Tailwind CSS, powered by Vite.

## Requirements

- Node.js 20.10 or newer
- npm 10 or newer

## Install and run

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The profile page uses Tailwind utility classes, configured in `tailwind.config.js` and loaded from `src/index.css`.

## Demo behavior

The profile shows fixed sample information inspired by the supplied design reference. Editing updates the page for the current session only; changes are not stored. The message action displays a notice because no messaging service is connected. Access, lease, and document tabs show informational empty states; they are not backed by tenant records.

The Figma reference was available as a zoomed-out overview only. Exact source dimensions, font, colors, spacing, assets, breakpoints, and prototype behavior could not be inspected. The responsive breakpoints, teal palette, spacing, generic icons, and mobile-to-wide layout are implementation choices based on the visible reference, not verified Figma values.

## Build and lint

```sh
npm run build
npm run lint
```
