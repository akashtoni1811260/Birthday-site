# Birthday Site

A Netflix-style birthday page. No build step, plain HTML/CSS/JS.

## Customize
1. Open `config.js`: change name, age, text, rows, captions, photo filenames.
2. Drop your photos into `assets/` (names must match `config.js`).
3. Open `style.css` and edit the colors under `:root` to re-theme.

Missing photos show a colorful placeholder, so you can build gradually.

## Preview locally (VS Code)
Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".

## Publish
Push this folder to GitHub, then either:
- Netlify: "Add new site" > "Import from Git" (no build command, publish directory `/`), or
- GitHub Pages: Settings > Pages > Deploy from branch `main` / root.

## Features
Sticky nav that highlights the current section, scrollable shelves with arrows,
click any photo for a fullscreen viewer (arrow keys + Esc), Play = slideshow,
confetti button, mobile friendly.
