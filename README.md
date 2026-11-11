# Muhammad Abdullah — Portfolio Website

Personal portfolio for Muhammad Abdullah, Web Designer & Full-Stack Web Developer
from Pakistan. Live at https://profile-eight-opal.vercel.app/

## What it is

A static portfolio site (HTML, CSS, JavaScript, Bootstrap) aimed at small
businesses looking for a website: a conversion-focused hero, two real projects
with live demos, services, a 4-step working process, about/skills, and a
project enquiry form.

- **BrightNest Cleaning Co.** — a fictional business-website concept (clearly
  labelled as such), with a quote calculator, pricing and booking interface.
  Live: https://muhammadabdullah-alt.github.io/brightnest-cleaning-co/
- **Study & Task Tracker** — a personal productivity web app (localStorage, no
  backend). Live: https://task-tracker-ochre-six.vercel.app/

## Structure

- `index.html` — the whole site (sections: Home, Selected Work, Services,
  How I Work, About, Skills, Contact)
- `scss/dark.css` — site styles (dark navy + cyan)
- `js/script.js` — preloader, navbar/scrollspy, image modal, footer year,
  and the contact form (honest mailto fallback — see below)
- `assets/images/projects/` — real screenshots of the two live projects
- `Muhammad-Abdullah-CV.pdf` — CV (editable source: `cv-source.html`)
- `QA_REPORT.md` — changed files, design/content summary, and test reports

## Contact form — read this

The site has **no form backend**. The enquiry form validates the fields in
the browser and then opens the visitor's own email app with the enquiry
pre-filled (mailto). The page says so plainly, and direct email/WhatsApp
contacts are shown next to the form. Do not present it as a submitted form.

## Preview locally

```bash
cd portfolio-upgrade
python3 -m http.server 8000
# open http://localhost:8000/
```

## Deploy

This repo is deployed on Vercel as `profile-eight-opal.vercel.app`. Pushing to
`main` triggers an automatic production redeploy (usually 1–3 minutes).
Do not deploy until the site owner has reviewed and approved the changes.
