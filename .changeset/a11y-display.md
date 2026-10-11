---
'harmonium': patch
---

Accessibility and correctness fixes for display components, `FileUpload` and `CommandPalette`.

- **Avatar**: the fallback now has `role="img"`, so its `aria-label` (from `alt`, else `fallback`) is announced. A fallback with no text is `aria-hidden`.
- **Alert**: `info` and `success` alerts use `role="status"` (polite). Only `warning` and `error` use `role="alert"`. A `role` prop still overrides it.
- **Tag**: each remove button is named "Remove <label>" (via `aria-labelledby`), not just "Remove".
- **Progress**: `max={0}` (or any non-positive `max`) renders an empty bar instead of `NaN%`. `aria-valuenow` is clamped to `0..max`. With `showLabel`, the `.label` span is now rendered after the progressbar element instead of inside `.bar`, so it stays legible at low values. It is `aria-hidden`, since the progressbar already exposes the value.
- **Toast**: `duration: Infinity` (or any non-finite duration) keeps the toast open. It used to dismiss immediately.
- **FileUpload**: the input is reset after each selection, so picking the same file again fires `onChange`. Dropped files are now checked against `accept` and `multiple` as well as `maxSize`. `maxSize={0}` is enforced, and the new `onReject(files)` receives the files that were left out. Consumer handlers (`onClick`, `onKeyDown`, `onDrop`, the drag events) now run alongside the internal ones instead of replacing them. Calling `preventDefault()` in `onClick` or `onKeyDown` skips opening the picker. The drag highlight no longer flickers over child elements. A disabled dropzone sets `aria-disabled`, and the hidden file input has the `hidden` attribute.
- **CommandPalette**: the input follows the combobox pattern, with `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant` pointing at option ids and `aria-autocomplete="list"`. The placeholder is used as its accessible name. The highlighted option scrolls into view, and grouped options are wrapped in labelled `role="group"` elements. "No results" moved out of the listbox into a `role="status"` region. The input used to have the `textbox` role.
