---
'harmonium': patch
---

Build Field and the form controls on Base UI, so their labelling, descriptions and error wiring now match the docs.

- **Field**: `aria-describedby` now lists only the `FieldDescription` and `FieldError` that are actually rendered, so errors are announced through it, not only through `aria-errormessage`. Every control is wired: Input, Textarea, Select, DatePicker, TimePicker, NumberInput, Checkbox, Switch, Slider and RadioGroup. `<FieldError>{errors.x}</FieldError>` renders nothing while it's empty. A new optional `match` prop on `FieldError` shows the browser's validation message instead. `useFieldContext` is now exported (with `fieldId`, `error`, `labelId` and `describedBy`) for building your own Field-aware controls.
- **Checkbox, Switch, Radio**: built on Base UI. The visible box or track is now the `role="checkbox"`/`"switch"`/`"radio"` element, with `data-checked`/`data-disabled`. A hidden native input still submits `name`/`value`, and `ref`/`onChange` still refer to it. `style` now lands on the visible wrapper `<label>`, like `className`.
- **RadioGroup**: a `<fieldset role="radiogroup">` with arrow-key selection and one tab stop. Radios still read `name`/`checked`/`defaultChecked` from each `Radio`. New optional `name`, `value`, `defaultValue` and `onValueChange` props on the group. A `Radio` outside a group renders a native radio, as before.
- **NumberInput**: built on Base UI's NumberField. Typing is no longer clamped on every keystroke: out-of-range values are clamped on blur or Enter. Clearing the input no longer emits `0`. Stepping by `0.1` gives `0.3`, not `0.30000000000000004`. `disabled` and `readOnly` now reach the stepper buttons. New optional `decrementLabel` and `incrementLabel` props.
- **Slider**: built on Base UI's Slider. The uncontrolled value and the `showValue` label now start at the midpoint of `min`/`max` (it showed `50` even when the thumb sat elsewhere). The value is rendered in an `<output>`. `onChange` still receives an event whose `target.value` is the new value.
- **Select**: the `placeholder` now shows in uncontrolled use.
- **CSS**: new `hm-slider-control`, `hm-slider-track` and `hm-slider-thumb` classes. Checkbox, Radio and Switch rules also match Base UI's `data-checked`/`data-disabled`. Plain-HTML markup with native inputs (`hm-checkbox-input` + `hm-checkbox-indicator`, `hm-slider-input`, ...) is styled as before.
