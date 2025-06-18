<template>
  <div class="[--padding-inline:1rem] md:[--padding-inline:2rem] mb-12">
    <slot />
  </div>
</template>

<style lang="css">
.content-grid {
  --epi: var(--padding-inline, 1rem);
  --ecmw: var(--editorial-content-max-width, 80ch);
  --ewcmw: var(--editorial-wide-content-max-width, 1280px);
  --wcs: calc((var(--ewcmw) - var(--ecmw)) / 2 - var(--epi));

  display: grid;
  grid-template-columns:
    [full-width-start] minmax(var(--epi), 1fr)
    [wide-content-start] minmax(0, var(--wcs))
    [content-start] min(100% - (var(--epi) * 2), var(--ecmw))
    [content-end] minmax(0, var(--wcs))
    [wide-content-end] minmax(var(--epi), 1fr)
    [full-width-end];
}

.content-grid > :not(.wide-content, .full-width),
.full-width:not(.wide-content) > :not(.wide-content, .full-width) {
  grid-column: content;
}

.content-grid > .wide-content,
.content-grid > div:has(.wide-content),
/* .content-grid > section.wide-content > div { */
.content-grid > div[data-node-view-root="true"] > .wide-content > div {
  grid-column: wide-content;
}

.content-grid > .full-width {
  grid-column: full-width;

  & > * {
    max-width: min(100% - (var(--epi) * 2), var(--ecmw));
    margin-left: auto;
    margin-right: auto;
  }
  /* &>* {
    display: grid;
    grid-template-columns: inherit;
  } */
}
.content-grid > .full-width.wide-content > *   {
  grid-column: wide-content;
  max-width: min(100% - (var(--epi) * 2), var(--ewcmw) - (var(--epi) * 2));
  margin-left: auto;
  margin-right: auto;
}
/* .content-grid>.full-width.content-grid {
  display: grid;
  grid-template-columns: inherit;
} */

.content-grid>[data-node-view-root="true"]:has(.full-width) {
  grid-column: full-width;
  grid-template-columns: inherit;

  &>* {
    display: grid;
    grid-template-columns: inherit;
  }
}

.content-grid > .full-width.full-content > * {
  max-width: 100%;
}

.EDITOR_CONTENT.content-grid {
  padding-top: 1rem;
}

.header-over {
  margin-top: calc((var(--header-height) + var(--banner-height)) * -1);
  & .content-grid > :first-child {
    padding-top: calc(var(--header-height) + var(--banner-height) + 6rem);
  }
}
</style>
