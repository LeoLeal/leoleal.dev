## 1. Shared page shell

- [x] 1.1 Create empty Menu and Footer Astro components with `nav` and `footer` semantic roots, respectively.
- [x] 1.2 Update the shared Layout to render Menu, empty named hero slot, empty named main slot, and Footer in that direct-sibling order.
- [x] 1.3 Remove the legacy unnamed layout slot and ensure the layout adds neither a header wrapper nor a main wrapper.

## 2. Page adoption and semantic verification

- [x] 2.1 Migrate the homepage to provide its existing primary content through the named main slot while retaining one page-owned `main` landmark.
- [x] 2.2 Verify the rendered homepage has the specified Menu → hero region → main region → Footer order, with no slot fallback content and no layout-owned header or main wrapper.
- [x] 2.3 Verify keyboard and landmark behavior remains valid with the empty placeholder navigation and footer; confirm the existing `lang` prop and English route remain unchanged and the layout API can be used by the Portuguese route.

## 3. Quality checks

- [x] 3.1 Run `pnpm format:check`.
- [x] 3.2 Run `pnpm build`.
