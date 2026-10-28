# Datemate prototype

This folder contains the compiled Datemate app for this repository’s existing GitHub Pages site. Open https://sophiepurewal.github.io/datemate/ to try it.

All participants are fictional. Invitations, access controls and participant switching are local simulations. No real dating information should be entered. Browser screenshots cannot be blocked.

The React and TypeScript source, supplied product specification and test notes are in `source/`. To develop: run `npm ci`, `npm test` and `npm run dev` inside `source/`. To update this Pages subpage, run `npm run build` there, then copy the contents of `source/dist/` into this `datemate/` folder. Commit the new HTML and assets together. Do not replace the portfolio root or enable the standalone Pages workflow from the original source archive.

The application uses hash routes and relative assets to support this subdirectory. No portfolio files were changed to add it.
