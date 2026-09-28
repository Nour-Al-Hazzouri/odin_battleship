# Ship SVG Usage Guide

## Files

| File                 | Ship Name        | Size | Segments                                      |
| -------------------- | ---------------- | ---- | --------------------------------------------- |
| [`ship-2.svg`]       | Patrol Boat      | 2    | `seg-0` (stern), `seg-1` (bow)                |
| [`ship-3.svg`]       | Submarine        | 3    | `seg-0` (stern), `seg-1` (mid), `seg-2` (bow) |
| [`ship-cruiser.svg`] | Cruiser          | 3    | `seg-0` (stern), `seg-1` (mid), `seg-2` (bow) |
| [`ship-4.svg`]       | Destroyer        | 4    | `seg-0`–`seg-3`                               |
| [`ship-5.svg`]       | Aircraft Carrier | 5    | `seg-0`–`seg-4`                               |

---

## Segment Index Mapping

Every `<g>` segment has:

- **`id="seg-N"`** — zero-indexed, stern → bow
- **`data-index="N"`** — same value, accessible via `el.dataset.index`
- **`class="segment"`** — base class; state classes are added on top of this

```
seg-0   seg-1   seg-2   ...   seg-(size-1)
[stern] [mid]   [mid]   ...   [bow]
  ←— rear                       front —→
```

---

## Marking a Hit

Add the class `"hit"` to the `<g>` segment that was struck. The embedded CSS handles the rest automatically.

**What triggers:**

- Fill → red (`#c0392b`) + glow
- White X marker becomes visible (`.hit-marker` switches `display: none` → `display: block`)

**Selector to reach a segment:**

```js
svgEl.querySelector("#seg-2"); // by ID
svgEl.querySelector('[data-index="2"]'); // by data attribute
```

**Adding/removing the state:**

```js
segEl.classList.add("hit");
segEl.classList.remove("hit");
segEl.classList.contains("hit"); // check if already hit
```

> [!IMPORTANT]
> SVGs loaded via `<img>` have no accessible DOM — class manipulation won't work.
> Use **inline SVG** (fetched and injected as `innerHTML`) or an **`<object>` tag** instead.
> With `<object>`, the SVG document is at `objectEl.contentDocument`.

---

## Orientation: Horizontal ↔ Vertical

All SVGs default to **horizontal** (bow pointing right).

**Toggle:** add/remove the class `"vertical"` on the `<svg>` root.

The embedded CSS does this:

```css
.ship.vertical {
  transform: rotate(90deg);
  transform-origin: 20px 20px; /* anchored at stern center */
}
```

**Also required:** swap the `width` and `height` attributes on the SVG element itself so its bounding box matches the new orientation.

Each cell is **40px**. Natural dimensions:

| File                              | Horizontal (W×H) | Vertical (W×H) |
| --------------------------------- | ---------------- | -------------- |
| `ship-2.svg`                      | `80 × 40`        | `40 × 80`      |
| `ship-3.svg` / `ship-cruiser.svg` | `120 × 40`       | `40 × 120`     |
| `ship-4.svg`                      | `160 × 40`       | `40 × 160`     |
| `ship-5.svg`                      | `200 × 40`       | `40 × 200`     |

Relevant API:

```js
svgEl.classList.toggle("vertical");
svgEl.getAttribute("width");
svgEl.setAttribute("width", value);
svgEl.getAttribute("data-size"); // number of cells (e.g. "4")
```

---

## Loading Inline (Recommended)

To get a live SVG DOM you can manipulate, fetch the file and inject it:

```js
fetch("/assets/ship-4.svg")
  .then((r) => r.text())
  .then((text) => {
    container.innerHTML = text;
  });
```

Then `container.querySelector('svg')` gives you the root element.

---

## CSS Class Reference

| Class               | On element  | Effect                          |
| ------------------- | ----------- | ------------------------------- |
| `ship`              | `<svg>`     | Required base class             |
| `ship-2` … `ship-5` | `<svg>`     | Identifies ship type            |
| `vertical`          | `<svg>`     | Rotates 90° CW                  |
| `segment`           | `<g>`       | Required base class per section |
| `hit`               | `<g>`       | Red fill + glow + white X       |
| `seg-body`          | inner shape | Mid-body fill target            |
| `seg-bow`           | inner shape | Front-cap fill target           |
| `seg-stern`         | inner shape | Rear-cap fill target            |
| `hit-marker`        | inner `<g>` | White X, hidden by default      |
