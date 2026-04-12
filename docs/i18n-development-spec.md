# RoboIndex i18n Development Spec

## Scope
- Supported locales: `en`, `zh`
- English is the canonical source language for all user-facing content and structured data
- Chinese is a first-class display locale for UI and page content

## Routing
- All localized pages live under `app/[lang]/`
- Public URLs use explicit language prefixes:
  - `/en/...`
  - `/zh/...`
- The root path `/` is a static language entry page that redirects to the preferred locale using client-side logic
- Path segments and slugs stay in English for both locales

## UI Localization
- Fixed UI copy must come from the typed dictionaries under `src/i18n/`
- Server components should load dictionary content and pass concrete strings to client components
- Do not hardcode navigation labels, buttons, empty states, or page chrome in page components

## Content Rules
- Every content item must have at least English content
- Long editorial content should use separate locale files:
  - `*.en.yaml`
  - `*.zh.yaml`
- Short structured content may keep English canonical fields plus optional `_zh` fields
- Do not mix Chinese and English sentence-by-sentence in the same content field

## Paper Data
- `src/content/papers/*.yaml` remains the canonical source of truth
- Existing English fields such as `title` and `abstract` must stay strings
- Optional Chinese translations may be added as `title_zh` and `abstract_zh`
- Paper entries are allowed to remain English-only when no reliable Chinese translation exists
- Tags, venue identifiers, slugs, and other logic-bearing values remain stable English identifiers

## API Stability
- Existing generated JSON endpoints remain canonical and stable:
  - `/api/papers.json`
  - `/api/stats.json`
  - `/api/papers/{slug}.json`
- Do not rename or remove existing fields
- Additional locale fields may be appended, but the canonical English fields must remain intact

## Fallback Behavior
- In `zh` routes, paper pages may display English canonical content when no `*_zh` translation exists
- For non-paper long-form content, if a Chinese translation is missing, the page may fall back to English with an explicit notice

## Verification
- Run `npx tsc --noEmit`
- Run `npm run build`
- Confirm both `/en/...` and `/zh/...` routes are generated for each localized page
