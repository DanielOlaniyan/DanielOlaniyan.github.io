# danielolaniyan.github.io

Personal site: plain HTML, CSS and JavaScript. No install or build step.

## Structure
```
index.html                    Name, contact links and tabs: Home (intro, experience, skills), Projects, Education and Certifications
projects/sepro-microwave.html One page per project (copy this one to start a new project)
assets/styles.css             All styling; colours are at the top under :root
assets/main.js                Tab switching, expand buttons and image lightbox
assets/media/<project>/       Images for each project
assets/Daniel_Olaniyan_Resume.pdf   (add later for the Résumé tab)
```

## Common edits
- **Change text:** edit the HTML file directly on GitHub (pencil icon) and commit. The site updates in about a minute.
- **Add a project:** copy `projects/sepro-microwave.html`, rename it, replace the content, then in `index.html` link the project's title to the new page and swap "Write-up in progress" for a "Read more →" link.
- **Add a photo or scanned calc:** put the image in `assets/media/<project>/`, then use `<img src="../assets/media/<project>/file.jpg" data-zoom alt="caption">`. `data-zoom` makes it clickable.
- **Draft markers:** `<span class="todo">` shows text in red on the site. Unfinished bits that should stay hidden are kept as `<!-- TODO ... -->` comments; search for `TODO` to find them.
- **Change colours or fonts:** edit the values under `:root` at the top of `assets/styles.css`.
- **Add a tab:** add a link in the `<nav class="tabs">` block and a matching `<section class="panel" id="...">` (a Résumé tab is already stubbed out in a comment).

## Publishing
Settings → Pages → Source: *Deploy from a branch* → `main` / root.
