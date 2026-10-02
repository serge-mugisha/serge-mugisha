# A Little World

One unified poster restores the original composition: Serge’s name on the left, a continuous retro contribution grid on the right, and icon links in the footer. JetBrains Mono gives the typography a clean code-editor feel. The grid contains high-contrast ivory code brackets and a framed image-thumbnail icon with a sun and mountains. A beamed pair of notes, a single-stem note, and a treble (G) clef float; Pac-Man consumes brightness while leaving every tile visible; a walking pixel builder follows with a hammer and restores tiles on contact. Console captions type, pause with a blinking block cursor, then erase between Build Things, Design, and Music. Reduced-motion stills show a completed phrase.

GitHub delivers the design as a GIF with reduced-motion PNG fallbacks and a stacked phone variant. The footer is exported as four static image slices wrapped in real links, so each label remains clickable within the artwork. There are no HTML tables, scripts, or external rendering endpoints in the README.

Rebuild with Node.js 22+ and FFmpeg:

```sh
cd art/signal-studio
npm run build
```

The build prepares the phone composition, checks both with the pinned HyperFrames CLI, renders twelve-second loops at twelve GIF frames per second, and crops the clickable footer slices. Edit `signal-studio/index.html` for the design and `signal-studio/build.mjs` for export settings.

Artwork sources and font licenses are documented in `signal-studio/assets/SOURCES.md`. All contribution squares are illustrative, without invented counts. The native source remains inspectable; the published README’s designed text is rasterized to preserve the full composition.
