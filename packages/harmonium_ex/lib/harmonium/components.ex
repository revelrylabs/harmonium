if Code.ensure_loaded?(Phoenix.Component) do
  defmodule Harmonium.Components do
    @moduledoc """
    Optional Phoenix function components wrapping Harmonium CSS classes.

    ## Usage

        use Harmonium.Components

    Then in your HEEX templates:

        <.hm_button variant="primary">Save</.hm_button>
        <.hm_card variant="elevated">
          <div class="hm-card-body">Content</div>
        </.hm_card>

    These are thin wrappers — you can always use the CSS classes directly.
    """

    use Phoenix.Component

    defmacro __using__(_opts) do
      quote do
        import Harmonium.Components
      end
    end

    @doc "Renders a `<button>` with Harmonium button styles."
    attr :variant, :string, default: "primary", values: ~w(primary secondary outline ghost)
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :expanded, :boolean, default: false
    attr :rest, :global, include: ~w(type disabled form)
    slot :inner_block, required: true

    def hm_button(assigns) do
      ~H"""
      <button
        class="hm-button"
        data-variant={@variant}
        data-size={@size}
        data-expanded={@expanded || nil}
        {@rest}
      >
        <%= render_slot(@inner_block) %>
      </button>
      """
    end

    @doc "Renders a card container."
    attr :variant, :string, default: "elevated", values: ~w(elevated outlined filled)
    attr :padding, :string, default: "md", values: ~w(none sm md lg)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_card(assigns) do
      ~H"""
      <div class="hm-card" data-variant={@variant} data-padding={@padding} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a vertical or horizontal stack."
    attr :direction, :string, default: "vertical", values: ~w(vertical horizontal)
    attr :gap, :string, default: "md", values: ~w(xs sm md lg xl)
    attr :align, :string, default: nil
    attr :justify, :string, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_stack(assigns) do
      ~H"""
      <div
        class="hm-stack"
        data-direction={@direction}
        data-gap={@gap}
        data-align={@align}
        data-justify={@justify}
        {@rest}
      >
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a horizontal group."
    attr :gap, :string, default: "md", values: ~w(xs sm md lg xl)
    attr :align, :string, default: nil
    attr :justify, :string, default: nil
    attr :wrap, :boolean, default: false
    attr :rest, :global
    slot :inner_block, required: true

    def hm_group(assigns) do
      ~H"""
      <div
        class="hm-group"
        data-gap={@gap}
        data-align={@align}
        data-justify={@justify}
        data-wrap={@wrap || nil}
        {@rest}
      >
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a text input."
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :rest, :global, include: ~w(type name value placeholder disabled readonly required)

    def hm_input(assigns) do
      ~H"""
      <input class="hm-input" data-size={@size} {@rest} />
      """
    end

    @doc "Renders a badge."
    attr :variant, :string, default: "primary", values: ~w(primary secondary success warning error neutral)
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_badge(assigns) do
      ~H"""
      <span class="hm-badge" data-variant={@variant} data-size={@size} {@rest}>
        <%= render_slot(@inner_block) %>
      </span>
      """
    end

    @doc "Renders an alert."
    attr :variant, :string, default: "info", values: ~w(info success warning error)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_alert(assigns) do
      ~H"""
      <div class="hm-alert" data-variant={@variant} {@rest}>
        <div class="hm-alert-content">
          <%= render_slot(@inner_block) %>
        </div>
      </div>
      """
    end

    @doc "Renders a field wrapper that groups a label, input, and error."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_field(assigns) do
      ~H"""
      <div class="hm-field" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a field label."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_field_label(assigns) do
      ~H"""
      <label class="hm-field-label" {@rest}>
        <%= render_slot(@inner_block) %>
      </label>
      """
    end

    @doc "Renders a spinner."
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :rest, :global

    def hm_spinner(assigns) do
      ~H"""
      <div class="hm-spinner" data-size={@size} {@rest} />
      """
    end

    @doc "Renders a separator."
    attr :orientation, :string, default: "horizontal", values: ~w(horizontal vertical)
    attr :spacing, :string, default: "md", values: ~w(xs sm md lg xl)
    attr :rest, :global

    def hm_separator(assigns) do
      ~H"""
      <hr class="hm-separator" data-orientation={@orientation} data-spacing={@spacing} {@rest} />
      """
    end
  end
end
