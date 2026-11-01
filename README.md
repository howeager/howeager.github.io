# Roberto Saldana — Portfolio

A responsive, static portfolio inspired by 16-bit installation software: blue desktop gradients, gray window frames, and beveled controls. The portfolio uses standard links and requires no JavaScript to browse.

## Structure

- `index.html`: introduction, selected work, background, and contact links.
- `pages/minecraft-server.html`: infrastructure case study.
- `404.html`: custom GitHub Pages error page, including nested missing paths.
- `assets/css/site.css`: shared design and responsive portfolio layout.
- `assets/css/blog.css`: case study and image preview styles.
- `assets/js/viewer.js`: accessible image previews using a native dialog.
- `assets/img/`: case study images and local SVG icon.
- `archive/`: historical source material; not linked from the portfolio.

## Local preview

Serve this directory with any static HTTP server and open its local URL. No build step, package installation, or external font service is needed. GitHub Pages can serve the repository directly.

## Content updates

Edit the semantic HTML in `index.html` to update projects, education, activities, and contact information. Keep the case study's title, date, and links consistent with its homepage entry. Image previews use `data-viewer` for the relative image path and `data-caption` for descriptive alternative text.
