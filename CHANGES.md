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

---

## Request #19 — 2026-11-05

- **Technical Summary**: Removed SVG assets, replaced them with 5 interactive ship labels and buttons, wired axis toggle and ship selection event handlers, and implemented `resetShipSelection`.
- **Modified Files**:
  - `assets/ship-2.svg`, `assets/ship-3.svg`, `assets/ship-4.svg`, `assets/ship-5.svg`: Deleted SVG files from assets directory.
    - _Why_: Deprecate SVG fleet graphics in favor of button/label DOM controls.
  - `src/ui/main/home.js`: Removed SVG imports and rendering loop; added rendering of 5 ship labels and buttons, an event listener on `axisBtn` toggling text and updating orientation (`v`/`h`) in `gameState.js`, and click listeners on ship buttons to apply `.selected` styling and update `selectedShip` in `gameState.js`.
    - _Why_: Provide interactive controls to toggle placement axis and select ships before placing them on the board.
  - `src/styles.css`: Replaced SVG wrapper styling with `.actual-ships-grid` label/button flex layout and added `.selected` border rule.
    - _Why_: Fit the new controls naturally within the setup panel and highlight the active ship selection with a 5px green border.
  - `src/logic/resetShipSelection.js`: Created function to query and remove `.selected` class from the active ship and reset `selectedShip` in `gameState.js`.
    - _Why_: Provide centralized logic to clear ship selection styling.
  - `src/Classes/Gameboard.js`: Imported and called `resetShipSelection()` inside `resetBoard()`.
    - _Why_: Clear ship selection and highlighting whenever the board is reset.

### Plain English Summary

Removed all ship SVG files from the project and replaced them with 5 labels and buttons representing the fleet in the home setup view. Added an event listener to toggle the axis button between HORIZONTAL and VERTICAL while synchronizing orientation state, wired ship selection listeners to highlight the chosen ship with a 5px green border and update selected ship state, and created a reset helper invoked during board resets to clear active ship styling.

---

## Request #20 — 2026-11-05

- **Technical Summary**: Moved global ship configurations to `gameState.js` with `getShips()` getter, removed wrapper divs around ship buttons, and added board grid cell click placement with error dialog handling and light blue cell highlighting.
- **Modified Files**:
  - `src/logic/gameState.js`: Added global `ships` array and exported `getShips()` getter function.
    - _Why_: Expose standard ship objects and sizes globally across logic and UI modules.
  - `src/ui/main/home.js`: Removed local `ships` array and wrapper divs around ship buttons in `.actual-ships-grid`; added click event listeners on `boardGrid.children` that retrieve `selectedShip` and `orientation` from `gameState.js`, invoke `player.Gameboard.placeShip`, color placed ship cells with `lightblue`, and display an `errorDialog` when an illegal move is caught.
    - _Why_: Enable interactive board ship placement with error feedback and visual feedback on placed ships.

### Plain English Summary

Extracted ship definitions into `gameState.js` accessible via a getter function and streamlined the ship button rendering by removing unnecessary container divs. Added click handlers across the home board grid so players can place selected ships on valid tiles, highlighting the placed ship tiles in light blue and showing an error modal on illegal placements.

---

## Request #21 — 2026-11-05

- **Technical Summary**: Updated placed ship cell background color to darker `steelblue` and reset cell colors to default inside `resetShipSelection.js`.
- **Modified Files**:
  - `src/ui/main/home.js`: Changed cell background color from `lightblue` to `steelblue`.
    - _Why_: Prevent ship cells from appearing too bright against the dark surface theme.
  - `src/logic/resetShipSelection.js`: Queried all `.board-grid .cell-btn` elements and cleared inline `backgroundColor`.
    - _Why_: Restore cell button colors back to default theme surface on board reset.

### Plain English Summary

Adjusted placed ship tiles to use a darker steel blue color instead of bright light blue, and updated the ship selection reset routine to clear inline background styling on all board cells when the board is reset.

---

## Request #22 — 2026-11-06

- **Technical Summary**: Extracted ship placement and styling listener logic from `home.js` into reusable `placeShip` module under `src/logic/`.
- **Modified Files**:
  - `src/logic/placeShip.js`: Created function `placeShip(player, board)` that listens to board cell clicks, places the selected ship on the player's gameboard, styles placed ship cells in `steelblue`, and shows an error dialog on illegal placements.
    - _Why_: Modularize ship placement and grid styling logic so it can be called from any module.
  - `src/ui/main/home.js`: Replaced inline cell click listener loop with `placeShip(player, boardGrid)`.
    - _Why_: Delegate ship placement logic to the extracted module.

