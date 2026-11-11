# Battleship

A browser-based implementation of the classic Battleship board game. This project serves as the final project for the JavaScript course in The Odin Project's Full Stack JavaScript curriculum.

## Overview

The game pits a human player against a computer opponent on separate 10x10 grids. Gameplay includes:

- Manual ship placement with horizontal and vertical axis toggling.
- Automated random ship positioning option.
- Turn-based combat with hit and miss detection.
- Sound effects for attacks, placements, and UI interactions.
- A smart computer targeting algorithm that searches adjacent coordinates once a ship is hit to hunt and sink it.

## Tech Stack

- **Language:** JavaScript (ES6+ modules, factory functions, classes)
- **Markup & Styling:** HTML5, CSS3 (Flexbox and Grid layout)
- **Bundler:** Webpack 5 (`webpack-merge`, `babel-loader`, `css-loader`, `html-webpack-plugin`, asset modules)
- **Code Quality:** ESLint, Prettier
- **Testing:** Jest, Babel (`@babel/preset-env`)

## Project Structure

```text
battleship/
├── assets/                  # Audio sound effect assets (.wav)
├── src/
│   ├── Classes/             # Core domain models and unit tests
│   │   ├── Gameboard.js     # 10x10 board logic, placement, and attack handling
│   │   ├── Node.js          # Individual cell data model
│   │   ├── Player.js        # Player entity wrapping Gameboard and DOM grid
│   │   └── Ship.js          # Ship entity tracking length and hits
│   ├── logic/               # Game flow, AI targeting, and state management
│   │   ├── anchorShip.js    # Smart computer targeting direction probe
│   │   ├── attackGrid.js    # Player attack handler and turn coordination
│   │   ├── attackPlayerGrid.js # Computer attack selector (random vs target)
│   │   ├── detectShips.js   # Ship visualization helper
│   │   ├── gameController.js# Active game lifecycle controller
│   │   ├── gameInitiator.js # Session bootstrap and view transition
│   │   ├── gameState.js     # Factory functions for isolated game state
│   │   ├── randomizeShips.js# Random placement algorithm
│   │   └── validateCoordinates.js # Bounds verification helper
│   ├── ui/
│   │   ├── components/      # Modular UI components, dialogs, and renderers
│   │   └── main/            # Primary view renderers (home setup and playground)
│   ├── index.html           # HTML template
│   ├── index.js             # Application entry point
│   └── styles.css           # Global stylesheet
├── CHANGES.md               # Technical request change log
├── webpack.common.js        # Shared Webpack configuration
├── webpack.dev.js           # Development configuration with dev server
└── webpack.prod.js          # Production build configuration
```

## AI Assistance Disclosure

AI tooling was utilized strictly as an execution assistant to accelerate code typing and boilerplate refactoring. All architecture, system design, business logic, algorithmic strategies, and explicit implementation instructions were directed and decided solely by the author.
