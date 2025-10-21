# PROJECT_SABA — Docusaurus Site (Clean Build)

This is a clean Docusaurus 3.9.1 site with Tailwind, using your naming:
- **DOCUMENT** → /docs
- **EXPERIMENTS** → /experiments
- **BULLSHIT** → /blog

## Quickstart
```bash
# (Recommended) delete old caches if replacing an existing folder
rd /s /q .docusaurus node_modules  # on Windows CMD (or use rm -rf on mac/Linux)
npm install
npm run start -- --clean
```

If you see 404 on /experiments, ensure the `experiments/` folder exists with .md posts (this repo already includes 2).
