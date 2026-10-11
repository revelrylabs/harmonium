---
'harmonium': patch
---

Accessibility and correctness fixes for navigation, data and layout components.

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
