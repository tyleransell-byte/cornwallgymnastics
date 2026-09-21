# Cornwall Gymnastics Centre

React/Vite source project for the Cornwall Gymnastics website.

## Main files

- `src/App.jsx` — homepage sections and wording
- `src/components/` — header, footer and trial form
- `src/styles.css` — colours and layout
- `src/config.js` — contact details, Supabase URL and class cards
- `public/` — files copied directly to the published site
- `supabase/functions/trial-enquiry/` — email function source

## Local development

Run `npm install`, then `npm run dev`.

## Deployment

The GitHub Actions workflow builds and publishes the site after each push to `main`.
In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions**.

The existing password-protected timetable can be placed at `public/timetable.html`.
