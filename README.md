# Natasha Keltner — Portfolio

A responsive, single-page portfolio built with plain HTML, CSS, and JavaScript. The
page presents projects, education, and community memberships as one filterable
timeline. Timeline entries are included in the HTML so they remain readable when
JavaScript is disabled; JavaScript enhances the page with category filters and the
mobile navigation.

## Preview locally

From the project directory, start Python's static file server:

```powershell
py -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Press `Ctrl+C` in the terminal
to stop the server.

## Content notes

The timeline content is based on the résumé supplied for this portfolio. It lists
projects, education, and memberships, but no employment history or project dates;
those have intentionally not been invented. Edit the semantic entries in `index.html`
and their `data-category` attributes to update the timeline. The filter controls in
`index.html` and filtering behavior in `script.js` should stay aligned with the
categories used by those entries.

The GitHub Pages workflow publishes the static site from the repository root when
changes are pushed to `main`.
