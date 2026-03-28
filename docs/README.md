# PF6.Charts Gallery — GitHub Pages

This directory is the GitHub Pages root for the `elm-patternfly-charts` repo.
`index.html` and `main.js` are the compiled gallery app.

**Live site:** https://lenards.github.io/elm-patternfly-charts/

---

## Rebuilding after changes

The source lives in `demo/`. To recompile:

```bash
# From the repo root
cd demo
elm make src/Main.elm --output=../docs/main.js
```

> **Note:** If you ask Claude Code to run this command, it will need
> `dangerouslyDisableSandbox: true` — the Claude Code shell sandbox blocks
> writes to `~/.elm/0.19.1/packages/lock`. Running it yourself in a normal
> terminal has no such restriction.

Then commit the updated `docs/main.js` and push — GitHub Pages redeploys automatically.

```bash
git add docs/main.js
git commit -m "Rebuild gallery"
git push origin main
```

## How it works

- `demo/elm.json` is an Elm *application* (not a package).
- It uses `source-directories` to pull in both the library source (`../src`)
  and the local `elm-visualization` clone (`../../elm-visualization/src`),
  so no `elm install` is needed.
- The compiled JS is a single self-contained file (`main.js`, ~340 KB).
