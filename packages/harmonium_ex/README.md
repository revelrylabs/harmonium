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
    {:harmonium, "~> 9.0.0-alpha"}
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

If you have `phoenix_live_view` (1.0 or later) installed, you can use the
provided function components:

```elixir
use Harmonium.Components
```

```heex
<.hm_button variant="primary">Save</.hm_button>
<.hm_card variant="elevated">
  <.hm_card_body>Content</.hm_card_body>
</.hm_card>
<.hm_stack gap="md">
  <.hm_field>
    <.hm_field_label for="email">Email</.hm_field_label>
    <.hm_input id="email" name="email" type="email" placeholder="you@example.com" />
  </.hm_field>
</.hm_stack>
```

Every component takes a `class` attribute, which is appended to its own
`hm-*` class, and passes other HTML attributes (`id`, `aria-*`, `phx-*`, ...)
through to its root element:

```heex
<.hm_badge variant="success" class="status-badge" id="status">Active</.hm_badge>
```

Inputs, textareas and selects accept a `Phoenix.HTML.FormField`. The field
fills in `id`, `name` and `value`, and marks the control `aria-invalid` once
the field has been used and has errors:

```heex
<.form for={@form} phx-change="validate" phx-submit="save">
  <.hm_field field={@form[:email]}>
    <.hm_field_label field={@form[:email]}>Email</.hm_field_label>
    <.hm_input field={@form[:email]} type="email" />
    <.hm_field_error field={@form[:email]} />
  </.hm_field>
  <.hm_field field={@form[:role]}>
    <.hm_field_label field={@form[:role]}>Role</.hm_field_label>
    <.hm_select field={@form[:role]} placeholder="Choose a role" options={["Admin", "Member"]} />
  </.hm_field>
</.form>
```

To translate error messages with Gettext, point Harmonium at your translator:

```elixir
config :harmonium, :error_translator, {MyAppWeb.CoreComponents, :translate_error}
```

Dialogs and drawers render inside their overlay while `open` is true.
`on_close` takes an event name or a `Phoenix.LiveView.JS` command and runs on
a click outside the panel or on Escape:

```heex
<.hm_dialog open={@show_dialog} on_close="close_dialog" aria-labelledby="dialog-title">
  <.hm_dialog_header><h2 id="dialog-title">Delete project?</h2></.hm_dialog_header>
  <.hm_dialog_body>This cannot be undone.</.hm_dialog_body>
  <.hm_dialog_footer>
    <.hm_button variant="outline" phx-click="close_dialog">Cancel</.hm_button>
  </.hm_dialog_footer>
</.hm_dialog>
```

See the `Harmonium.Components` docs for the full list of components and
attributes.

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
| Alert | `.hm-alert` | `data-variant` |
| Table | `.hm-table` | `data-striped`, `data-hoverable` |
| Progress | `.hm-progress` | `data-variant`, `data-size` |
| Spinner | `.hm-spinner` | `data-size` |
| Separator | `.hm-separator` | `data-orientation`, `data-spacing` |
| Avatar | `.hm-avatar` | `data-size` |
| Container | `.hm-container` | `data-size`, `data-padding` |

## License

MIT — [Revelry Labs](https://revelry.co)