### Plain English Summary

Extracted the board cell click handlers and ship placement logic into a reusable `placeShip` module in `src/logic/`, accepting the player and board grid, placing ships with error handling, and styling the placed cells. Updated `home.js` to call this module.

---

## Request #23 — 2026-11-06

- **Technical Summary**: Added virtual `.click()` trigger on the matching board grid cell button in `randomizeShips.js`.
- **Modified Files**:
  - `src/logic/randomizeShips.js`: Queried `.board-grid` and found the button matching `data-coordinates="[${col}, ${row}]"`, then invoked `.click()`.
    - _Why_: Trigger cell click behavior when placing ships during player board randomization.

### Plain English Summary

Updated `randomizeShips.js` to locate the player's board grid cell matching the randomized ship coordinates and trigger a click event on that element.

---

## Request #24 — 2026-11-06

- **Technical Summary**: Created `detectShips.js` in `src/logic/` with nested loops checking player board coordinates and coloring DOM grid cells.
- **Modified Files**:
  - `src/logic/detectShips.js`: Exported `detectShips(player, board)` function that loops through coordinates `(r, c)` of `player.Board` and sets `board.children[r * 10 + c].style.backgroundColor = "steelblue"` if a ship is present.
    - _Why_: Inspect the 2D gameboard array and update matching DOM grid cells to reflect ship positions.

### Plain English Summary

Created a new `detectShips` module in `src/logic/` that checks each coordinate of the player's board using nested loops and styles corresponding cells on the DOM grid in steel blue when a ship is detected.

---

## Request #25 — 2026-11-07

- **Technical Summary**: Extracted ship button toggling to a dedicated UI component, relocated `placeShip` and `resetShipSelection` from `src/logic/` to `src/ui/components/`, wired button disabling during randomization and re-enabling upon reset, and styled disabled ship buttons.
- **Modified Files**:
  - `src/ui/components/toggleShipButtons.js`: Created function `toggleShipButtons(disabled)` to enable or disable ship selection buttons.
    - _Why_: Provide a reusable UI module for toggling the enabled state of fleet selection buttons.
  - `src/logic/detectShips.js`: Removed button query and disabling logic from the board scan loop.
    - _Why_: Separate ship button UI manipulation from gameboard cell detection.
  - `src/ui/components/placeShip.js`: Moved from `src/logic/placeShip.js` and updated imports.
    - _Why_: Classify DOM event handling for ship placement under UI components.
  - `src/ui/components/resetShipSelection.js`: Moved from `src/logic/resetShipSelection.js` and updated imports.
    - _Why_: Classify DOM selection reset behavior under UI components.
  - `src/Classes/Gameboard.js`: Updated `resetShipSelection` import path, imported `toggleShipButtons`, and invoked `toggleShipButtons(false)` in `resetBoard()`.
    - _Why_: Re-enable ship selection buttons when clearing the board.
  - `src/ui/main/home.js`: Updated import paths for `placeShip`, imported `toggleShipButtons`, and called `toggleShipButtons(true)` inside the randomize button handler.
    - _Why_: Disable ship selection buttons when the player randomizes fleet placement.
  - `src/styles.css`: Added `:disabled` styling for `.actual-ships-grid button`.
    - _Why_: Provide visual feedback (reduced opacity, not-allowed cursor) when ship buttons are disabled.

### Plain English Summary

Extracted ship button disabling logic into a reusable `toggleShipButtons` UI component and relocated `placeShip` and `resetShipSelection` to `src/ui/components/`. Wired the buttons to disable during board randomization and re-enable when the board resets, with dedicated disabled styling in CSS.

---

## Request #26 — 2026-11-07

- **Technical Summary**: Added GitHub Actions workflow configuration for building and deploying to `gh-pages` on pull requests targeting `main`.
- **Modified Files**:
  - `.github/workflows/deploy.yml`: Configured workflow triggered by pull requests targeting `main` branch to install dependencies, execute `npm run build`, and deploy the `dist/` directory to `gh-pages` branch with clean/force push using `JamesIves/github-pages-deploy-action@v4`.
    - _Why_: Automate production builds and deployment to the GitHub Pages hosting branch on pull request creation/updates targeting `main`.

### Plain English Summary

Created a GitHub Actions workflow file that automatically runs the project build and pushes the compiled distribution files directly to the `gh-pages` branch whenever a pull request targeting `main` is opened or updated.

---

## Request #27 — 2026-11-09

