if Code.ensure_loaded?(Phoenix.Component) do
  defmodule Harmonium.Components do
    @moduledoc """
    Optional Phoenix function components that render Harmonium markup.

    ## Usage

        use Harmonium.Components

    Then in your HEEx templates:

        <.hm_button variant="primary">Save</.hm_button>
        <.hm_card variant="elevated">
          <.hm_card_body>Content</.hm_card_body>
        </.hm_card>

    Every component accepts a `class` attribute, which is appended to the
    component's own `hm-*` class, and passes any other global HTML attribute
    (`id`, `aria-*`, `data-*`, `phx-*`, ...) through to its root element.

    These are thin wrappers. You can always write the `hm-*` classes and
    `data-*` attributes by hand.

    ## Forms

    `hm_input/1`, `hm_textarea/1` and `hm_select/1` accept a
    `Phoenix.HTML.FormField` through the `field` attribute, which fills in the
    `id`, `name` and `value` and marks the control invalid once the field has
    been used and has errors:

        <.form for={@form} phx-change="validate">
          <.hm_field field={@form[:email]}>
            <.hm_field_label field={@form[:email]}>Email</.hm_field_label>
            <.hm_input field={@form[:email]} type="email" />
            <.hm_field_error field={@form[:email]} />
          </.hm_field>
        </.form>

    Error messages are interpolated with `translate_error/1`. To translate
    them with Gettext, configure a `{module, function}` that receives the
    `{message, opts}` tuple:

        config :harmonium, :error_translator, {MyAppWeb.CoreComponents, :translate_error}
    """

    use Phoenix.Component

    defmacro __using__(_opts) do
      quote do
        import Harmonium.Components
      end
    end

    # Global attributes accepted by text-like inputs. `size` is deliberately
    # left out: the component's own `size` attribute sets `data-size`.
    @input_attrs ~w(accept autocomplete autofocus dirname disabled form inputmode list max maxlength
                    min minlength pattern placeholder readonly required step)

    # ------------------------------------------------------------------
    # Plain wrappers
    #
    # Components that only render a tag with a fixed `hm-*` class (plus,
    # for a few, a fixed ARIA attribute) are generated from this table.
    # Each one takes `class`, global attributes and an inner block.
    # ------------------------------------------------------------------

    @wrappers [
      {:hm_card_header, "div", "hm-card-header", %{}, "Renders a card header."},
      {:hm_card_body, "div", "hm-card-body", %{}, "Renders a card body."},
      {:hm_card_footer, "div", "hm-card-footer", %{}, "Renders a card footer."},
      {:hm_field_description, "p", "hm-field-description", %{}, "Renders help text for a field."},
      {:hm_dialog_header, "div", "hm-dialog-header", %{}, "Renders a dialog header."},
      {:hm_dialog_body, "div", "hm-dialog-body", %{}, "Renders a dialog body."},
      {:hm_dialog_footer, "div", "hm-dialog-footer", %{}, "Renders a dialog footer."},
      {:hm_empty_state_icon, "div", "hm-empty-state-icon", %{},
       "Renders the empty state icon container."},
      {:hm_empty_state_title, "h3", "hm-empty-state-title", %{},
       "Renders the empty state title."},
      {:hm_empty_state_description, "p", "hm-empty-state-description", %{},
       "Renders the empty state description."},
      {:hm_empty_state_action, "div", "hm-empty-state-action", %{},
       "Renders the empty state action container."},
      {:hm_data_grid_wrapper, "div", "hm-data-grid-wrapper", %{},
       "Renders a data grid wrapper for horizontal scroll."},
      {:hm_file_upload_placeholder, "div", "hm-file-upload-placeholder", %{},
       "Renders the file upload placeholder content."},
      {:hm_popover, "div", "hm-popover", %{}, "Renders a popover container."},
      {:hm_popover_trigger, "div", "hm-popover-trigger", %{},
       "Renders the element that opens a popover."},
      {:hm_tooltip, "div", "hm-tooltip", %{}, "Renders a tooltip container."},
      {:hm_stat, "div", "hm-stat", %{}, "Renders a stat display card."},
      {:hm_stat_label, "span", "hm-stat-label", %{}, "Renders the stat label."},
      {:hm_stat_value, "div", "hm-stat-value", %{}, "Renders the stat value."},
      {:hm_tabs, "div", "hm-tabs", %{}, "Renders a tabbed interface container."},
      {:hm_tabs_list, "div", "hm-tabs-list", %{role: "tablist"}, "Renders a tab trigger list."}
    ]

    for {name, tag, base_class, static_attrs, doc} <- @wrappers do
      @doc "#{doc} Renders `<#{tag} class=\"#{base_class}\">`."
      attr :class, :any, default: nil, doc: "Extra classes, appended to `#{base_class}`."
      attr :rest, :global
      slot :inner_block, required: true

      def unquote(name)(assigns) do
        assigns
        |> assign(
          tag: unquote(tag),
          base_class: unquote(base_class),
          rest: Map.merge(unquote(Macro.escape(static_attrs)), assigns.rest)
        )
        |> wrapper()
      end
    end

    defp wrapper(assigns) do
      ~H"""
      <.dynamic_tag tag_name={@tag} class={[@base_class, @class]} {@rest}>
        {render_slot(@inner_block)}
      </.dynamic_tag>
      """
    end

    # ------------------------------------------------------------------
    # Actions and layout
    # ------------------------------------------------------------------

    @doc "Renders a `<button>` with Harmonium button styles."
    attr :variant, :string, default: "primary", values: ~w(primary secondary outline ghost)
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :expanded, :boolean, default: false, doc: "Stretches the button to full width."
    attr :class, :any, default: nil
    attr :rest, :global, include: ~w(type disabled form name value autofocus)
    slot :inner_block, required: true

    def hm_button(assigns) do
      ~H"""
      <button
        class={["hm-button", @class]}
        data-variant={@variant}
        data-size={@size}
        data-expanded={@expanded}
        {@rest}
      >
        {render_slot(@inner_block)}
      </button>
      """
    end

    @doc "Renders a card container."
    attr :variant, :string, default: "elevated", values: ~w(elevated outlined filled)
    attr :padding, :string, default: "md", values: ~w(none sm md lg)
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_card(assigns) do
      ~H"""
      <div class={["hm-card", @class]} data-variant={@variant} data-padding={@padding} {@rest}>
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc "Renders a vertical or horizontal stack."
    attr :direction, :string, default: "vertical", values: ~w(vertical horizontal)
    attr :gap, :string, default: "md", values: ~w(xs sm md lg xl)
    attr :align, :string, default: nil, values: [nil | ~w(start center end stretch)]
    attr :justify, :string, default: nil, values: [nil | ~w(start center end between around)]
    attr :wrap, :boolean, default: false
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_stack(assigns) do
      ~H"""
      <div
        class={["hm-stack", @class]}
        data-direction={@direction}
        data-gap={@gap}
        data-align={@align}
        data-justify={@justify}
        data-wrap={@wrap}
        {@rest}
      >
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc "Renders a horizontal group."
    attr :gap, :string, default: "md", values: ~w(xs sm md lg xl)
    attr :align, :string, default: nil, values: [nil | ~w(start center end stretch)]
    attr :justify, :string, default: nil, values: [nil | ~w(start center end between around)]
    attr :wrap, :boolean, default: false
    attr :grow, :boolean, default: false, doc: "Makes every child grow to fill the row."
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_group(assigns) do
      ~H"""
      <div
        class={["hm-group", @class]}
        data-gap={@gap}
        data-align={@align}
        data-justify={@justify}
        data-wrap={@wrap}
        data-grow={@grow}
        {@rest}
      >
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc "Renders a separator."
    attr :orientation, :string, default: "horizontal", values: ~w(horizontal vertical)
    attr :spacing, :string, default: "md", values: ~w(xs sm md lg xl)
    attr :class, :any, default: nil
    attr :rest, :global

    def hm_separator(assigns) do
      ~H"""
      <hr
        class={["hm-separator", @class]}
        data-orientation={@orientation}
        data-spacing={@spacing}
        role="separator"
        aria-orientation={@orientation}
        {@rest}
      />
      """
    end

    # ------------------------------------------------------------------
    # Forms
    # ------------------------------------------------------------------

    @doc """
    Renders a field wrapper that groups a label, control, description and error.

    Pass `field` to set `data-error` automatically once the field has errors.
    """
    attr :field, Phoenix.HTML.FormField, default: nil
    attr :error, :boolean, default: false, doc: "Marks the field as invalid."
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_field(assigns) do
      assigns = assign(assigns, :error, assigns.error or field_errors(assigns.field) != [])

      ~H"""
      <div class={["hm-field", @class]} data-error={@error} {@rest}>
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc "Renders a field label. Pass `field` (or `for`) to point it at its control."
    attr :field, Phoenix.HTML.FormField, default: nil
    attr :for, :string, default: nil
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_field_label(assigns) do
      assigns = assign(assigns, :for, assigns.for || (assigns.field && assigns.field.id))

      ~H"""
      <label class={["hm-field-label", @class]} for={@for} {@rest}>
        {render_slot(@inner_block)}
      </label>
      """
    end

    @doc """
    Renders a field's error message.

    With `field`, renders the field's errors once it has been used; with
    `errors`, renders the given messages; otherwise renders the inner block.
    Nothing is rendered when there is no message.
    """
    attr :field, Phoenix.HTML.FormField, default: nil
    attr :errors, :list, default: [], doc: "Error messages to show."
    attr :id, :string, default: nil
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block

    def hm_field_error(assigns) do
      %{field: field} = assigns

      assigns =
        assigns
        |> assign(:messages, field_errors(field) ++ assigns.errors)
        |> assign(:id, assigns.id || (field && error_id(field.id)))

      ~H"""
      <p
        :if={@inner_block != [] or @messages != []}
        class={["hm-field-error", @class]}
        id={@id}
        role="alert"
        {@rest}
      >
        {render_slot(@inner_block)}
        <%= for {message, index} <- Enum.with_index(@messages) do %>
          <br :if={index > 0 or @inner_block != []} />{message}
        <% end %>
      </p>
      """
    end

    @doc """
    Renders a text-like `<input>`.

    Pass `field={@form[:email]}` to fill in `id`, `name` and `value` from a
    form and set `aria-invalid` once the field has errors. For checkboxes,
    radios and switches, use the `hm-checkbox`, `hm-radio` and `hm-switch`
    classes directly.
    """
    attr :field, Phoenix.HTML.FormField, default: nil
    attr :id, :any, default: nil
    attr :name, :any, default: nil
    attr :value, :any, default: nil

    attr :type, :string,
      default: "text",
      values:
        ~w(text email password number tel url search date datetime-local time month week color hidden)

    attr :errors, :list, default: [], doc: "Error messages; any message marks the input invalid."
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :class, :any, default: nil
    attr :rest, :global, include: @input_attrs

    def hm_input(assigns) do
      assigns = form_control(assigns)

      ~H"""
      <input
        type={@type}
        id={@id}
        name={@name}
        value={Phoenix.HTML.Form.normalize_value(@type, @value)}
        class={["hm-input", @class]}
        data-size={@size}
        aria-invalid={@invalid && "true"}
        aria-errormessage={@invalid && @id && error_id(@id)}
        {@rest}
      />
      """
    end

    @doc "Renders a `<textarea>`. Accepts `field` like `hm_input/1`."
    attr :field, Phoenix.HTML.FormField, default: nil
    attr :id, :any, default: nil
    attr :name, :any, default: nil
    attr :value, :any, default: nil
    attr :errors, :list, default: []
    attr :class, :any, default: nil
    attr :rest, :global, include: @input_attrs ++ ~w(cols rows wrap)

    def hm_textarea(assigns) do
      assigns = form_control(assigns)

      ~H"""
      <textarea
        id={@id}
        name={@name}
        class={["hm-textarea", @class]}
        aria-invalid={@invalid && "true"}
        aria-errormessage={@invalid && @id && error_id(@id)}
        {@rest}
      >{Phoenix.HTML.Form.normalize_value("textarea", @value)}</textarea>
      """
    end

    @doc """
    Renders a `<select>`. Accepts `field` like `hm_input/1`.

    Pass `options` (anything `Phoenix.HTML.Form.options_for_select/2`
    accepts) or render `<option>` tags in the inner block. `placeholder`
    adds a disabled empty first option, selected while there is no value.
    """
    attr :field, Phoenix.HTML.FormField, default: nil
    attr :id, :any, default: nil
    attr :name, :any, default: nil
    attr :value, :any, default: nil
    attr :options, :list, default: nil
    attr :placeholder, :string, default: nil
    attr :multiple, :boolean, default: false
    attr :errors, :list, default: []
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :class, :any, default: nil
    attr :rest, :global, include: ~w(autocomplete autofocus disabled form required)
    slot :inner_block

    def hm_select(assigns) do
      assigns = form_control(assigns)

      ~H"""
      <select
        id={@id}
        name={@name}
        multiple={@multiple}
        class={["hm-select", @class]}
        data-size={@size}
        aria-invalid={@invalid && "true"}
        aria-errormessage={@invalid && @id && error_id(@id)}
        {@rest}
      >
        <option :if={@placeholder} value="" disabled selected={@value in [nil, "", []]}>
          {@placeholder}
        </option>
        {@options && Phoenix.HTML.Form.options_for_select(@options, @value)}
        {render_slot(@inner_block)}
      </select>
      """
    end

    @doc """
    Translates a form error (`{message, opts}`) into a string.

    Uses the `{module, function}` configured under `:error_translator` in the
    `:harmonium` application environment when present; otherwise
    interpolates `%{key}` placeholders in the message.
    """
    @spec translate_error({String.t(), keyword()} | String.t()) :: String.t()
    def translate_error({message, opts} = error) do
      case Application.get_env(:harmonium, :error_translator) do
        {module, function} ->
          apply(module, function, [error])

        nil ->
          Enum.reduce(opts, message, fn {key, value}, acc ->
            String.replace(acc, "%{#{key}}", fn _ -> to_string(value) end)
          end)
      end
    end

    def translate_error(message) when is_binary(message), do: message

    defp form_control(%{field: %Phoenix.HTML.FormField{} = field} = assigns) do
      name =
        if assigns[:multiple] || assigns[:rest][:multiple],
          do: field.name <> "[]",
          else: field.name

      assigns
      |> assign(field: nil, errors: field_errors(field) ++ assigns.errors)
      |> assign(:id, assigns.id || field.id)
      |> assign(:name, assigns.name || name)
      |> assign(:value, if(is_nil(assigns.value), do: field.value, else: assigns.value))
      |> form_control()
    end

    defp form_control(assigns), do: assign(assigns, :invalid, assigns.errors != [])

    defp field_errors(nil), do: []

    defp field_errors(%Phoenix.HTML.FormField{} = field) do
      if used_input?(field), do: Enum.map(field.errors, &translate_error/1), else: []
    end

    defp error_id(id), do: "#{id}-error"

    # ------------------------------------------------------------------
    # Feedback
    # ------------------------------------------------------------------

    @doc "Renders a badge."
    attr :variant, :string,
      default: "neutral",
      values: ~w(primary secondary success warning error neutral)

    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_badge(assigns) do
      ~H"""
      <span class={["hm-badge", @class]} data-variant={@variant} data-size={@size} {@rest}>
        {render_slot(@inner_block)}
      </span>
      """
    end

    @doc """
    Renders an alert. Info and success alerts use `role="status"`; warning and
    error alerts use `role="alert"`.

    Set `dismissible` to render a dismiss button; `on_dismiss` is its
    `phx-click` (an event name or a `Phoenix.LiveView.JS` command).
    """
    attr :variant, :string, default: "info", values: ~w(info success warning error)
    attr :dismissible, :boolean, default: false
    attr :on_dismiss, :any, default: nil
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_alert(assigns) do
      ~H"""
      <div
        class={["hm-alert", @class]}
        data-variant={@variant}
        role={if @variant in ~w(warning error), do: "alert", else: "status"}
        {@rest}
      >
        <div class="hm-alert-content">{render_slot(@inner_block)}</div>
        <button
          :if={@dismissible}
          type="button"
          class="hm-alert-dismiss"
          aria-label="Dismiss"
          phx-click={@on_dismiss}
        >
          &times;
        </button>
      </div>
      """
    end

    @doc "Renders a loading spinner with `role=\"status\"`."
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :label, :string, default: "Loading", doc: "Accessible label."
    attr :class, :any, default: nil
    attr :rest, :global

    def hm_spinner(assigns) do
      ~H"""
      <span
        class={["hm-spinner", @class]}
        data-size={@size}
        role="status"
        aria-label={@label}
        {@rest}
      >
        <span class="hm-spinner-circle"></span>
      </span>
      """
    end

    @doc """
    Renders a progress bar with `role="progressbar"`.

    `show_label` prints the rounded percentage after the bar; an inner block
    replaces that label. A `max` of zero or less renders an empty bar.
    """
    attr :value, :any, default: 0, doc: "Current value (a number)."
    attr :max, :any, default: 100, doc: "Maximum value (a number)."
    attr :size, :string, default: "md", values: ~w(sm md lg)

    attr :variant, :string,
      default: "primary",
      values: ~w(primary secondary success warning error)

    attr :show_label, :boolean, default: false
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block

    def hm_progress(assigns) do
      valid? = is_number(assigns.max) and assigns.max > 0

      assigns =
        assigns
        |> assign(:percent, percent(assigns.value, assigns.max))
        |> assign(:value_max, if(valid?, do: assigns.max, else: 0))
        |> assign(
          :value_now,
          if(valid? and is_number(assigns.value),
            do: assigns.value |> max(0) |> min(assigns.max),
            else: 0
          )
        )

      ~H"""
      <div
        class={["hm-progress", @class]}
        role="progressbar"
        aria-valuenow={@value_now}
        aria-valuemin="0"
        aria-valuemax={@value_max}
        data-variant={@variant}
        data-size={@size}
        {@rest}
      >
        <div class="hm-progress-bar" style={"width: #{format_percent(@percent)}%"}></div>
      </div>
      <span :if={@show_label or @inner_block != []} class="hm-progress-label" aria-hidden="true">
        <%= if @inner_block != [] do %>
          {render_slot(@inner_block)}
        <% else %>
          {round(@percent)}%
        <% end %>
      </span>
      """
    end

    defp percent(value, max) when is_number(value) and is_number(max) and max > 0 do
      (value / max * 100) |> max(0) |> min(100)
    end

    defp percent(_value, _max), do: 0

    defp format_percent(percent) when is_integer(percent), do: Integer.to_string(percent)

    defp format_percent(percent) do
      rounded = Float.round(percent, 2)

      if rounded == trunc(rounded),
        do: Integer.to_string(trunc(rounded)),
        else: to_string(rounded)
    end

    @doc "Renders a skeleton loading placeholder (hidden from assistive technology)."
    attr :variant, :string, default: "text", values: ~w(text circular rectangular)
    attr :width, :string, default: nil, doc: "CSS width, e.g. `\"120px\"`."
    attr :height, :string, default: nil, doc: "CSS height, e.g. `\"1rem\"`."
    attr :class, :any, default: nil
    attr :rest, :global

    def hm_skeleton(assigns) do
      # Size declarations go first so a consumer `style` can still override them.
      style =
        [width: assigns.width, height: assigns.height]
        |> Enum.reject(fn {_key, value} -> is_nil(value) end)
        |> Enum.map(fn {key, value} -> "#{key}: #{value};" end)
        |> Enum.concat(List.wrap(assigns.rest[:style]))
        |> Enum.join(" ")

      rest = if style == "", do: assigns.rest, else: Map.put(assigns.rest, :style, style)
      assigns = assign(assigns, :rest, rest)

      ~H"""
      <div class={["hm-skeleton", @class]} data-variant={@variant} aria-hidden="true" {@rest}></div>
      """
    end

    @doc "Renders a fixed-position container for toasts."
    attr :position, :string,
      default: "top-right",
      values: ~w(top-right top-left bottom-right bottom-left)

    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_toast_container(assigns) do
      ~H"""
      <div class={["hm-toast-container", @class]} data-position={@position} {@rest}>
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc """
    Renders a toast with `role="status"` and `aria-live="polite"`.

    `on_dismiss` (an event name or `Phoenix.LiveView.JS` command) renders a
    dismiss button.
    """
    attr :variant, :string, default: "info", values: ~w(info success warning error)
    attr :on_dismiss, :any, default: nil
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_toast(assigns) do
      ~H"""
      <div
        class={["hm-toast-toast", @class]}
        data-variant={@variant}
        role="status"
        aria-live="polite"
        {@rest}
      >
        <span class="hm-toast-message">{render_slot(@inner_block)}</span>
        <button
          :if={@on_dismiss}
          type="button"
          class="hm-toast-dismiss"
          aria-label="Dismiss"
          phx-click={@on_dismiss}
        >
          &times;
        </button>
      </div>
      """
    end

    # ------------------------------------------------------------------
    # Overlays
    # ------------------------------------------------------------------

    @doc """
    Renders a modal dialog inside its overlay while `open` is true.

    `on_close` (an event name or `Phoenix.LiveView.JS` command) runs when
    the user clicks outside the dialog or presses Escape.
    """
    attr :open, :boolean, default: false
    attr :size, :string, default: "md", values: ~w(sm md lg full)
    attr :on_close, :any, default: nil
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_dialog(assigns) do
      ~H"""
      <div :if={@open} class="hm-dialog-overlay">
        <div
          class={["hm-dialog", @class]}
          data-size={@size}
          role="dialog"
          aria-modal="true"
          phx-click-away={@on_close}
          phx-window-keydown={@on_close}
          phx-key={@on_close && "escape"}
          {@rest}
        >
          {render_slot(@inner_block)}
        </div>
      </div>
      """
    end

    @doc """
    Renders a slide-out drawer inside its overlay while `open` is true.

    `on_close` behaves as in `hm_dialog/1`.
    """
    attr :open, :boolean, default: false
    attr :side, :string, default: "right", values: ~w(left right)
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :on_close, :any, default: nil
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_drawer(assigns) do
      ~H"""
      <div :if={@open} class="hm-drawer-overlay">
        <div
          class={["hm-drawer", @class]}
          data-side={@side}
          data-size={@size}
          role="dialog"
          aria-modal="true"
          phx-click-away={@on_close}
          phx-window-keydown={@on_close}
          phx-key={@on_close && "escape"}
          {@rest}
        >
          {render_slot(@inner_block)}
        </div>
      </div>
      """
    end

    @doc "Renders popover content."
    attr :side, :string, default: "bottom", values: ~w(top bottom left right)
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_popover_content(assigns) do
      ~H"""
      <div class={["hm-popover-content", @class]} data-side={@side} {@rest}>
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc "Renders tooltip content with `role=\"tooltip\"`."
    attr :side, :string, default: "top", values: ~w(top bottom left right)
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_tooltip_content(assigns) do
      ~H"""
      <div class={["hm-tooltip-content", @class]} data-side={@side} role="tooltip" {@rest}>
        {render_slot(@inner_block)}
      </div>
      """
    end

    # ------------------------------------------------------------------
    # Navigation
    # ------------------------------------------------------------------

    @doc "Renders a tab trigger (`role=\"tab\"`). Set `active` on the selected tab."
    attr :active, :boolean, default: false
    attr :class, :any, default: nil
    attr :rest, :global, include: ~w(disabled)
    slot :inner_block, required: true

    def hm_tabs_trigger(assigns) do
      ~H"""
      <button
        type="button"
        role="tab"
        class={["hm-tabs-trigger", @class]}
        aria-selected={to_string(@active)}
        data-state={if @active, do: "active", else: "inactive"}
        {@rest}
      >
        {render_slot(@inner_block)}
      </button>
      """
    end

    @doc "Renders a tab panel (`role=\"tabpanel\"`) while `active` is true."
    attr :active, :boolean, default: false
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_tabs_content(assigns) do
      ~H"""
      <div :if={@active} class={["hm-tabs-content", @class]} role="tabpanel" {@rest}>
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc "Renders a step indicator for multi-step flows (`role=\"list\"`)."
    attr :orientation, :string, default: "horizontal", values: ~w(horizontal vertical)
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_stepper(assigns) do
      ~H"""
      <div class={["hm-stepper", @class]} data-orientation={@orientation} role="list" {@rest}>
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc """
    Renders a single step within a stepper: a numbered indicator (a check
    mark once completed), a label and an optional description.
    """
    attr :state, :string, default: "pending", values: ~w(pending active completed)
    attr :number, :any, default: nil, doc: "Step number shown in the indicator."
    attr :label, :string, required: true
    attr :description, :string, default: nil
    attr :class, :any, default: nil
    attr :rest, :global

    def hm_stepper_step(assigns) do
      ~H"""
      <div class={["hm-stepper-step", @class]} data-state={@state} role="listitem" {@rest}>
        <div class="hm-stepper-indicator" data-state={@state}>
          {if @state == "completed", do: "✓", else: @number}
        </div>
        <div class="hm-stepper-content">
          <div class="hm-stepper-label">{@label}</div>
          <div :if={@description} class="hm-stepper-description">{@description}</div>
        </div>
      </div>
      """
    end

    @doc "Renders the connector line between two steps."
    attr :state, :string, default: "pending", values: ~w(pending completed)
    attr :class, :any, default: nil
    attr :rest, :global

    def hm_stepper_connector(assigns) do
      ~H"""
      <div class={["hm-stepper-connector", @class]} data-state={@state} {@rest}></div>
      """
    end

    # ------------------------------------------------------------------
    # Content
    # ------------------------------------------------------------------

    @doc "Renders an empty state placeholder."
    attr :size, :string, default: "md", values: ~w(sm md lg)
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_empty_state(assigns) do
      ~H"""
      <div class={["hm-empty-state", @class]} data-size={@size} {@rest}>
        {render_slot(@inner_block)}
      </div>
      """
    end

    @doc "Renders styled text, as a `<p>` by default."
    attr :as, :string, default: "p", values: ~w(p span div label)
    attr :size, :string, default: "md", values: ~w(xs sm md lg xl)

    attr :weight, :string,
      default: nil,
      values: [nil | ~w(light normal medium semibold bold)]

    attr :color, :string,
      default: nil,
      values: [nil | ~w(default muted primary success warning error)]

    attr :truncate, :boolean, default: false
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_text(assigns) do
      ~H"""
      <.dynamic_tag
        tag_name={@as}
        class={["hm-typography-text", @class]}
        data-size={@size}
        data-weight={@weight}
        data-color={@color}
        data-truncate={@truncate}
        {@rest}
      >
        {render_slot(@inner_block)}
      </.dynamic_tag>
      """
    end

    @heading_sizes %{1 => "4xl", 2 => "3xl", 3 => "2xl", 4 => "xl", 5 => "lg", 6 => "md"}

    @doc """
    Renders a heading, `<h2>` by default.

    `level` picks the element (`<h1>`–`<h6>`); `size` defaults to the
    level's size (4xl for h1 down to md for h6).
    """
    attr :level, :integer, default: 2, values: [1, 2, 3, 4, 5, 6]
    attr :size, :string, default: nil, values: [nil | ~w(xs sm md lg xl 2xl 3xl 4xl)]
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_heading(assigns) do
      assigns = assign(assigns, :size, assigns.size || Map.fetch!(@heading_sizes, assigns.level))

      ~H"""
      <.dynamic_tag
        tag_name={"h#{@level}"}
        class={["hm-typography-heading", @class]}
        data-size={@size}
        {@rest}
      >
        {render_slot(@inner_block)}
      </.dynamic_tag>
      """
    end

    @doc "Renders a data grid (`<table>`)."
    attr :striped, :boolean, default: false
    attr :hoverable, :boolean, default: false
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_data_grid(assigns) do
      ~H"""
      <table
        class={["hm-data-grid", @class]}
        data-striped={@striped}
        data-hoverable={@hoverable}
        {@rest}
      >
        {render_slot(@inner_block)}
      </table>
      """
    end

    @doc "Renders a file upload drop zone. Put a `live_file_input` inside it."
    attr :disabled, :boolean, default: false
    attr :class, :any, default: nil
    attr :rest, :global
    slot :inner_block, required: true

    def hm_file_upload(assigns) do
      ~H"""
      <div
        class={["hm-file-upload", @class]}
        data-disabled={@disabled}
        aria-disabled={@disabled && "true"}
        {@rest}
      >
        {render_slot(@inner_block)}
      </div>
      """
    end
  end
end
