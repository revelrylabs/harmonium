---
'harmonium': patch
---

Consumer props add to a component's own behaviour instead of replacing it.

- **Handlers**: an `onClick`, `onKeyDown`, `onFocus`, ... you pass runs alongside the component's own handler, not instead of it. Yours runs first. Call `event.preventBaseUIHandler()` in it to skip the component's handling (for example, a `TabsTrigger` that shouldn't activate, or Enter in a `NumberInput` that shouldn't clamp). `FileUpload` also skips opening the file picker when `onClick`/`onKeyDown` calls `event.preventDefault()`.
- **`aria-describedby`** on a Field-wired control (Input, Textarea, Select, DatePicker, TimePicker, NumberInput, Checkbox, Switch, Slider) is merged with the Field's description and error ids, and on a `Tooltip` trigger with the tooltip's id.
- **`id`**: the Field gives its control an id unless you pass one; then `FieldLabel` points at your id. `FieldLabel`, `FieldDescription` and `FieldError` can take their own `id` too: the control's `aria-describedby` and `aria-errormessage`, and `useFieldContext()` (`labelId`, `descriptionId`, `errorId`, `describedBy`), now follow it instead of pointing at an id that isn't rendered.
- **`NumberInput`**: a consumer `onKeyDown` now runs before the Enter commit, so it can cancel it.
- Added tests for consumer handlers, ids and `aria-describedby` across Dialog, Drawer, CommandPalette, Tabs, Accordion, ToggleGroup, Tooltip, Popover, Menu, FileUpload and the Field-wired controls.
