---
'harmonium': patch
---

Smaller app bundles and cleaner packaging:

- Each component is now its own module in `dist/`, so `import {Button} from 'harmonium'` pulls in only Button (about 0.5 KB gzipped, was about 114 KB with all of Base UI). Each component also has its own entry point, e.g. `import {Button} from 'harmonium/button'`. `harmonium/package.json` is exported too.
- CSS Module class names are prefixed (`hm_Button_root`), so they can't collide with an app's own CSS Modules.
- The build-only `scripts/` folder is no longer published.
