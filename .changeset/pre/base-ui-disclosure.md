---
'harmonium': patch
---

Rebuild `Tabs`, `Accordion`, `ToggleGroup` and `Toast` on Base UI primitives. Props, class names and `data-state` / `data-variant` / `data-size` / `data-position` attributes are unchanged; Base UI's own state attributes (`data-active`, `data-panel-open`, `data-pressed`, `data-starting-style`, ...) are also styled.

- **Tabs**: arrow keys, Home and End move between tabs with a roving tabindex; Enter/Space activates. Tabs and panels are linked with `aria-controls` / `aria-labelledby`, and panels are focusable. Without `defaultValue` the first enabled tab is now selected (previously no tab was). A consumer `onClick` on `TabsTrigger` no longer stops the tab from activating.
- **Accordion**: each trigger is wrapped in an `<h3>` heading (new `.header` class, `hm-accordion-header`), and opens a `region` labelled by its trigger with `aria-controls` wiring. `onValueChange` still fires once per click.
- **ToggleGroup**: one tab stop; arrow keys, Home and End move focus between items, Enter/Space selects. Pressing the selected item keeps it selected. **Semantics changed** from `radiogroup`/`radio` + `aria-checked` to a `group` of toggle buttons with `aria-pressed`; update tests that query `getByRole('radio')`.
- **Toast**: the provider now renders a persistent `aria-live` "Notifications" region and toasts are added into it, so screen readers announce them; `error` toasts are announced with `role="alert"`. Auto-dismiss pauses on hover, keyboard focus (F6 jumps to the toasts) and while the window is in the background. Toasts can be swiped away, fade in/out, and respect `prefers-reduced-motion`. Individual toasts are no longer `role="status"` elements (they are non-modal `dialog`s labelled by their message).
- `prefers-reduced-motion` now disables the transitions in all four components.
