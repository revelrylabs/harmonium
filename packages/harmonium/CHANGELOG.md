# harmonium

## 9.0.0-alpha.3

### Patch Changes

- 2481dd4: Accessibility and correctness fixes for display components, `FileUpload` and `CommandPalette`.
  
  - **Avatar**: the fallback now has `role="img"`, so its `aria-label` (from `alt`, else `fallback`) is announced. A fallback with no text is `aria-hidden`.
  - **Alert**: `info` and `success` alerts use `role="status"` (polite). Only `warning` and `error` use `role="alert"`. A `role` prop still overrides it.
  - **Tag**: each remove button is named "Remove <label>" (via `aria-labelledby`), not just "Remove".
  - **Progress**: `max={0}` (or any non-positive `max`) renders an empty bar instead of `NaN%`. `aria-valuenow` is clamped to `0..max`. With `showLabel`, the `.label` span is now rendered after the progressbar element instead of inside `.bar`, so it stays legible at low values. It is `aria-hidden`, since the progressbar already exposes the value.
  - **Toast**: `duration: Infinity` (or any non-finite duration) keeps the toast open. It used to dismiss immediately.
  - **FileUpload**: the input is reset after each selection, so picking the same file again fires `onChange`. Dropped files are now checked against `accept` and `multiple` as well as `maxSize`. `maxSize={0}` is enforced, and the new `onReject(files)` receives the files that were left out. Consumer handlers (`onClick`, `onKeyDown`, `onDrop`, the drag events) now run alongside the internal ones instead of replacing them. Calling `preventDefault()` in `onClick` or `onKeyDown` skips opening the picker. The drag highlight no longer flickers over child elements. A disabled dropzone sets `aria-disabled`, and the hidden file input has the `hidden` attribute.
  - **CommandPalette**: the input follows the combobox pattern, with `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant` pointing at option ids and `aria-autocomplete="list"`. The placeholder is used as its accessible name. The highlighted option scrolls into view, and grouped options are wrapped in labelled `role="group"` elements. "No results" moved out of the listbox into a `role="status"` region. The input used to have the `textbox` role.
