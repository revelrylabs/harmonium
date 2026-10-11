---
'harmonium': patch
---

A `TopBar` inside `AppShellHeader` now renders a `<div>` instead of a second `<header>`, so the page has one banner landmark instead of two nested ones. A `TopBar` used on its own still renders `<header>`. Found by the new axe checks, which now cover every component in each state shown in Storybook (open overlays, Field errors, disabled controls, variants), alongside new keyboard tests for Drawer, Popover, Checkbox, Switch, RadioGroup, Slider, DatePicker, TimePicker, FileUpload, DataGrid, Pagination, Breadcrumbs, Sidebar and Toast.