- **Technical Summary**: Moved `placedShips` state to `gameState.js` with an increment helper, kept `sizes` in `randomizeShips.js`, and replaced `try/catch` with a direct conditional check on `placeShip`.
- **Modified Files**:
  - `src/logic/gameState.js`: Added `placedShips` variable and accessor/mutator functions (`getPlacedShips`, `incrementPlacedShips`, `resetPlacedShips`).
    - _Why_: Centralize ship placement counter state and provide controlled incremental mutation via a dedicated function.
  - `src/logic/randomizeShips.js`: Replaced local `placedShips` declaration with imports from `gameState.js`, kept `sizes = [2, 3, 3, 4, 5]`, removed `try/catch` in `boardPlaceShips` in favor of evaluating `placeShip(...)` directly, incrementing `placedShips` on success, and returning boolean status.
    - _Why_: Comply with requested state externalization and conditional placement flow.

### Plain English Summary

Moved the ship placement counter into `gameState.js` with increment and reset methods while retaining `sizes` locally in `randomizeShips.js`, and refactored random placement to check `placeShip` directly instead of catching errors.

---

## Request #28 — 2026-11-09

- **Technical Summary**: Replaced `try/catch` with boolean return checks for valid game outcomes across `Gameboard.js` and `placeShip.js`, reserving `throw` strictly for invalid parameter types/formats.
- **Modified Files**:
  - `src/Classes/Gameboard.js`:
    - In `placeShip`: Added parameter type/format checks to throw errors for lengths not between 2 and 5, coordinates not matching `[0-9, 0-9]`, and direction not equal to `"v"` or `"h"`. Changed ship limit reach (`>= 5`) and invalid position (`#validatePossibilities`) to return `false` instead of throwing.
    - In `receiveAttack`: Added parameter validation throwing for coordinates not matching `[0-9, 0-9]`, and changed attacking an already attacked position to return `false` instead of throwing.
    - _Why_: Align method contracts with standard practices by reserving exceptions for programming contract violations and using boolean statuses for normal game logic outcomes.
  - `src/ui/components/placeShip.js`: Replaced `try/catch` block wrapping `placeShip` with an `if/else` condition checking the boolean return value.
    - _Why_: Avoid exception-driven control flow in the UI event handler.

### Plain English Summary

Updated `Gameboard.js` so that `placeShip` and `receiveAttack` throw errors exclusively for malformed parameters (length, coordinates, direction) while returning `false` for game-rule violations like illegal positions, full fleets, or repeated attacks. Refactored the UI `placeShip` handler to use an `if/else` check instead of `try/catch`.

---

## Request #29 — 2026-11-09

- **Technical Summary**: Refactored `attackGrid.js` by extracting computer attack logic into separate modular files (`attackPlayerGrid.js` and `anchorShip.js`) and replaced `try/catch` with a boolean conditional check.
- **Modified Files**:
  - `src/logic/anchorShip.js`: Extracted ship tracking and targeted adjacent attack logic into a standalone function module.
    - _Why_: Separate concern of directional ship hunting from general board attack orchestration.
  - `src/logic/attackPlayerGrid.js`: Extracted `attackPlayerGrid(player)` into its own module, removed `try/catch` around `player.Gameboard.receiveAttack([randomX, randomY])` in favor of an `if` condition, and delegated locked ship attacks to `anchorShip(player)`.
    - _Why_: Modularize computer player attack loop and use direct boolean checks instead of exceptions for attack validation.
  - `src/logic/attackGrid.js`: Removed local `attackPlayerGrid` declaration and unused imports, importing `attackPlayerGrid` from its new module.
    - _Why_: Maintain single responsibility and lean module definition for `attackGrid`.

### Plain English Summary

Refactored `attackGrid.js` into separate modules by extracting `attackPlayerGrid` and `anchorShip` into their own files under `src/logic/`, and converted the random computer attack execution from a `try/catch` block into an `if` conditional check.

---

## Request #30 — 2026-11-09

- **Technical Summary**: Extracted DOM status updates and attack result rendering into dedicated UI components, separating UI updates from core attack logic.
- **Modified Files**:
  - `src/ui/components/changeStatus.js`: Created helper to update pointer events and turn status text based on turn parameter (`"c"` or `"p"`).
    - _Why_: Centralize turn status indicators and board interactivity toggles.
  - `src/ui/components/renderAttackResult.js`: Created UI module to query player cell button, update symbol (`"X"` or `"🔥"`), and lock ship anchor state.
    - _Why_: Decouple random computer attack logic from direct DOM cell manipulations.
  - `src/ui/components/renderComputerAttackResult.js`: Created UI module to update player cell button on targeted ship anchor attacks.
    - _Why_: Decouple anchor attack direction logic from direct DOM cell updates.
  - `src/logic/attackGrid.js`: Replaced direct status queries and pointer events assignment with `changeStatus("c")`.
    - _Why_: Delegate status presentation to UI module.
  - `src/logic/attackPlayerGrid.js`: Replaced DOM cell queries and status updates with `renderAttackResult` and `changeStatus("p")`.
    - _Why_: Isolate computer attack sequence from DOM queries.
  - `src/logic/anchorShip.js`: Replaced DOM cell queries and status updates with `renderComputerAttackResult` and `changeStatus("p")`.
    - _Why_: Isolate ship-targeting logic from DOM manipulation.

