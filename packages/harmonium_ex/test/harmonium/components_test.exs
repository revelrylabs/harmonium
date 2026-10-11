defmodule Harmonium.ComponentsTest do
  use ExUnit.Case, async: true

  import Phoenix.Component
  import Phoenix.LiveViewTest
  use Harmonium.Components

  # One render of every component, each with a consumer class, so the
  # catalog tests below can check every component at once.
  defp samples do
    assigns = %{}

    [
      hm_button: ~H|<.hm_button class="x-consumer">Save</.hm_button>|,
      hm_card: ~H|<.hm_card class="x-consumer">Card</.hm_card>|,
      hm_card_header: ~H|<.hm_card_header class="x-consumer">Header</.hm_card_header>|,
      hm_card_body: ~H|<.hm_card_body class="x-consumer">Body</.hm_card_body>|,
      hm_card_footer: ~H|<.hm_card_footer class="x-consumer">Footer</.hm_card_footer>|,
      hm_stack: ~H|<.hm_stack class="x-consumer">Stack</.hm_stack>|,
      hm_group: ~H|<.hm_group class="x-consumer">Group</.hm_group>|,
      hm_separator: ~H|<.hm_separator class="x-consumer" />|,
      hm_field: ~H|<.hm_field class="x-consumer">Field</.hm_field>|,
      hm_field_label: ~H|<.hm_field_label class="x-consumer">Label</.hm_field_label>|,
      hm_field_description:
        ~H|<.hm_field_description class="x-consumer">Help</.hm_field_description>|,
      hm_field_error: ~H|<.hm_field_error class="x-consumer">Required</.hm_field_error>|,
      hm_input: ~H|<.hm_input class="x-consumer" />|,
      hm_textarea: ~H|<.hm_textarea class="x-consumer" />|,
      hm_select: ~H|<.hm_select class="x-consumer" options={["A", "B"]} />|,
      hm_badge: ~H|<.hm_badge class="x-consumer">New</.hm_badge>|,
      hm_alert: ~H|<.hm_alert class="x-consumer" dismissible>Saved</.hm_alert>|,
      hm_spinner: ~H|<.hm_spinner class="x-consumer" />|,
      hm_progress: ~H|<.hm_progress class="x-consumer" value={40} show_label />|,
      hm_skeleton: ~H|<.hm_skeleton class="x-consumer" />|,
      hm_toast_container:
        ~H|<.hm_toast_container class="x-consumer">Toasts</.hm_toast_container>|,
      hm_toast: ~H|<.hm_toast class="x-consumer" on_dismiss="dismiss">Saved</.hm_toast>|,
      hm_dialog: ~H|<.hm_dialog class="x-consumer" open>Dialog</.hm_dialog>|,
      hm_dialog_header: ~H|<.hm_dialog_header class="x-consumer">Header</.hm_dialog_header>|,
      hm_dialog_body: ~H|<.hm_dialog_body class="x-consumer">Body</.hm_dialog_body>|,
      hm_dialog_footer: ~H|<.hm_dialog_footer class="x-consumer">Footer</.hm_dialog_footer>|,
      hm_drawer: ~H|<.hm_drawer class="x-consumer" open>Drawer</.hm_drawer>|,
      hm_popover: ~H|<.hm_popover class="x-consumer">Popover</.hm_popover>|,
      hm_popover_trigger: ~H|<.hm_popover_trigger class="x-consumer">Open</.hm_popover_trigger>|,
      hm_popover_content:
        ~H|<.hm_popover_content class="x-consumer">Content</.hm_popover_content>|,
      hm_tooltip: ~H|<.hm_tooltip class="x-consumer">Tooltip</.hm_tooltip>|,
      hm_tooltip_content:
        ~H|<.hm_tooltip_content class="x-consumer">Content</.hm_tooltip_content>|,
      hm_tabs: ~H|<.hm_tabs class="x-consumer">Tabs</.hm_tabs>|,
      hm_tabs_list: ~H|<.hm_tabs_list class="x-consumer">List</.hm_tabs_list>|,
      hm_tabs_trigger: ~H|<.hm_tabs_trigger class="x-consumer" active>One</.hm_tabs_trigger>|,
      hm_tabs_content: ~H|<.hm_tabs_content class="x-consumer" active>Panel</.hm_tabs_content>|,
      hm_stepper: ~H|<.hm_stepper class="x-consumer">Steps</.hm_stepper>|,
      hm_stepper_step:
        ~H|<.hm_stepper_step class="x-consumer" label="Account" description="Sign up" number={1} />|,
      hm_stepper_connector: ~H|<.hm_stepper_connector class="x-consumer" />|,
      hm_empty_state: ~H|<.hm_empty_state class="x-consumer">Empty</.hm_empty_state>|,
      hm_empty_state_icon:
        ~H|<.hm_empty_state_icon class="x-consumer">Icon</.hm_empty_state_icon>|,
      hm_empty_state_title:
        ~H|<.hm_empty_state_title class="x-consumer">Title</.hm_empty_state_title>|,
      hm_empty_state_description:
        ~H|<.hm_empty_state_description class="x-consumer">Text</.hm_empty_state_description>|,
      hm_empty_state_action:
        ~H|<.hm_empty_state_action class="x-consumer">Action</.hm_empty_state_action>|,
      hm_text: ~H|<.hm_text class="x-consumer">Text</.hm_text>|,
      hm_heading: ~H|<.hm_heading class="x-consumer">Heading</.hm_heading>|,
      hm_data_grid_wrapper:
        ~H|<.hm_data_grid_wrapper class="x-consumer">Grid</.hm_data_grid_wrapper>|,
      hm_data_grid: ~H|<.hm_data_grid class="x-consumer">
  <tbody></tbody>
</.hm_data_grid>|,
      hm_file_upload: ~H|<.hm_file_upload class="x-consumer">Upload</.hm_file_upload>|,
      hm_file_upload_placeholder:
        ~H|<.hm_file_upload_placeholder class="x-consumer">Drop</.hm_file_upload_placeholder>|,
      hm_stat: ~H|<.hm_stat class="x-consumer">Stat</.hm_stat>|,
      hm_stat_label: ~H|<.hm_stat_label class="x-consumer">Revenue</.hm_stat_label>|,
      hm_stat_value: ~H|<.hm_stat_value class="x-consumer">$1M</.hm_stat_value>|
    ]
    |> Enum.map(fn {name, rendered} -> {name, rendered_to_string(rendered)} end)
  end

  defp parse(rendered), do: rendered |> rendered_to_string() |> LazyHTML.from_fragment()

  defp html_attr(html, selector, name) do
    case html |> LazyHTML.query(selector) |> LazyHTML.attribute(name) do
      [value] -> value
      [] -> nil
      values -> flunk("expected one #{selector}, got #{length(values)}: #{inspect(values)}")
    end
  end

  defp count(html, selector), do: html |> LazyHTML.query(selector) |> Enum.count()

  describe "every component" do
    test "has a sample render" do
      components =
        Harmonium.Components.__info__(:functions)
        |> Enum.filter(fn {name, arity} ->
          arity == 1 and String.starts_with?("#{name}", "hm_")
        end)
        |> Enum.map(&elem(&1, 0))
        |> Enum.sort()

      assert components == samples() |> Keyword.keys() |> Enum.sort()
    end

    test "merges the consumer class into its own class attribute" do
      for {name, html} <- samples() do
        refute html =~ ~r/class="[^"]*"[^>]*\sclass=/, "#{name} renders two class attributes"

        [class] =
          html
          |> LazyHTML.from_fragment()
          |> LazyHTML.query(".x-consumer")
          |> LazyHTML.attribute("class")

        assert class =~ ~r/(^|\s)hm-[a-z-]+\s+x-consumer$/,
               "#{name} rendered class=#{inspect(class)}"
      end
    end

    test "only emits classes that exist in priv/static/harmonium.css" do
      css = File.read!(Harmonium.css_path())
      source = File.read!("lib/harmonium/components.ex")

      rendered =
        for {_name, html} <- samples(),
            class <-
              html
              |> LazyHTML.from_fragment()
              |> LazyHTML.query("[class]")
              |> LazyHTML.attribute("class"),
            do: class

      classes =
        (Regex.scan(~r/\bhm-[a-z0-9-]+/, Enum.join(rendered, " ")) ++
           Regex.scan(~r/"(hm-[a-z0-9-]+)"/, source, capture: :all_but_first))
        |> List.flatten()
        |> Enum.uniq()

      assert length(classes) > 40

      missing =
        Enum.reject(classes, fn class ->
          css =~ ~r/\.#{Regex.escape(class)}(?![a-zA-Z0-9_-])/
        end)

      assert missing == [], "classes missing from harmonium.css: #{inspect(missing)}"
    end

    test "passes global attributes through" do
      assigns = %{}

      html =
        parse(~H|<.hm_card id="settings" data-test="card" aria-label="Settings">Hi</.hm_card>|)

      assert html_attr(html, "#settings", "data-test") == "card"
      assert html_attr(html, "#settings", "aria-label") == "Settings"
    end
  end

  describe "hm_button" do
    test "renders variant, size and expanded" do
      assigns = %{}

      html =
        parse(~H|<.hm_button variant="outline" size="lg" expanded type="submit">Go</.hm_button>|)

      assert String.trim(html_attr(html, "button", "class")) == "hm-button"
      assert html_attr(html, "button", "data-variant") == "outline"
      assert html_attr(html, "button", "data-size") == "lg"
      assert html_attr(html, "button", "data-expanded") == ""
      assert html_attr(html, "button", "type") == "submit"
    end

    test "omits data-expanded by default" do
      assigns = %{}
      html = parse(~H"<.hm_button>Go</.hm_button>")
      assert html_attr(html, "button", "data-variant") == "primary"
      assert html_attr(html, "button", "data-expanded") == nil
    end
  end

  describe "layout" do
    test "hm_card defaults" do
      assigns = %{}
      html = parse(~H"<.hm_card>
  <.hm_card_body>Body</.hm_card_body>
</.hm_card>")
      assert html_attr(html, ".hm-card", "data-variant") == "elevated"
      assert html_attr(html, ".hm-card", "data-padding") == "md"
      assert count(html, ".hm-card > .hm-card-body") == 1
    end

    test "hm_stack and hm_group render layout data attributes" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_stack direction="horizontal" gap="lg" align="center" justify="between" wrap>
          <.hm_group gap="sm" grow>Items</.hm_group>
        </.hm_stack>
        """)

      assert html_attr(html, ".hm-stack", "data-direction") == "horizontal"
      assert html_attr(html, ".hm-stack", "data-gap") == "lg"
      assert html_attr(html, ".hm-stack", "data-align") == "center"
      assert html_attr(html, ".hm-stack", "data-justify") == "between"
      assert html_attr(html, ".hm-stack", "data-wrap") == ""
      assert html_attr(html, ".hm-group", "data-gap") == "sm"
      assert html_attr(html, ".hm-group", "data-grow") == ""
      assert html_attr(html, ".hm-group", "data-wrap") == nil
    end

    test "hm_separator has separator semantics" do
      assigns = %{}
      html = parse(~H|<.hm_separator orientation="vertical" spacing="sm" />|)
      assert html_attr(html, "hr", "role") == "separator"
      assert html_attr(html, "hr", "aria-orientation") == "vertical"
      assert html_attr(html, "hr", "data-orientation") == "vertical"
      assert html_attr(html, "hr", "data-spacing") == "sm"
    end
  end

  describe "feedback" do
    test "hm_badge defaults to neutral like React" do
      assigns = %{}
      html = parse(~H"<.hm_badge>New</.hm_badge>")
      assert html_attr(html, "span", "data-variant") == "neutral"
      assert html_attr(html, "span", "data-size") == "md"
    end

    test "hm_alert has role=alert and an optional dismiss button" do
      assigns = %{}
      html = parse(~H|<.hm_alert variant="error">Failed</.hm_alert>|)
      assert html_attr(html, ".hm-alert", "role") == "alert"
      assert html_attr(html, ".hm-alert", "data-variant") == "error"

      assert html |> LazyHTML.query(".hm-alert > .hm-alert-content") |> LazyHTML.text() ==
               "Failed"

      assert count(html, ".hm-alert-dismiss") == 0

      html = parse(~H|<.hm_alert dismissible on_dismiss="clear">Failed</.hm_alert>|)
      assert html_attr(html, ".hm-alert-dismiss", "aria-label") == "Dismiss"
      assert html_attr(html, ".hm-alert-dismiss", "phx-click") == "clear"
      assert html_attr(html, ".hm-alert-dismiss", "type") == "button"
    end

    test "hm_spinner renders its circle and a status label" do
      assigns = %{}
      html = parse(~H|<.hm_spinner size="lg" />|)
      assert count(html, ".hm-spinner > .hm-spinner-circle") == 1
      assert html_attr(html, ".hm-spinner", "role") == "status"
      assert html_attr(html, ".hm-spinner", "aria-label") == "Loading"
      assert html_attr(html, ".hm-spinner", "data-size") == "lg"

      html = parse(~H|<.hm_spinner label="Saving" />|)
      assert html_attr(html, ".hm-spinner", "aria-label") == "Saving"
    end

    test "hm_progress has progressbar semantics and a width" do
      assigns = %{}
      html = parse(~H|<.hm_progress value={30} max={60} variant="success" />|)
      assert html_attr(html, ".hm-progress", "role") == "progressbar"
      assert html_attr(html, ".hm-progress", "aria-valuenow") == "30"
      assert html_attr(html, ".hm-progress", "aria-valuemin") == "0"
      assert html_attr(html, ".hm-progress", "aria-valuemax") == "60"
      assert html_attr(html, ".hm-progress-bar", "style") == "width: 50%"
      assert count(html, ".hm-progress-label") == 0
    end

    test "hm_progress clamps and survives max={0}" do
      assigns = %{}

      assert html_attr(parse(~H"<.hm_progress value={5} max={0} />"), ".hm-progress-bar", "style") ==
               "width: 0%"

      assert html_attr(parse(~H"<.hm_progress value={150} />"), ".hm-progress-bar", "style") ==
               "width: 100%"

      assert html_attr(parse(~H"<.hm_progress value={-5} />"), ".hm-progress-bar", "style") ==
               "width: 0%"

      assert html_attr(parse(~H"<.hm_progress value={1} max={3} />"), ".hm-progress-bar", "style") ==
               "width: 33.33%"
    end

    test "hm_progress label sits inside the bar" do
      assigns = %{}
      html = parse(~H"<.hm_progress value={2} max={3} show_label />")

      assert html
             |> LazyHTML.query(".hm-progress-bar > .hm-progress-label")
             |> LazyHTML.text()
             |> String.trim() == "67%"

      html = parse(~H"<.hm_progress value={2} max={3}>2 of 3</.hm_progress>")

      assert html |> LazyHTML.query(".hm-progress-label") |> LazyHTML.text() |> String.trim() ==
               "2 of 3"
    end

    test "hm_skeleton is hidden from assistive technology and sized by style" do
      assigns = %{}
      html = parse(~H|<.hm_skeleton variant="circular" width="40px" height="40px" />|)
      assert html_attr(html, ".hm-skeleton", "aria-hidden") == "true"
      assert html_attr(html, ".hm-skeleton", "style") == "width: 40px; height: 40px;"
      assert html_attr(parse(~H"<.hm_skeleton />"), ".hm-skeleton", "style") == nil

      html = parse(~H|<.hm_skeleton width="5rem" style="margin: 0;" />|)
      assert html_attr(html, ".hm-skeleton", "style") == "width: 5rem; margin: 0;"
    end

    test "hm_toast is a polite status with an optional dismiss button" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_toast_container position="bottom-left">
          <.hm_toast variant="success">Saved</.hm_toast>
        </.hm_toast_container>
        """)

      assert html_attr(html, ".hm-toast-container", "data-position") == "bottom-left"
      assert html_attr(html, ".hm-toast-toast", "role") == "status"
      assert html_attr(html, ".hm-toast-toast", "aria-live") == "polite"
      assert html_attr(html, ".hm-toast-toast", "data-variant") == "success"
      assert html |> LazyHTML.query(".hm-toast-message") |> LazyHTML.text() == "Saved"
      assert count(html, ".hm-toast-dismiss") == 0

      html = parse(~H|<.hm_toast on_dismiss="dismiss">Saved</.hm_toast>|)
      assert html_attr(html, ".hm-toast-dismiss", "phx-click") == "dismiss"
    end
  end

  describe "overlays" do
    test "hm_dialog renders inside its overlay only while open" do
      assigns = %{}
      assert rendered_to_string(~H"<.hm_dialog>Hidden</.hm_dialog>") == ""

      html =
        parse(~H"""
        <.hm_dialog open size="lg" on_close="close" aria-labelledby="title">
          <.hm_dialog_header>
            <h2 id="title">Title</h2>
          </.hm_dialog_header>
          <.hm_dialog_body>Body</.hm_dialog_body>
          <.hm_dialog_footer>Footer</.hm_dialog_footer>
        </.hm_dialog>
        """)

      assert count(html, ".hm-dialog-overlay > .hm-dialog") == 1
      assert html_attr(html, ".hm-dialog", "role") == "dialog"
      assert html_attr(html, ".hm-dialog", "aria-modal") == "true"
      assert html_attr(html, ".hm-dialog", "data-size") == "lg"
      assert html_attr(html, ".hm-dialog", "aria-labelledby") == "title"
      assert html_attr(html, ".hm-dialog", "phx-click-away") == "close"
      assert html_attr(html, ".hm-dialog", "phx-window-keydown") == "close"
      assert html_attr(html, ".hm-dialog", "phx-key") == "escape"

      assert count(html, ".hm-dialog > .hm-dialog-header + .hm-dialog-body + .hm-dialog-footer") ==
               1
    end

    test "hm_dialog without on_close has no close bindings" do
      assigns = %{}
      html = parse(~H"<.hm_dialog open>Body</.hm_dialog>")
      assert html_attr(html, ".hm-dialog", "phx-key") == nil
      assert html_attr(html, ".hm-dialog", "phx-click-away") == nil
    end

    test "hm_drawer renders inside its overlay only while open" do
      assigns = %{}
      assert rendered_to_string(~H"<.hm_drawer>Hidden</.hm_drawer>") == ""

      html = parse(~H|<.hm_drawer open side="left" size="sm">Nav</.hm_drawer>|)
      assert count(html, ".hm-drawer-overlay > .hm-drawer") == 1
      assert html_attr(html, ".hm-drawer", "role") == "dialog"
      assert html_attr(html, ".hm-drawer", "data-side") == "left"
      assert html_attr(html, ".hm-drawer", "data-size") == "sm"
    end

    test "hm_popover and hm_tooltip" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_popover>
          <.hm_popover_trigger>Open</.hm_popover_trigger>
          <.hm_popover_content side="top">Content</.hm_popover_content>
        </.hm_popover>
        <.hm_tooltip>
          Hover
          <.hm_tooltip_content side="right">Tip</.hm_tooltip_content>
        </.hm_tooltip>
        """)

      assert count(html, ".hm-popover > .hm-popover-trigger + .hm-popover-content") == 1
      assert html_attr(html, ".hm-popover-content", "data-side") == "top"
      assert html_attr(html, ".hm-tooltip-content", "role") == "tooltip"
      assert html_attr(html, ".hm-tooltip-content", "data-side") == "right"
    end
  end

  describe "navigation" do
    test "hm_tabs have tab roles and state" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_tabs>
          <.hm_tabs_list>
            <.hm_tabs_trigger active>One</.hm_tabs_trigger>
            <.hm_tabs_trigger>Two</.hm_tabs_trigger>
          </.hm_tabs_list>
          <.hm_tabs_content active>Panel one</.hm_tabs_content>
          <.hm_tabs_content>Panel two</.hm_tabs_content>
        </.hm_tabs>
        """)

      assert html_attr(html, ".hm-tabs-list", "role") == "tablist"

      assert html |> LazyHTML.query("[role=tab]") |> LazyHTML.attribute("aria-selected") == [
               "true",
               "false"
             ]

      assert html |> LazyHTML.query(".hm-tabs-trigger") |> LazyHTML.attribute("data-state") == [
               "active",
               "inactive"
             ]

      assert html |> LazyHTML.query(".hm-tabs-trigger") |> LazyHTML.attribute("type") == [
               "button",
               "button"
             ]

      assert String.trim(html_attr(html, "[role=tabpanel]", "class")) == "hm-tabs-content"

      assert html |> LazyHTML.query("[role=tabpanel]") |> LazyHTML.text() |> String.trim() ==
               "Panel one"
    end

    test "hm_stepper renders indicators, labels and connectors" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_stepper orientation="vertical">
          <.hm_stepper_step state="completed" number={1} label="Account" />
          <.hm_stepper_connector state="completed" />
          <.hm_stepper_step state="active" number={2} label="Profile" description="Tell us more" />
        </.hm_stepper>
        """)

      assert html_attr(html, ".hm-stepper", "role") == "list"
      assert html_attr(html, ".hm-stepper", "data-orientation") == "vertical"
      assert count(html, ".hm-stepper-step[role=listitem]") == 2

      assert html |> LazyHTML.query(".hm-stepper-indicator") |> LazyHTML.attribute("data-state") ==
               ["completed", "active"]

      assert html
             |> LazyHTML.query(".hm-stepper-indicator")
             |> Enum.map(&String.trim(LazyHTML.text(&1))) ==
               ["✓", "2"]

      assert html |> LazyHTML.query(".hm-stepper-label") |> Enum.map(&LazyHTML.text/1) == [
               "Account",
               "Profile"
             ]

      assert html |> LazyHTML.query(".hm-stepper-description") |> LazyHTML.text() ==
               "Tell us more"

      assert html_attr(html, ".hm-stepper-connector", "data-state") == "completed"
    end
  end

  describe "typography" do
    test "hm_heading defaults to h2 with the level's size" do
      assigns = %{}
      html = parse(~H"<.hm_heading>Title</.hm_heading>")
      assert String.trim(html_attr(html, "h2", "class")) == "hm-typography-heading"
      assert html_attr(html, "h2", "data-size") == "3xl"

      html = parse(~H"<.hm_heading level={1}>Title</.hm_heading>")
      assert html_attr(html, "h1", "data-size") == "4xl"

      html = parse(~H|<.hm_heading level={4} size="sm">Title</.hm_heading>|)
      assert html_attr(html, "h4", "data-size") == "sm"
    end

    test "hm_text renders a p with size md by default" do
      assigns = %{}
      html = parse(~H"<.hm_text>Body</.hm_text>")
      assert String.trim(html_attr(html, "p", "class")) == "hm-typography-text"
      assert html_attr(html, "p", "data-size") == "md"
      assert html_attr(html, "p", "data-truncate") == nil

      html = parse(~H|<.hm_text as="span" weight="bold" color="muted" truncate>Body</.hm_text>|)
      assert html_attr(html, "span", "data-weight") == "bold"
      assert html_attr(html, "span", "data-color") == "muted"
      assert html_attr(html, "span", "data-truncate") == ""
    end
  end

  describe "content" do
    test "hm_empty_state composes its parts" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_empty_state size="lg">
          <.hm_empty_state_icon>*</.hm_empty_state_icon>
          <.hm_empty_state_title>No items</.hm_empty_state_title>
          <.hm_empty_state_description>Add one.</.hm_empty_state_description>
          <.hm_empty_state_action><button>Add</button></.hm_empty_state_action>
        </.hm_empty_state>
        """)

      assert html_attr(html, ".hm-empty-state", "data-size") == "lg"
      assert count(html, "h3.hm-empty-state-title") == 1
      assert count(html, "p.hm-empty-state-description") == 1
      assert count(html, ".hm-empty-state-action > button") == 1
    end

    test "hm_data_grid flags" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_data_grid_wrapper>
          <.hm_data_grid striped>
            <tbody>
              <tr>
                <td>1</td>
              </tr>
            </tbody>
          </.hm_data_grid>
        </.hm_data_grid_wrapper>
        """)

      assert count(html, ".hm-data-grid-wrapper > table.hm-data-grid") == 1
      assert html_attr(html, "table", "data-striped") == ""
      assert html_attr(html, "table", "data-hoverable") == nil
    end

    test "hm_file_upload and hm_stat" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_file_upload disabled>
          <.hm_file_upload_placeholder>Drop files</.hm_file_upload_placeholder>
        </.hm_file_upload>
        <.hm_stat>
          <.hm_stat_label>Revenue</.hm_stat_label>
          <.hm_stat_value>$1M</.hm_stat_value>
        </.hm_stat>
        """)

      assert html_attr(html, ".hm-file-upload", "data-disabled") == ""
      assert count(html, ".hm-file-upload > .hm-file-upload-placeholder") == 1
      assert count(html, ".hm-stat > .hm-stat-label + .hm-stat-value") == 1
    end
  end

  describe "forms" do
    defp build_form(params, errors \\ []) do
      to_form(params, as: :user, errors: errors)
    end

    test "hm_input fills id, name and value from a form field" do
      assigns = %{form: build_form(%{"email" => "ada@example.com"})}
      html = parse(~H|<.hm_input field={@form[:email]} type="email" placeholder="Email" />|)

      assert html_attr(html, "input", "id") == "user_email"
      assert html_attr(html, "input", "name") == "user[email]"
      assert html_attr(html, "input", "value") == "ada@example.com"
      assert html_attr(html, "input", "type") == "email"
      assert html_attr(html, "input", "placeholder") == "Email"
      assert html_attr(html, "input", "data-size") == "md"
      assert html_attr(html, "input", "aria-invalid") == nil
    end

    test "explicit attributes win over the form field" do
      assigns = %{form: build_form(%{"email" => "ada@example.com"})}
      html = parse(~H|<.hm_input field={@form[:email]} id="custom" value="other" />|)

      assert html_attr(html, "input", "id") == "custom"
      assert html_attr(html, "input", "value") == "other"
      assert html_attr(html, "input", "name") == "user[email]"
    end

    test "errors on a used field mark the control invalid" do
      assigns = %{
        form:
          build_form(%{"email" => ""},
            email: {"must be at least %{count} characters", [count: 3]}
          )
      }

      html =
        parse(~H"""
        <.hm_field field={@form[:email]}>
          <.hm_field_label field={@form[:email]}>Email</.hm_field_label>
          <.hm_input field={@form[:email]} />
          <.hm_field_error field={@form[:email]} />
        </.hm_field>
        """)

      assert html_attr(html, ".hm-field", "data-error") == ""
      assert html_attr(html, "label", "for") == "user_email"
      assert html_attr(html, "input", "aria-invalid") == "true"
      assert html_attr(html, "input", "aria-errormessage") == "user_email-error"
      assert html_attr(html, ".hm-field-error", "id") == "user_email-error"
      assert html_attr(html, ".hm-field-error", "role") == "alert"

      assert html |> LazyHTML.query(".hm-field-error") |> LazyHTML.text() |> String.trim() ==
               "must be at least 3 characters"
    end

    test "errors on an unused field are not shown" do
      assigns = %{form: build_form(%{}, email: {"can't be blank", []})}

      html =
        parse(~H"""
        <.hm_field field={@form[:email]}>
          <.hm_input field={@form[:email]} />
          <.hm_field_error field={@form[:email]} />
        </.hm_field>
        """)

      assert html_attr(html, ".hm-field", "data-error") == nil
      assert html_attr(html, "input", "aria-invalid") == nil
      assert count(html, ".hm-field-error") == 0
    end

    test "hm_field_error renders explicit errors and inner blocks" do
      assigns = %{}
      html = parse(~H|<.hm_field_error errors={["Too short", "Taken"]} />|)
      assert count(html, ".hm-field-error br") == 1
      assert html |> LazyHTML.query(".hm-field-error") |> LazyHTML.text() =~ "Too short"
      assert html |> LazyHTML.query(".hm-field-error") |> LazyHTML.text() =~ "Taken"

      html = parse(~H"<.hm_field_error>Required</.hm_field_error>")

      assert html |> LazyHTML.query(".hm-field-error") |> LazyHTML.text() |> String.trim() ==
               "Required"
    end

    test "hm_input accepts plain errors without a form" do
      assigns = %{}
      html = parse(~H|<.hm_input name="q" errors={["Invalid"]} size="sm" />|)
      assert html_attr(html, "input", "aria-invalid") == "true"
      assert html_attr(html, "input", "aria-errormessage") == nil
      assert html_attr(html, "input", "data-size") == "sm"
    end

    test "hm_textarea renders the field value as content" do
      assigns = %{form: build_form(%{"bio" => "Hello <world>"})}
      html = parse(~H|<.hm_textarea field={@form[:bio]} rows="4" />|)

      assert html_attr(html, "textarea", "name") == "user[bio]"
      assert html_attr(html, "textarea", "id") == "user_bio"
      assert html_attr(html, "textarea", "rows") == "4"
      assert html |> LazyHTML.query("textarea") |> LazyHTML.text() == "Hello <world>"
    end

    test "hm_select renders options with the field value selected" do
      assigns = %{form: build_form(%{"role" => "admin"})}

      html =
        parse(~H"""
        <.hm_select
          field={@form[:role]}
          placeholder="Choose a role"
          options={[{"Admin", "admin"}, {"Member", "member"}]}
        />
        """)

      assert html_attr(html, "select", "name") == "user[role]"
      assert html_attr(html, "select", "data-size") == "md"
      assert html_attr(html, "option[selected]", "value") == "admin"
      assert html_attr(html, "option[disabled]", "value") == ""
    end

    test "hm_select selects the placeholder without a value and suffixes multiple names" do
      assigns = %{form: build_form(%{})}

      html =
        parse(~H|<.hm_select field={@form[:role]} placeholder="Choose" options={["a", "b"]} />|)

      assert html_attr(html, "option[selected]", "value") == ""

      html = parse(~H|<.hm_select field={@form[:tags]} multiple options={["a", "b"]} />|)
      assert html_attr(html, "select", "name") == "user[tags][]"
      assert html_attr(html, "select", "multiple") == ""
    end

    test "hm_select renders inner options" do
      assigns = %{}

      html =
        parse(~H"""
        <.hm_select name="size">
          <option value="s">Small</option>
        </.hm_select>
        """)

      assert html_attr(html, "option", "value") == "s"
    end
  end

  describe "translate_error/1" do
    test "interpolates options" do
      assert Harmonium.Components.translate_error({"min %{count} of %{max}", [count: 2, max: 5]}) ==
               "min 2 of 5"

      assert Harmonium.Components.translate_error("plain") == "plain"
    end
  end
end
