# Harmonium

CSS design system for Phoenix and LiveView. Design tokens, layout primitives,
and component styles — zero JavaScript required.

This is the Elixir/Hex companion to the [Harmonium npm package](https://www.npmjs.com/package/harmonium).
Same design tokens, same CSS classes, same `data-*` attribute conventions.

## Installation

Add to your `mix.exs`:

```elixir
def deps do
  [
    {:harmonium, "~> 2.0"}
  ]
end
```

Then import the CSS. Pick one approach:

### Option A: CSS import (recommended)

In `assets/css/app.css`:

```css
@import "../../deps/harmonium/priv/static/harmonium.css";
```

### Option B: Static plug

In your endpoint:

```elixir
plug Plug.Static,
  at: "/vendor",
  from: {:harmonium, "priv/static"},
  gzip: true
```

Then in your root layout:

```html
<link rel="stylesheet" href="/vendor/harmonium.css" />
```

## Usage

Use `.hm-*` CSS classes with `data-*` attributes in HEEX templates:

```heex
<button class="hm-button" data-variant="primary" data-size="md">
  Save changes
</button>

<div class="hm-card" data-variant="elevated">
  <div class="hm-card-header">
    <h3>Settings</h3>
  </div>
  <div class="hm-card-body">
    <div class="hm-stack" data-gap="md">
      <div class="hm-field">
        <label class="hm-field-label">Name</label>
        <input class="hm-input" type="text" />
      </div>
      <button class="hm-button" data-variant="primary">Save</button>
    </div>
  </div>
</div>
```

### Optional: Phoenix Components

If you have `phoenix_live_view` installed, you can use the provided function components:

```elixir
use Harmonium.Components
```

```heex
<.hm_button variant="primary">Save</.hm_button>
<.hm_card variant="elevated">
  <div class="hm-card-body">Content</div>
</.hm_card>
<.hm_stack gap="md">
  <.hm_field>
    <.hm_field_label>Email</.hm_field_label>
    <.hm_input type="email" placeholder="you@example.com" />
  </.hm_field>
</.hm_stack>
```

## Theming

Override CSS custom properties:

```css
:root {
  --harmonium-color-brand-primary: #E91E63;
  --harmonium-radius-md: 8px;
  --harmonium-font-family-sans: 'Inter', sans-serif;
}
```

## Class Reference

| Component | CSS Class | Data Attributes |
|-----------|-----------|-----------------|
| Button | `.hm-button` | `data-variant`, `data-size`, `data-expanded` |
| Card | `.hm-card` | `data-variant`, `data-padding` |
| CardHeader | `.hm-card-header` | — |
| CardBody | `.hm-card-body` | — |
| CardFooter | `.hm-card-footer` | — |
| Stack | `.hm-stack` | `data-direction`, `data-gap`, `data-align`, `data-justify`, `data-wrap` |
| Group | `.hm-group` | `data-gap`, `data-align`, `data-justify`, `data-wrap`, `data-grow` |
| Grid | `.hm-grid` | `data-gap`, `data-align` + `--grid-columns` CSS var |
| GridCol | `.hm-grid-col` | `--col-span` CSS var |
| Input | `.hm-input` | `data-size` |
| Textarea | `.hm-textarea` | — |
| Select | `.hm-select` | `data-size` |
| Badge | `.hm-badge` | `data-variant`, `data-size` |
| Alert | `.hm-alert` | `data-variant`, `data-dismissible` |
| Table | `.hm-table` | `data-striped`, `data-hoverable` |
| Progress | `.hm-progress` | `data-variant`, `data-size` |
| Spinner | `.hm-spinner` | `data-size` |
| Separator | `.hm-separator` | `data-orientation`, `data-spacing` |
| Avatar | `.hm-avatar` | `data-size` |
| Container | `.hm-container` | `data-size`, `data-padding` |

## License

MIT — [Revelry Labs](https://revelry.co)
