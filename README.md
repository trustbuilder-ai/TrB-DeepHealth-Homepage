# TrB-DeepHealth-Homepage

> Research-backed AI safety testing for mental health applications for Healthcare Professionals and AI Researchers

## Motivation

**What it does**: Professional-grade testing platform that evaluates AI models for mental health contexts, featuring safety protocols, bias detection, empathy scoring, and crisis intervention validation. The website features comprehensive AI testing scenarios, real-time analytics, therapeutic color palettes, accessibility features, and crisis support integration - all designed specifically for mental health AI validation.

**Pain points it solves**:

- Unsafe AI responses in mental health scenarios
- Lack of empathy evaluation in therapeutic AI
- Bias detection gaps in healthcare AI systems
- Missing crisis intervention protocols for AI models

**Target audience**: Healthcare professionals, AI researchers, mental health practitioners, clinical psychologists, and healthcare technology developers

## Usage (React Project)

- Current MVP: [React 19](./homepage-cc-rc-react19)
- Playground using shadcn, OriginUI, tweakcn, postcss and plain Tailwind: [React 18](./homepage-cc-rc-react18)

```sh
# Development
cd homepage-cc-rc-react19
npm validate
npm run dev

# Production build
npm run build
```

## GitHub Workflows

Automated CI/CD and security scanning:

- **CodeQL** - Security analysis for JavaScript/TypeScript (weekly + on push/PR)
- **Dependabot** - Dependency updates for both React projects + GitHub Actions (weekly)
- **GitHub Pages** - Automated deployment

> **Note**: React 18/19 project folders may change or be removed. Update `.github/workflows/codeql.yaml` and `.github/dependabot.yaml` accordingly if project structure changes.
