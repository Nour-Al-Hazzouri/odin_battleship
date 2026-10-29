# Technical Log of Changes

## Request #1 - 2026-09-26

- **Technical Summary**: Built the main UI layout structure according to wireframe specs.
- **Modified Files**:
  - `src/UI/main/home.js`: Added DOM creation logic for mother container (`boards-container`), ships panel (`ships-section`), 10x10 board grid panel (`board-section`), control buttons (`reset-btn`, `randomize-btn`), and centered `play-btn`.
  - `src/styles.css`: Added flex and grid layout rules matching specified structural requirements.
  - `src/index.js`: Imported and invoked `renderHome()`.

### Plain English Summary

Created the core layout structure for the Battleship home UI in `home.js` and styled the mother flex container, the two side-by-side grid sections with their respective buttons, and the centered Play button at the bottom of the main content area in `styles.css`.

## Request #2 - 2026-09-26

- **Technical Summary**: Re-structured ships panel layout so `ships-grid` acts as mother container wrapping `axis-btn-container` and `actual-ships-grid`.
- **Modified Files**:
  - `src/UI/main/home.js`: Nested `axisBtnContainer` and `actualShipsGrid` inside `shipsGrid`, making `axisBtnContainer` a sibling of `actualShipsGrid`.
  - `src/styles.css`: Updated `.ships-grid` to flex column container with border styling, separating button layout from `.actual-ships-grid`.

### Plain English Summary

Moved the vertical/horizontal axis button inside the bordered `ships-grid` container as a child alongside the actual ships grid element so that button layout is isolated from the grid system.

## Request #3 - 2026-09-27

- **Technical Summary**: Implemented second page playground view structure in `src/ui/main/playground.js` and styled layout in `src/styles.css`.
- **Modified Files**:
  - `src/ui/main/playground.js`: Created `renderPlayground()` creating two `<section>` containers (Player on left, Computer on right) containing `<h2>`, `createBoardGrid()`, and status `<span>`.
  - `src/styles.css`: Added flex-column container styling for `.playground-section` with zero spacing/margin between sections, internal padding, and `border-right` on `.player-section`.
  - `CHANGES.md`: Logged Request #3 details per protocol.

### Plain English Summary

Built the layout structure for the second (playground) page containing Player and Computer sections placed side-by-side with no space between them, separated by a dividing border line and padded internally.

## Request #4 - 2026-09-27

- **Technical Summary**: Created `resetElement` utility component in `src/ui/main/components/resetElement.js`.
- **Modified Files**:
  - `src/ui/main/components/resetElement.js`: Implemented `resetElement(element)` function that iteratively removes all `firstChild` nodes while present.
  - `CHANGES.md`: Logged Request #4 details.

### Plain English Summary

Added a utility component function `resetElement` that clears all child elements inside a passed DOM container to allow wiping and resetting content when navigating between pages.

## Request #5 - 2026-09-27

- **Technical Summary**: Wrapped playground sections in a flex row `.playground-container` element.
- **Modified Files**:
  - `src/ui/main/playground.js`: Created `.playground-container` `<div>` wrapping `playerSection` and `computerSection` before appending to `main`.
  - `src/styles.css`: Added `.playground-container` CSS rule with `display: flex` and `flex-direction: row`.
  - `CHANGES.md`: Logged Request #5 details.

### Plain English Summary

Wrapped the two playground sections inside a `playground-container` element styled as a flex row to place the Player and Computer boards side-by-side inside the main section container.

---

## Request #6 — 2026-09-27

**Technical Summary:** Created 5 ship SVG assets for the battleship game.

**Modified files:**

- `src/assets/ship-2.svg` — Patrol Boat, 2 segments
- `src/assets/ship-3.svg` — Submarine, 3 segments (rounded hull style)
- `src/assets/ship-cruiser.svg` — Cruiser, 3 segments (angular hull style)
- `src/assets/ship-4.svg` — Destroyer, 4 segments
- `src/assets/ship-5.svg` — Aircraft Carrier, 5 segments

**Logic changes:**

- Each SVG uses `<g class="segment" id="seg-N">` for per-cell hit detection
- CSS class `hit` on a segment triggers red fill + white X marker
- CSS class `vertical` on `<svg>` root rotates the entire ship 90°
- `data-size` attribute on `<svg>` root exposes ship size to JS

**Why:** Ships needed to be visually distinct by type and support independent per-cell damage marking for the game's attack-phase logic.

