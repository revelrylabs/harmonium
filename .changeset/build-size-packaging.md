---
'harmonium': patch
---

Smaller app bundles and cleaner packaging:

- Each component is now its own module in `dist/`, so `import {Button} from 'harmonium'` pulls in only Button (about 0.5 KB gzipped, was about 124 KB with all of Base UI). Components defined in the same file drop out too: `import {Heading}` no longer brings in `Text`, and `import {TableRow}` no longer brings in the other Table parts.
- Each component also has its own entry point, named in kebab-case: `import {Button} from 'harmonium/button'`, `import {ToggleGroup} from 'harmonium/toggle-group'`. These resolve for TypeScript's older `node10` module resolution too. `harmonium/package.json` is exported. You still import `harmonium/styles.css` once.
- Generated CSS Module class names are now prefixed (`Button_root` is now `hm_Button_root`), so they can't collide with an app's own CSS Modules. They were never a public API; the `data-*` attributes and the global `hm-*` classes in `harmonium.css` are unchanged.
- The build-only `scripts/` folder is no longer published.
