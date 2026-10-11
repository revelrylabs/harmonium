---
'harmonium': patch
---

Dark-mode-ready color tokens, contrast, reduced motion and forced-colors focus rings.

- New semantic color tokens: `--harmonium-color-surface-raised`, `-surface-muted`, `-surface-hover`, `-surface-active`, `-surface-neutral`, `-surface-strong`, `-surface-inverse`, `-text-placeholder` and `-text-inverse`. Light values match the previous look. Component CSS now uses only these semantic tokens (never `--harmonium-color-gray-*`), so the README's `[data-theme="dark"]` block themes every component; that block now lists a complete, AA-checked dark set.
- `--harmonium-color-text-muted` darkened from `#818181` (3.9:1 on white) to `#636363` (6.0:1 on white, 4.8:1 on the neutral fill). Placeholders use the new `--harmonium-color-text-placeholder` (`#767676`, 4.5:1). Avatar initials now use the muted text on the neutral fill.
- Every transition and animation respects `prefers-reduced-motion: reduce` (Skeleton stops pulsing, Spinner slows down).
- Focus rings on Input, Select, Textarea, DatePicker, TimePicker, Combobox, MultiSelect, NumberInput and CommandPalette add a transparent outline, so Windows forced-colors mode still shows focus.
- `@keyframes` are namespaced: `hm-spinner-spin` and `hm-skeleton-pulse` (previously the generic `spin` / `pulse` in `harmonium.css`).
- Select: the size padding no longer overrides the chevron's right padding, and the placeholder option shows in the placeholder color.
- AppShell: `sidebarCollapsed` now narrows the sidebar column to 60px, and the mobile layout switches below 768px instead of overlapping the `min-width: 768px` breakpoint.
- Drawer is capped at `max-width: 100vw`; PricingTable columns wrap onto more rows on narrow screens instead of overflowing.
- Progress label styled as text below the bar; CommandPalette's empty list has no padding; FileUpload styles `aria-disabled="true"` as disabled.