**Plain English:** Five naval ship icons were created, one per ship type. Each ship is divided into independent sections that can be individually marked as "hit" by toggling a CSS class. Ships can also be rotated between horizontal and vertical to match how they were placed on the board.

---

## Request #7 — 2026-10-01

- **Technical Summary**: Added optional `player` parameter to `createBoardGrid(player)` and updated invocation in `gameInitiator.js`.
- **Modified Files**:
  - `src/ui/components/grid.js`: Updated `createBoardGrid` function signature to accept `player` and conditionally add `computer-cell-button` class to cell buttons if `player === "c"`.
  - `src/logic/gameInitiator.js`: Updated `createBoardGrid()` invocation for `computerGameboard` to pass `"c"`.

### Plain English Summary

---

## Request #8 — 2026-10-03

- **Technical Summary**: Added `setTimeout` logic in `attackGrid` in `src/logic/gameController.js` to execute a delayed random computer turn against the player board.
- **Modified Files**:
  - `src/logic/gameController.js`: Updated `attackGrid` function to set `setTimeout` for 2 seconds after computer board cell is marked, selecting random coordinates (0-9) to attack the player board and mark the corresponding player grid cell with "X" or "🔥".

### Plain English Summary

Updated the game controller so that after a player attacks a cell on the computer's grid and marks it, a 2-second timeout triggers a random counter-attack by the computer on the player's grid, updating the player board with the appropriate mark ("X" or "🔥").

---

## Request #9 — 2026-10-03

- **Technical Summary**: Fixed `querySelector` string pattern in `src/logic/gameController.js`.
- **Modified Files**:
  - `src/logic/gameController.js`: Updated `document.querySelector` string from `[data-coordinates="[${randomX},${randomY}]"]` to `[data-coordinates="[${randomX}, ${randomY}]"]` to match the exact spacing formatted in `src/ui/components/grid.js`.

### Plain English Summary

Fixed the DOM attribute selector space formatting in the attack controller to correctly match and locate player grid button elements.

---

## Request #10 — 2026-10-04

- **Technical Summary**: Replaced `alert()` win announcements in `src/logic/gameController.js` with modal `<dialog>` component returning to home view upon closing.
- **Modified Files**:
  - `src/logic/gameController.js`: Replaced browser `alert()` with `showGameOverDialog()` modal `<dialog>` containing a Close button that calls `renderHome()`. Fixed win condition checks to prevent computer turn execution after player victory.

### Plain English Summary

Replaced the native browser alert boxes shown when a game ends with a dialog window containing a Close button that redirects the player back to the main home screen.

---

## Request #11 — 2026-10-04

- **Technical Summary**: Added status text class identifiers to playground status spans and implemented turn text updating logic in game controller.
- **Modified Files**:
  - `src/ui/main/playground.js`: Added `player-status-text` and `computer-status-text` classes to status `<span>` elements.
  - `src/logic/gameController.js`: Added DOM text updates to display turn indicator messages ("Your turn...", "Computer's turn...") on start and turn transitions.

### Plain English Summary

Added CSS classes to identify the status text spans for both player and computer sections, and updated the turn handling logic to display whose turn it is during game start and turn transitions.

---

## Request #12 — 2026-10-04

- **Technical Summary**: Applied minimalist modern dark mode neon styling and updated ship list to 5 ships.
- **Modified Files**:
  - `src/ui/main/home.js`: Appended a duplicate of `shipThree` into the `shipSVGs` array.
    - _Why_: The game rules require 5 ships while only 4 distinct SVG assets are provided (duplicating size-3 ship for cruiser/submarine).
  - `src/styles.css`: Implemented dark neon design system, 40px × 40px board cell dimensions, 400px ship dock container, custom `:disabled` cell overrides, and neon glowing elements for header, footer, playground, status indicators, and modal dialogs.
    - _Why_: Establish modern minimalist dark neon aesthetic, align board cells with 40px SVG segment sizes for future drag-and-drop functionality, and ensure clicked/disabled board cells retain high contrast and visual feedback without browser-default dimming.

---

## Request #13 — 2026-10-07

- **Technical Summary**: Extracted `overDialog` modal component to `src/ui/components/overDialog.js`.
- **Modified Files**:
  - `src/ui/components/overDialog.js` (created)
  - `src/logic/gameController.js`
- **Logic Changes**:
  - Created `createOverDialog(message)` UI component that constructs the `<dialog>` modal element and attaches a close event listener to reset view with `renderHome()`.
  - Refactored `showGameOverDialog` in `src/logic/gameController.js` to instantiate and append `createOverDialog`.

