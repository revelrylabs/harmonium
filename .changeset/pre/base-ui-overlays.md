---
'harmonium': patch
---

Build Dialog, Drawer, Popover, Tooltip, Menu and CommandPalette on Base UI, so their accessibility behaviour now matches the docs.

- **Dialog, Drawer, CommandPalette**: render in a portal on `document.body`, move focus inside on open, trap Tab, and return focus to the previously focused element on close. Escape closes only the topmost overlay, scroll lock is shared between stacked overlays, and dragging a text selection onto the backdrop no longer closes the dialog. `DialogHeader` now labels the dialog (`aria-labelledby`), in a Drawer too. A consumer `onClick` on the dialog no longer turns every inside click into a close. Drawer now uses the modal z-index, so a Drawer opened from a Dialog appears above it.
- **Popover**: the child (for example `<Button>`) is now the trigger, with `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`. The extra `div role="button"` and its second tab stop are gone. The popup is portalled, flips when there's no room, closes on Escape or an outside click, and returns focus to the trigger.
- **Tooltip**: `aria-describedby` now goes on the focusable child, not on the wrapper, and keeps any description the child already has. The tooltip stays open while the trigger has keyboard focus, closes on Escape, and is portalled and collision-aware. New optional `delay` prop (default `0`) sets the hover delay.
- **Menu**: an inline menu now has one tab stop, with Arrow keys, Home/End and typeahead (disabled items are skipped). The new optional `trigger` prop (with `side`, `open` and `onOpenChange`) turns the menu into a Base UI dropdown menu.
- **CSS**: popups positioned by Base UI get new `positioner` classes (`hm-popover-positioner`, `hm-tooltip-positioner`, `hm-menu-positioner`), and menu items also style Base UI's `data-highlighted` and `data-disabled`. In plain HTML, the CSS-only positioning of `hm-popover-content` and `hm-tooltip-content` still works when the content sits inside `hm-popover` or `hm-tooltip`.