### Plain English Summary

Created `changeStatus`, `renderAttackResult`, and `renderComputerAttackResult` inside `src/ui/components/` to handle DOM updates for player and computer turns, and refactored `attackGrid.js`, `attackPlayerGrid.js`, and `anchorShip.js` to call these presentation modules instead of mutating DOM elements directly.

---

## Request #31 — 2026-11-10

- **Technical Summary**: Added water drop, explosion, and click sound effect assets and integrated audio playback into attack handling and UI dialog/button interactions.
- **Modified Files**:
  - `assets/water-drop.wav`: Added synthesized PCM audio asset for water drops.
    - _Why_: Audio feedback for attacks hitting empty water cells.
  - `assets/explosion.wav`: Added synthesized PCM audio asset for explosions.
    - _Why_: Audio feedback for attacks hitting ships.
  - `assets/click.wav`: Added synthesized PCM audio asset for button clicks.
    - _Why_: Audio feedback for UI button interactions.
  - `webpack.common.js`: Extended asset resource loader rule to match `.wav` and `.mp3` extensions.
    - _Why_: Allow Webpack to resolve and bundle imported audio assets.
  - `src/logic/attackGrid.js`: Added audio playback playing `waterDropSound` on miss and `explosionSound` on hit.
    - _Why_: Provide audio feedback on player attack actions.
  - `src/logic/attackPlayerGrid.js`: Added audio playback playing `waterDropSound` on computer miss and `explosionSound` on computer hit.
    - _Why_: Provide audio feedback on computer attack actions.
  - `src/ui/main/home.js`: Added `clickSound` playback to Axis, ship selection, Randomize, Reset, and Play button clicks.
    - _Why_: Provide interactive audio feedback for setup controls.
  - `src/ui/components/errorDialog.js`: Added `clickSound` playback to the "OK" button click.
    - _Why_: Provide interactive audio feedback when closing error dialogs.
  - `src/ui/components/overDialog.js`: Added `clickSound` playback to the "Close" and "X" button clicks.
    - _Why_: Provide interactive audio feedback when interacting with game over / leave dialogs.

### Plain English Summary

Created audio sound effect files for water drops, explosions, and button clicks in `assets/`, configured Webpack to bundle audio files as resource assets, and wired up sound playback across player and computer attack logic as well as UI buttons across the home screen and dialogs.

---

## Request #32 — 2026-11-10

- **Technical Summary**: Replaced synthesized sound assets with high-fidelity acoustic recordings from Wyzowl SFX Kit (CC0).
- **Modified Files**:
  - `assets/click.wav`: Replaced with `click-button-medium.wav` (tactile 48kHz PCM button click).
    - _Why_: Realistic UI button click response.
  - `assets/water-drop.wav`: Replaced with `props-splash.wav` (authentic water splash recording).
    - _Why_: Realistic water splash feedback for missed attacks.
  - `assets/explosion.wav`: Replaced with `impact-deep-hard.wav` (deep resonant impact/crack).
    - _Why_: Realistic impact/explosion feedback on hit ships.

### Plain English Summary

Replaced the synthesized audio files in `assets/` with professionally mastered, CC0 public-domain acoustic recordings for the click, splash, and explosion sound effects.

---

## Request #33 — 2026-11-11

