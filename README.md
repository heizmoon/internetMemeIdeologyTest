# Dynamic Political Ideology Test (Next.js MVP)

This project is a configurable political ideology test built with Next.js + React.

## What this MVP supports

- Define ideology dimensions (3-5 or more) in config
- Define questions and multiple answer options
- Define scoring logic per answer per dimension
- Run a sequential user quiz flow
- Calculate and display result summary + chart
- Aggregate submitted results on a stats page (in-memory)

## Admin Configuration

Edit this file to manage the full test model:

- `src/data/ideology-config.json`

The file controls:

- `dimensions`: ideology dimensions (id, labels, color)
- `questions`: each question and its options
- `options[].effect`: scoring deltas by dimension id

You can inspect the currently loaded configuration in the app at:

- `/admin`

## Run locally

```bash
npm install
npm run dev
```

Open:

- Home: `http://localhost:3000`
- Quiz: `http://localhost:3000/quiz`
- Results: `http://localhost:3000/results` (normally via quiz flow)
- Stats: `http://localhost:3000/stats`
- Admin: `http://localhost:3000/admin`

## Validation

```bash
npm run lint
npx next build --webpack
```

Note: `npm run build` defaults to Turbopack in this setup; in restricted sandboxes that can fail due environment process/port limits, so webpack build is used here for verification.
