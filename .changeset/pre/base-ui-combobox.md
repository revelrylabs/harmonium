---
'harmonium': patch
---

Rebuild `Combobox` and `MultiSelect` on Base UI's Combobox primitive.

- Both now follow the ARIA combobox pattern: `aria-expanded`, `aria-controls`, `aria-activedescendant` with option ids, Arrow keys/Enter/Escape, and the highlighted option scrolls into view. MultiSelect's listbox is `aria-multiselectable`, and its tags remain removable with "Remove <label>" buttons or Backspace.
- Both work uncontrolled: pass `defaultValue` (`string` / `string[]`) instead of `value`. Previously `defaultValue` type-checked but was ignored, and a selection without `value` showed nothing.
- Focusing Combobox no longer wipes the visible selection. Clearing its text clears the selection and calls `onChange('')`.
- Removed the blur `setTimeout`s, so tabbing out and back in quickly no longer closes the list you just reopened, and no timer fires after unmount.
- The MultiSelect text input now has `role="combobox"` (it was a plain textbox).
- New CSS classes for the React popup wrapper (`positioner`, `popup`; `hm-combobox-positioner`, `hm-multi-select-positioner` in `harmonium.css`). Existing classes and selectors are unchanged, and options also accept Base UI's `data-selected` state.