- 019adb4: Accessibility and correctness fixes for navigation, data and layout components.
  
  - **Sidebar**: the `active` item gets `aria-current="page"`. `SidebarItem` renders a real link with `href`, or any element (e.g. a router link) with `render={<Link to="/x" />}`; its props now extend `ButtonHTMLAttributes`, so `disabled` and `type` type-check (a disabled link gets `aria-disabled` and no `href`; a disabled `render` link also leaves the tab order and cancels clicks and Enter, so router links don't navigate). In a `collapsed` sidebar each item is named from its label (`aria-label` and `title`), since the label is hidden; the label stays in the accessibility tree (visually hidden instead of `display: none`). Link items keep the text color and lose the underline, including when visited, and disabled items are dimmed. Item icons are `aria-hidden`, and a `SidebarSection` with a `label` is a named `group`.
  - **Stepper**: the active step has `aria-current="step"`, completed steps announce "Completed" (customisable with `completedLabel` on `Stepper` or `Step`) instead of an unlabelled check mark, and connectors are `aria-hidden`.
  - **Breadcrumbs**: an `active` `BreadcrumbItem` forwards its `ref` and props (`id`, `onClick`, `data-*`, ...) to the `<span>`, dropping only link attributes such as `href`.
  - **Pagination**: `maxVisible` is now the maximum number of page buttons, including the first and last pages (it used to render up to `maxVisible + 2` buttons plus ellipses). A `page` outside `1..totalPages` is clamped, so Previous/Next never step past either end. Ellipses are `aria-hidden`.
  - **DataGrid**: sorts `data` itself when `sort` is not passed (uncontrolled), by `row[key]` or a new column `sortValue(row)`, with `defaultSort` for the initial state; empty values sort last. Controlled `sort` is unchanged: you still sort `data` in `onSortChange`. `aria-label`, `aria-labelledby` and `aria-describedby` now name/describe the `<table>`, and a new `tableProps` prop passes anything else to it. When the grid overflows, its scroll container becomes keyboard focusable, with a visible focus outline, and a region named like the table.
  - **Table**: with `responsive`, an overflowing scroll container is keyboard focusable, with a visible focus outline, and a region named after the table when it has `aria-label`/`aria-labelledby`.
  - **Text**: accepts `htmlFor` for `as="label"`.
  - **PricingCardFeature**: excluded features announce "Not included:" (customisable with `excludedLabel`), since the cross mark is decorative.
  - **harmonium_ex**: `hm_stepper_step` matches the React Stepper (`aria-current="step"`, "Completed" text, customisable with `completed_label`) and `hm_stepper_connector` is `aria-hidden`.
  - Added axe checks for Sidebar, Stepper, Breadcrumbs, Pagination, AppShell, Table, DataGrid, TopBar, PricingTable, Text/Heading, Container, Grid, Stack, Group, Separator and Show.
- e81babe: Rebuild `Combobox` and `MultiSelect` on Base UI's Combobox primitive.
  
  - Both now follow the ARIA combobox pattern: `aria-expanded`, `aria-controls`, `aria-activedescendant` with option ids, Arrow keys/Enter/Escape, and the highlighted option scrolls into view. MultiSelect's listbox is `aria-multiselectable`, and its tags remain removable with "Remove <label>" buttons or Backspace.
  - Both work uncontrolled: pass `defaultValue` (`string` / `string[]`) instead of `value`. Previously `defaultValue` type-checked but was ignored, and a selection without `value` showed nothing.
  - Focusing Combobox no longer wipes the visible selection. Clearing its text clears the selection and calls `onChange('')`.
  - Removed the blur `setTimeout`s, so tabbing out and back in quickly no longer closes the list you just reopened, and no timer fires after unmount.
  - The MultiSelect text input now has `role="combobox"` (it was a plain textbox).
  - New CSS classes for the React popup wrapper (`positioner`, `popup`; `hm-combobox-positioner`, `hm-multi-select-positioner` in `harmonium.css`). Existing classes and selectors are unchanged, and options also accept Base UI's `data-selected` state.
- d2bbd7f: Rebuild `Tabs`, `Accordion`, `ToggleGroup` and `Toast` on Base UI primitives. Props, class names and `data-state` / `data-variant` / `data-size` / `data-position` attributes are unchanged; Base UI's own state attributes (`data-active`, `data-panel-open`, `data-pressed`, `data-starting-style`, ...) are also styled.
  
  - **Tabs**: arrow keys, Home and End move between tabs with a roving tabindex; Enter/Space activates. Tabs and panels are linked with `aria-controls` / `aria-labelledby`, and panels are focusable. Without `defaultValue` the first enabled tab is now selected (previously no tab was). A consumer `onClick` on `TabsTrigger` no longer stops the tab from activating.
  - **Accordion**: each trigger is wrapped in an `<h3>` heading (new `.header` class, `hm-accordion-header`), and opens a `region` labelled by its trigger with `aria-controls` wiring. `onValueChange` still fires once per click.
  - **ToggleGroup**: one tab stop; arrow keys, Home and End move focus between items, Enter/Space selects. Pressing the selected item keeps it selected. **Semantics changed** from `radiogroup`/`radio` + `aria-checked` to a `group` of toggle buttons with `aria-pressed`; update tests that query `getByRole('radio')`.
  - **Toast**: the provider now renders a persistent `aria-live` "Notifications" region and toasts are added into it, so screen readers announce them; `error` toasts are announced with `role="alert"`. Auto-dismiss pauses on hover, keyboard focus (F6 jumps to the toasts) and while the window is in the background. Toasts can be swiped away, fade in/out, and respect `prefers-reduced-motion`. Individual toasts are no longer `role="status"` elements (they are non-modal `dialog`s labelled by their message).
  - `prefers-reduced-motion` now disables the transitions in all four components.
- d567cbf: Build Field and the form controls on Base UI, so their labelling, descriptions and error wiring now match the docs.
  
  - **Field**: `aria-describedby` now lists only the `FieldDescription` and `FieldError` that are actually rendered, so errors are announced through it, not only through `aria-errormessage`. Every control is wired: Input, Textarea, Select, DatePicker, TimePicker, NumberInput, Checkbox, Switch, Slider and RadioGroup. `<FieldError>{errors.x}</FieldError>` renders nothing while it's empty. A new optional `match` prop on `FieldError` shows the browser's validation message instead. `useFieldContext` is now exported (with `fieldId`, `error`, `labelId` and `describedBy`) for building your own Field-aware controls.
  - **Checkbox, Switch, Radio**: built on Base UI. The visible box or track is now the `role="checkbox"`/`"switch"`/`"radio"` element, with `data-checked`/`data-disabled`. A hidden native input still submits `name`/`value`, and `ref`/`onChange` still refer to it. `style` now lands on the visible wrapper `<label>`, like `className`.
  - **RadioGroup**: a `<fieldset role="radiogroup">` with arrow-key selection and one tab stop. Radios still read `name`/`checked`/`defaultChecked` from each `Radio`. New optional `name`, `value`, `defaultValue` and `onValueChange` props on the group. A `Radio` outside a group renders a native radio, as before.
  - **NumberInput**: built on Base UI's NumberField. Typing is no longer clamped on every keystroke: out-of-range values are clamped on blur or Enter. Clearing the input no longer emits `0`. Stepping by `0.1` gives `0.3`, not `0.30000000000000004`. `disabled` and `readOnly` now reach the stepper buttons. New optional `decrementLabel` and `incrementLabel` props.
  - **Slider**: built on Base UI's Slider. The uncontrolled value and the `showValue` label now start at the midpoint of `min`/`max` (it showed `50` even when the thumb sat elsewhere). The value is rendered in an `<output>`. `onChange` still receives an event whose `target.value` is the new value.
  - **Select**: the `placeholder` now shows in uncontrolled use.
  - **CSS**: new `hm-slider-control`, `hm-slider-track` and `hm-slider-thumb` classes. Checkbox, Radio and Switch rules also match Base UI's `data-checked`/`data-disabled`. Plain-HTML markup with native inputs (`hm-checkbox-input` + `hm-checkbox-indicator`, `hm-slider-input`, ...) is styled as before.
- abd534b: Build Dialog, Drawer, Popover, Tooltip, Menu and CommandPalette on Base UI, so their accessibility behaviour now matches the docs.
  
  - **Dialog, Drawer, CommandPalette**: render in a portal on `document.body`, move focus inside on open, trap Tab, and return focus to the previously focused element on close. Escape closes only the topmost overlay, scroll lock is shared between stacked overlays, and dragging a text selection onto the backdrop no longer closes the dialog. `DialogHeader` now labels the dialog (`aria-labelledby`), in a Drawer too. A consumer `onClick` on the dialog no longer turns every inside click into a close. Drawer now uses the modal z-index, so a Drawer opened from a Dialog appears above it.
  - **Popover**: the child (for example `<Button>`) is now the trigger, with `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`. The extra `div role="button"` and its second tab stop are gone. The popup is portalled, flips when there's no room, closes on Escape or an outside click, and returns focus to the trigger.
  - **Tooltip**: `aria-describedby` now goes on the focusable child, not on the wrapper, and keeps any description the child already has. The tooltip stays open while the trigger has keyboard focus, closes on Escape, and is portalled and collision-aware. New optional `delay` prop (default `0`) sets the hover delay.
  - **Menu**: an inline menu now has one tab stop, with Arrow keys, Home/End and typeahead (disabled items are skipped). The new optional `trigger` prop (with `side`, `open` and `onOpenChange`) turns the menu into a Base UI dropdown menu.
  - **CSS**: popups positioned by Base UI get new `positioner` classes (`hm-popover-positioner`, `hm-tooltip-positioner`, `hm-menu-positioner`), and menu items also style Base UI's `data-highlighted` and `data-disabled`. In plain HTML, the CSS-only positioning of `hm-popover-content` and `hm-tooltip-content` still works when the content sits inside `hm-popover` or `hm-tooltip`.
- 76e9851: Replace the deprecated `@base-ui-components/react` release candidate with `@base-ui/react` 1.8, the package's stable name, ahead of moving components onto Base UI primitives.
- de71d6c: Smaller app bundles and cleaner packaging:
  
  - Each component is now its own module in `dist/`, so `import {Button} from 'harmonium'` pulls in only Button (about 0.5 KB gzipped, was about 124 KB with all of Base UI). Components defined in the same file drop out too: `import {Heading}` no longer brings in `Text`, and `import {TableRow}` no longer brings in the other Table parts.
  - Each component also has its own entry point, named in kebab-case: `import {Button} from 'harmonium/button'`, `import {ToggleGroup} from 'harmonium/toggle-group'`. These resolve for TypeScript's older `node10` module resolution too. `harmonium/package.json` is exported. You still import `harmonium/styles.css` once.
  - Generated CSS Module class names are now prefixed (`Button_root` is now `hm_Button_root`), so they can't collide with an app's own CSS Modules. They were never a public API; the `data-*` attributes and the global `hm-*` classes in `harmonium.css` are unchanged.
  - The build-only `scripts/` folder is no longer published.
- b304805: Dark-mode-ready color tokens, contrast, reduced motion and forced-colors focus rings.
  
  - New semantic color tokens: `--harmonium-color-surface-raised`, `-surface-muted`, `-surface-hover`, `-surface-active`, `-surface-neutral`, `-surface-strong`, `-surface-inverse`, `-text-placeholder` and `-text-inverse`. Light values match the previous look. Component CSS now uses only these semantic tokens (never `--harmonium-color-gray-*`), so the README's `[data-theme="dark"]` block themes every component; that block now lists a complete, AA-checked dark set.
  - `--harmonium-color-text-muted` darkened from `#818181` (3.9:1 on white) to `#636363` (6.0:1 on white, 4.8:1 on the neutral fill). Placeholders use the new `--harmonium-color-text-placeholder` (`#767676`, 4.5:1). Avatar initials now use the muted text on the neutral fill.
  - Every transition and animation respects `prefers-reduced-motion: reduce` (Skeleton stops pulsing, Spinner slows down).
  - Focus rings on Input, Select, Textarea, DatePicker, TimePicker, Combobox, MultiSelect, NumberInput and CommandPalette add a transparent outline, so Windows forced-colors mode still shows focus.
  - `@keyframes` are namespaced: `hm-spinner-spin` and `hm-skeleton-pulse` (previously the generic `spin` / `pulse` in `harmonium.css`).
  - Select: the size padding no longer overrides the chevron's right padding, and the placeholder option shows in the placeholder color.
  - AppShell: `sidebarCollapsed` now narrows the sidebar column to 60px, and the mobile layout switches below 768px instead of overlapping the `min-width: 768px` breakpoint.
  - Drawer is capped at `max-width: 100vw`; PricingTable columns wrap onto more rows on narrow screens instead of overflowing.
  - Progress label styled as text below the bar; CommandPalette's empty list has no padding; FileUpload styles `aria-disabled="true"` as disabled.

## 9.0.0-alpha.2

### Patch Changes

- 3997fd4: - `harmonium/styles.css` now includes the design tokens. Before, importing it alone (as the docs say) rendered components mostly unstyled.
  - Every JS file in the package starts with `'use client'`, so Harmonium can be imported from React Server Components (e.g. the Next.js App Router).
  - New `harmonium/styles.layer.css`: the same CSS inside `@layer harmonium`, for apps whose own CSS (e.g. a `className`) must always override Harmonium's variant styles.
  - CommandPalette: arrow keys and Enter follow the on-screen order when groups are interleaved.
  - Accordion: `onValueChange` fires once per click under React StrictMode.

## 9.0.0-alpha.1

### Major Changes

- 002ceaa: Harmonium 9 is a ground-up rewrite: TypeScript, CSS Modules with design tokens, and Base UI primitives. Every component has a new API. See MIGRATION.md for upgrading from v8.
