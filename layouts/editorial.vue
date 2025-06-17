<template>
  <div class="[--padding-inline:1rem] md:[--padding-inline:2rem] mb-12">
    <slot />
  </div>
</template>

<style lang="css">
.content-grid {
  --content-max-width: 80ch;
  --wide-content-max-width: var(--breakpoint-container);
  --wide-content-size: calc((var(--wide-content-max-width) - var(--content-max-width)) / 2 - var(--padding-inline));

  display: grid;
  grid-template-columns:
    [full-width-start] minmax(var(--padding-inline), 1fr)
    [wide-content-start] minmax(0, var(--wide-content-size))
    [content-start] min(100% - (var(--padding-inline) * 2), var(--content-max-width))
    [content-end] minmax(0, var(--wide-content-size))
    [wide-content-end] minmax(var(--padding-inline), 1fr)
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
    max-width: min(100% - (var(--padding-inline) * 2), var(--content-max-width));
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
  max-width: min(100% - (var(--padding-inline) * 2), var(--wide-content-max-width) - (var(--padding-inline) * 2));
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
