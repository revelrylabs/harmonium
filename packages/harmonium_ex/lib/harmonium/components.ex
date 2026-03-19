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

    # --- Stepper ---

    @doc "Renders a step indicator for multi-step flows."
    attr :orientation, :string, default: "horizontal", values: ~w(horizontal vertical)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_stepper(assigns) do
      ~H"""
      <div class="hm-stepper" data-orientation={@orientation} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a single step within a stepper."
    attr :state, :string, default: "pending", values: ~w(pending active completed)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_stepper_step(assigns) do
      ~H"""
      <div class="hm-stepper-step" data-state={@state} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a stepper connector line between steps."
    attr :rest, :global

    def hm_stepper_connector(assigns) do
      ~H"""
      <div class="hm-stepper-connector" {@rest} />
      """
    end

    # --- Progress ---

    @doc "Renders a progress bar."
    attr :value, :integer, default: 0
    attr :max, :integer, default: 100
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :variant, :string, default: "primary", values: ~w(primary secondary success warning error)
    attr :rest, :global
    slot :inner_block, required: false

    def hm_progress(assigns) do
      ~H"""
      <div class="hm-progress" data-size={@size} data-variant={@variant} {@rest}>
        <div class="hm-progress-bar" style={"width: #{min(@value / @max * 100, 100)}%"} />
        <span :if={@inner_block != []} class="hm-progress-label">
          <%= render_slot(@inner_block) %>
        </span>
      </div>
      """
    end

    # --- Dialog ---

    @doc "Renders a dialog/modal overlay."
    attr :open, :boolean, default: false
    attr :rest, :global

    def hm_dialog_overlay(assigns) do
      ~H"""
      <div :if={@open} class="hm-dialog-overlay" {@rest} />
      """
    end

    @doc "Renders a dialog/modal container."
    attr :open, :boolean, default: false
    attr :size, :string, default: "md", values: ~w(sm md lg full)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_dialog(assigns) do
      ~H"""
      <div :if={@open} class="hm-dialog" data-size={@size} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a dialog header."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_dialog_header(assigns) do
      ~H"""
      <div class="hm-dialog-header" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a dialog body."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_dialog_body(assigns) do
      ~H"""
      <div class="hm-dialog-body" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a dialog footer."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_dialog_footer(assigns) do
      ~H"""
      <div class="hm-dialog-footer" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    # --- Empty State ---

    @doc "Renders an empty state placeholder."
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_empty_state(assigns) do
      ~H"""
      <div class="hm-empty-state" data-size={@size} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders the empty state icon container."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_empty_state_icon(assigns) do
      ~H"""
      <div class="hm-empty-state-icon" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders the empty state title."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_empty_state_title(assigns) do
      ~H"""
      <h3 class="hm-empty-state-title" {@rest}>
        <%= render_slot(@inner_block) %>
      </h3>
      """
    end

    @doc "Renders the empty state description."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_empty_state_description(assigns) do
      ~H"""
      <p class="hm-empty-state-description" {@rest}>
        <%= render_slot(@inner_block) %>
      </p>
      """
    end

    @doc "Renders the empty state action container."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_empty_state_action(assigns) do
      ~H"""
      <div class="hm-empty-state-action" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    # --- Drawer ---

    @doc "Renders a drawer overlay."
    attr :open, :boolean, default: false
    attr :rest, :global

    def hm_drawer_overlay(assigns) do
      ~H"""
      <div :if={@open} class="hm-drawer-overlay" {@rest} />
      """
    end

    @doc "Renders a slide-out drawer panel."
    attr :open, :boolean, default: false
    attr :side, :string, default: "right", values: ~w(left right)
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_drawer(assigns) do
      ~H"""
      <div :if={@open} class="hm-drawer" data-side={@side} data-size={@size} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    # --- Typography ---

    @doc "Renders styled text."
    attr :size, :string, default: nil
    attr :weight, :string, default: nil
    attr :color, :string, default: nil
    attr :truncate, :boolean, default: false
    attr :rest, :global
    slot :inner_block, required: true

    def hm_text(assigns) do
      ~H"""
      <span
        class="hm-typography-text"
        data-size={@size}
        data-weight={@weight}
        data-color={@color}
        data-truncate={@truncate || nil}
        {@rest}
      >
        <%= render_slot(@inner_block) %>
      </span>
      """
    end

    @doc """
    Renders a styled heading.

    Renders as `<h2>` by default. For other heading levels, use the CSS
    class directly: `<h1 class="hm-typography-heading" data-size="xl">`.
    """
    attr :size, :string, default: "lg"
    attr :weight, :string, default: "bold"
    attr :color, :string, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_heading(assigns) do
      ~H"""
      <h2
        class="hm-typography-heading"
        data-size={@size}
        data-weight={@weight}
        data-color={@color}
        {@rest}
      >
        <%= render_slot(@inner_block) %>
      </h2>
      """
    end

    # --- Data Grid ---

    @doc "Renders a data grid wrapper for horizontal scroll."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_data_grid_wrapper(assigns) do
      ~H"""
      <div class="hm-data-grid-wrapper" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a data grid (table)."
    attr :striped, :boolean, default: false
    attr :hoverable, :boolean, default: false
    attr :rest, :global
    slot :inner_block, required: true

    def hm_data_grid(assigns) do
      ~H"""
      <table class="hm-data-grid" data-striped={@striped || nil} data-hoverable={@hoverable || nil} {@rest}>
        <%= render_slot(@inner_block) %>
      </table>
      """
    end

    # --- File Upload ---

    @doc "Renders a file upload drop zone."
    attr :disabled, :boolean, default: false
    attr :rest, :global
    slot :inner_block, required: true

    def hm_file_upload(assigns) do
      ~H"""
      <div class="hm-file-upload" data-disabled={@disabled || nil} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders the file upload placeholder content."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_file_upload_placeholder(assigns) do
      ~H"""
      <div class="hm-file-upload-placeholder" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    # --- Toast ---

    @doc "Renders a toast container."
    attr :position, :string, default: "top-right", values: ~w(top-right top-left bottom-right bottom-left)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_toast_container(assigns) do
      ~H"""
      <div class="hm-toast-container" data-position={@position} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a toast notification."
    attr :variant, :string, default: "info", values: ~w(info success warning error)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_toast(assigns) do
      ~H"""
      <div class="hm-toast-toast" data-variant={@variant} {@rest}>
        <div class="hm-toast-message">
          <%= render_slot(@inner_block) %>
        </div>
      </div>
      """
    end

    # --- Popover ---

    @doc "Renders a popover container."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_popover(assigns) do
      ~H"""
      <div class="hm-popover" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders popover content."
    attr :side, :string, default: "bottom", values: ~w(top bottom left right)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_popover_content(assigns) do
      ~H"""
      <div class="hm-popover-content" data-side={@side} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    # --- Tooltip ---

    @doc "Renders a tooltip container."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_tooltip(assigns) do
      ~H"""
      <div class="hm-tooltip" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders tooltip content."
    attr :side, :string, default: "top", values: ~w(top bottom left right)
    attr :rest, :global
    slot :inner_block, required: true

    def hm_tooltip_content(assigns) do
      ~H"""
      <div class="hm-tooltip-content" data-side={@side} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    # --- Skeleton ---

    @doc "Renders a skeleton loading placeholder."
    attr :variant, :string, default: "text", values: ~w(text circular rectangular)
    attr :rest, :global

    def hm_skeleton(assigns) do
      ~H"""
      <div class="hm-skeleton" data-variant={@variant} {@rest} />
      """
    end

    # --- Stat ---

    @doc "Renders a stat display card."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_stat(assigns) do
      ~H"""
      <div class="hm-stat" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders the stat value."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_stat_value(assigns) do
      ~H"""
      <div class="hm-stat-value" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders the stat label."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_stat_label(assigns) do
      ~H"""
      <div class="hm-stat-label" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    # --- Tabs ---

    @doc "Renders a tabbed interface container."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_tabs(assigns) do
      ~H"""
      <div class="hm-tabs" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a tab trigger list."
    attr :rest, :global
    slot :inner_block, required: true

    def hm_tabs_list(assigns) do
      ~H"""
      <div class="hm-tabs-list" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

    @doc "Renders a tab trigger button."
    attr :active, :boolean, default: false
    attr :rest, :global
    slot :inner_block, required: true

    def hm_tabs_trigger(assigns) do
      ~H"""
      <button class="hm-tabs-trigger" data-state={if @active, do: "active"} {@rest}>
        <%= render_slot(@inner_block) %>
      </button>
      """
    end

    @doc "Renders tab content."
    attr :active, :boolean, default: false
    attr :rest, :global
    slot :inner_block, required: true

    def hm_tabs_content(assigns) do
      ~H"""
      <div :if={@active} class="hm-tabs-content" {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
      """
    end

  end
end
