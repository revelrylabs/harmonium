defmodule Harmonium do
  @moduledoc """
  CSS design system for Phoenix and LiveView.

  Harmonium provides design tokens, layout primitives, and component styles
  via a single CSS file. No JavaScript required.

  ## Setup

  Add to your `mix.exs`:

      {:harmonium, "~> 2.0"}

  Then import the CSS in your `assets/css/app.css`:

      @import "../../deps/harmonium/priv/static/harmonium.css";

  Or serve it statically from your endpoint:

      plug Plug.Static,
        at: "/vendor",
        from: {:harmonium, "priv/static"},
        gzip: true

  And link it in your root layout:

      <link rel="stylesheet" href="/vendor/harmonium.css" />

  ## Usage

  Use `.hm-*` CSS classes with `data-*` attributes in your HEEX templates:

      <button class="hm-button" data-variant="primary" data-size="md">
        Save
      </button>

      <div class="hm-card" data-variant="elevated">
        <div class="hm-card-body">Content</div>
      </div>

      <div class="hm-stack" data-gap="md">
        <div class="hm-field">
          <label class="hm-field-label">Email</label>
          <input class="hm-input" type="email" />
        </div>
      </div>

  ## Theming

  Override CSS custom properties in your stylesheet:

      :root {
        --harmonium-color-brand-primary: #E91E63;
        --harmonium-radius-md: 8px;
        --harmonium-font-family-sans: 'Inter', sans-serif;
      }

  """

  @doc """
  Returns the filesystem path to `harmonium.css`.

  Useful for build scripts or custom asset pipelines.

  ## Example

      iex> Harmonium.css_path() |> File.exists?()
      true

  """
  @spec css_path() :: String.t()
  def css_path do
    Path.join(:code.priv_dir(:harmonium), "static/harmonium.css")
  end
end