- **Technical Summary**: Refactored `gameState.js` from top-level singleton state variables into dedicated factory functions (`createQueryState`, `createTargetingState`, `createShipPlacementState`) with internal closure state and instance reset capabilities; disposed of `gameStateReset.js`.
- **Modified Files**:
  - `src/logic/gameState.js`: Replaced module-level `let` variables with `createQueryState()`, `createTargetingState()`, and `createShipPlacementState()` factory functions encapsulating their respective domains in private closures, exposing instance methods and reset methods.
    - _Why_: Encapsulate isolated state, prevent cross-domain state pollution, and allow straightforward resets.
  - `src/logic/gameStateReset.js`: Deleted file.
    - _Why_: Redundant now that `targetingState.reset()` handles AI targeting state resetting directly.
  - `src/logic/anchorShip.js`: Replaced module-level state and anchor imports with `targetingState`, replacing `gameStateReset()` calls with `targetingState.reset()`.
    - _Why_: Interface directly with the encapsulated targeting state instance.
  - `src/logic/attackPlayerGrid.js`: Updated to read `targetingState.getState()`.
    - _Why_: Access AI ship lock state from the targeting state instance.
  - `src/ui/components/renderAttackResult.js`: Updated to mutate `targetingState` via `targetingState.updateState()`.
    - _Why_: Update AI target coordinates through encapsulated state methods.
  - `src/ui/main/home.js`: Replaced `updateShipDetails` with `shipPlacementState.updateShipDetails()`.
    - _Why_: Use encapsulated ship placement state instance for orientation and selection.
  - `src/ui/components/placeShip.js`: Replaced `getShipDetails` and `updateShipDetails` with `shipPlacementState` methods.
    - _Why_: Retrieve and clear selected ship data from ship placement instance.
  - `src/ui/components/resetShipSelection.js`: Replaced `updateShipDetails` with `shipPlacementState.updateShipDetails()`.
    - _Why_: Clear ship selection in the ship placement instance.
  - `src/logic/randomizeShips.js`: Replaced `getPlacedShips`, `incrementPlacedShips`, and `resetPlacedShips` imports with `shipPlacementState` methods.
    - _Why_: Track placed ship counts within the ship placement state instance.
  - `src/logic/gameController.js`: Replaced `updateQueries` with `queryState.updateQueries()`.
    - _Why_: Store DOM element references within the queries state instance.
  - `src/ui/components/changeStatus.js`: Replaced `getQueries` with `queryState.getQueries()`.
    - _Why_: Access cached DOM element references through the queries state instance.

### Plain English Summary

Refactored the game's shared state management in `gameState.js` into three isolated factory functions: one for DOM query caching, one for the computer AI's ship-hunting targeting state, and one for ship placement and orientation. Removed the standalone `gameStateReset.js` helper since each factory instance now encapsulates its own `.reset()` logic, and updated all importing UI and logic modules to interact with these dedicated state instances.

---

## Request #34 — 2026-11-11

- **Technical Summary**: Added clean-code doc comments and JSDoc annotations across model classes, state factories, game initiation logic, and UI components.
- **Modified Files**:
  - `src/Classes/Node.js`: Added class-level JSDoc explaining the responsibility of board grid cell nodes (ship occupancy and hit tracking).
    - _Why_: Clarify model semantics for individual grid slots.
  - `src/Classes/Player.js`: Added class-level JSDoc explaining player type, board model association, and DOM grid ownership.
    - _Why_: Document the relationship between model and DOM representation per participant.
  - `src/Classes/Ship.js`: Added class-level JSDoc describing length, health, hit tracking, and sink evaluation.
    - _Why_: Document ship domain rules cleanly.
  - `src/logic/gameState.js`: Added doc comments to `defaultAnchorPositions`, `createQueryState`, `createTargetingState`, and `createShipPlacementState`.
    - _Why_: Document purpose, scope, and isolated concerns for each state factory.
  - `src/logic/gameInitiator.js`: Added JSDoc explaining the transition from ship placement setup to active battle view.
    - _Why_: Document high-level lifecycle transition.
  - `src/logic/attackGrid.js`: Added JSDoc for attack handling and explanatory comment on the computer attack delay timing.
    - _Why_: Explain player-to-computer turn transition logic.
  - `src/ui/components/renderComputerAttackResult.js`: Added function-level doc comment explaining DOM visual feedback on computer moves.
    - _Why_: Document UI rendering behavior.

### Plain English Summary

Reviewed codebase documentation against clean-code best practices and added concise JSDoc and context comments across core classes (`Node`, `Player`, `Ship`), state factory functions, attack flow routines, and UI renderers to clarify intent without cluttering code with redundant line-by-line noise.

---

## Request #35 — 2026-11-11

- **Technical Summary**: Replaced template `README.md` with comprehensive documentation covering project scope, tech stack, directory structure, and development methodology.
- **Modified Files**:
  - `README.md`: Documented project context (The Odin Project Full Stack JavaScript course final project), feature overview, tech stack, directory hierarchy tree, and AI assistance disclosure.
    - _Why_: Provide factual, production-ready repository documentation before creating the final pull request.

### Plain English Summary

Updated `README.md` to document the project as The Odin Project's JavaScript course final project, outlining the game's mechanics, technology stack, directory structure, and an honest note regarding the use of AI for typing and code generation assistance under direct user architectural guidance.
