# Germany Workplace Compliance Handbook

A bilingual static handbook for people preparing to enter German or European workplaces. It teaches practical compliance judgment through examples around data privacy, AI, workplace information, product flows, UX, procurement signals, and German/EU regulatory expectations.

The product is designed as a guided learning journey: users start with a quick beginner check, move through hard stops, grey areas, and better professional practices, then review what they learned with a score check.

## What It Covers

- Hard stops: situations that should be recognized early as clearly unsafe, prohibited, or high-risk.
- Grey areas: cases where the answer depends on context, evidence, boundaries, and how a system is actually used.
- Better practice: product and workplace habits that make work feel more credible, stable, and trustworthy in German teams.
- Score checks: lightweight quizzes that help users see what they already understand and what is worth reviewing.
- Feedback collection: simple three-option feedback submitted to Google Forms.

## Audience

This handbook is for:

- People preparing to work in Germany or with German/EU teams.
- Product, design, data, AI, SaaS, and operations workers who need a first sense of German compliance expectations.
- Teams that want to understand why German workplaces often treat privacy, AI, documentation, procurement, and employee data differently from other markets.

It is not legal advice. It is a learning and judgment-training tool.

## Live Structure

The site is a static app with no build step.

```text
.
├── index.html      # Main handbook page
├── styles.css      # Shared visual system and responsive layout
├── app.js          # Navigation, language switching, quiz logic, feedback submission
├── pretest.html    # Embedded beginner score check
├── vercel.json     # Vercel clean URL and redirect config
└── README.md
```

## Features

- English and Chinese language support.
- Page-based guided navigation without requiring users to rely on the top nav.
- Embedded pretest modal for beginner baseline checking.
- Main score check after the lesson.
- Context-aware next-step prompts between sections.
- Lightweight feedback prompts after the lesson and after the score check.
- Google Forms feedback submission with localStorage fallback.
- Mobile-friendly layout.

## Local Preview

Run a simple static server from the repository root:

```bash
python3 -m http.server 8012
```

Then open:

```text
http://127.0.0.1:8012/
```

No install step is required.

## Deploy To Vercel

Use the repository root as the Vercel project root.

Recommended settings:

- Framework preset: `Other`
- Build command: leave empty
- Output directory: leave empty
- Install command: leave empty

Vercel will serve `index.html` as the root page.

## Legacy Redirects

`vercel.json` keeps old links working:

- `/germany_digital_product_handbook.html` redirects to `/`
- `/germany_pretest_v4.html` redirects to `/pretest`

## Feedback Data

Feedback is collected through a Google Form endpoint from `app.js`.

The submitted payload includes:

- `source`: `lesson_end` or `quiz_end`
- `answer`: `yes`, `somewhat`, or `not_really`
- `language`: `en` or `zh`
- `page`: current handbook section
- `score`: quiz score when available
- `createdAt`: ISO timestamp

If the network request fails, the feedback is still saved locally in the user's browser under:

```text
germanyWorkplaceComplianceFeedback
```

## Development Notes

- Keep the app static unless a real backend becomes necessary.
- Avoid collecting personal, employer, or confidential workplace information.
- When changing filenames, update both `index.html` references and fallback paths in `app.js`.
- When changing feedback fields, update the Google Form entry IDs in `app.js`.

## Verification Checklist

Before deploying, check:

```bash
node --check app.js
python3 -m http.server 8012
```

Then verify:

- `/` loads the handbook.
- Language switching works.
- The pretest modal opens and loads `pretest.html`.
- Bottom next-step buttons move through the learning path.
- The score check can complete.
- Feedback buttons show the thank-you state.