### Plain English Summary

Extracted the game-over modal creation logic into its own reusable UI component `overDialog.js` in `src/ui/components/`. When closed, the dialog wipes the board views and returns the user to the home screen.

---

## Request #14 — 2026-10-07

- **Technical Summary**: Added optional `closeButton` boolean parameter to `createOverDialog` in `src/ui/components/overDialog.js`.
- **Modified Files**:
  - `src/ui/components/overDialog.js`
- **Logic Changes**:
  - Conditionally rendered a top/dismiss "✕" button (`close-x-btn`) when `closeButton` is `true`.
  - The "✕" button closes and removes the dialog without proceeding to `renderHome()`.

### Plain English Summary

Updated `createOverDialog` to support a boolean flag for adding an "✕" close button. When `true`, clicking "✕" simply dismisses the modal without clearing the game state or returning to the home screen.

---

## Request #15 — 2026-10-07

- **Technical Summary**: Connected home navigation button `#home` in `src/ui/main/playground.js` to prompt confirmation via `createOverDialog` with `closeButton = true`.
- **Modified Files**:
  - `src/ui/main/playground.js`
- **Logic Changes**:
  - Added click listener on `#home` button inside `renderPlayground`.
  - Displays `createOverDialog` configured with `closeButton = true` ("✕" button dismisses dialog, while Close/OK button navigates home and resets game state).

### Plain English Summary

Updated home button navigation inside the playground view to show a confirmation dialog using `createOverDialog(..., true)`. Clicking "✕" cancels and stays in game, while clicking Close/OK confirms and resets back to the home view.

---

## Request #16 — 2026-10-28

- **Technical Summary**: Replaced module-level global DOM query variables in `attackGrid.js` with centralized `getQueries()` from `gameState.js`.
- **Modified Files**:
  - `src/logic/attackGrid.js`: Imported `getQueries`, removed file-level `computerGrid`, `playerStatus`, `computerStatus` variables and initialization logic, and accessed cached DOM elements via `queries.computerGrid`, `queries.playerStatus`, and `queries.computerStatus`.
    - _Why_: Centralize DOM references inside shared state management (`gameState.js`) instead of re-querying or holding localized globals.

### Plain English Summary

Updated `attackGrid.js` to pull DOM element references from the shared queries state object instead of maintaining separate global variables and query lookups inside the file.

---

## Request #17 — 2026-10-29

- **Technical Summary**: Extracted `validateCoordinates` logic into a reusable module under `src/logic/`.
- **Modified Files**:
  - `src/logic/validateCoordinates.js`: Created function `validateCoordinates(x, y)` checking bounds 0–9.
  - `src/Classes/Gameboard.js`: Imported `validateCoordinates`, removed private `#validateCoordinates` method, and updated `placeShip` and `receiveAttack` to use the imported module.
    - _Why_: Allow any module to validate board coordinates without coupling to the `Gameboard` instance.

### Plain English Summary

Extracted coordinate bounds validation logic into its own module `validateCoordinates.js` in `src/logic/` and updated `Gameboard.js` to use it instead of an internal private method.

---

## Request #18 — 2026-10-29

- **Technical Summary**: Created `gameStateReset` and completed directional smart-targeting attack logic in `attackGrid.js`.
- **Modified Files**:
  - `src/logic/gameStateReset.js`: Created function to reset `anchorPositions` to original four offsets and restore `state` (`originalAnchor`, `currentAnchor`, `shipLocked`).
  - `src/logic/attackGrid.js`:
    - Fixed `receiveAttack` call signature to take coordinate array `[posX, posY]`.
    - Added coordinate validity and unattacked slot checks (`!player.Board[posX][posY].HitStatus`).
    - Handled successful hit: checks if ship sunk (triggering `gameStateReset()`) or increments/decrements current direction offset using `updateAnchorPosition()`.
    - Handled misses or invalid coordinates: shifts `anchorPositions`, resets `currentAnchor` back to `originalAnchor`, and resets state if possibilities are exhausted.
    - _Why_: Enable computer to follow hit streaks in a line until ships are sunk, pivoting across directions when misses or boundaries are hit.

### Plain English Summary

Created `gameStateReset.js` to reset targeting state and anchor offsets back to default values. Updated computer attack logic in `attackGrid.js` to intelligently target adjacent tiles along the current line when a ship is hit, reverse or switch directions when encountering misses or board edges, and return to random hunting once the target ship is sunk.
