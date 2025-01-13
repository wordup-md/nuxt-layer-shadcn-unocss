<template>
  <div>
    <slot />
  </div>
</template>

<style lang="postcss">
.content-grid {
  --padding-inline: 1rem;
  --content-max-width: 90ch;
  --breakout-max-width: var(--breakpoint-xl);

  --breakout-size: calc((var(--breakout-max-width) - var(--content-max-width)) / 2);

  display: grid;
  grid-template-columns:
    [full-width-start] minmax(var(--padding-inline), 1fr) [breakout-start] minmax(0, var(--breakout-size)) [content-start] min(100% - (var(--padding-inline) * 2),
      var(--content-max-width)) [content-end] minmax(0, var(--breakout-size)) [breakout-end] minmax(var(--padding-inline), 1fr) [full-width-end];
}

.content-grid> :not(.breakout, .full-width),
.full-width:not(.breakout)> :not(.breakout, .full-width) {
  grid-column: content;
}

.content-grid>.breakout,
.content-grid>div:has(.breakout),
.content-grid>section.breakout>div,
.content-grid>div[data-node-view-root="true"]>section.breakout>div {
  grid-column: breakout;
}

.content-grid>.full-width {
  grid-column: full-width;

  display: grid;
  grid-template-columns: inherit;
}

.content-grid>div:has(.full-width) {
  grid-column: full-width;
  grid-template-columns: inherit;

  &>* {
    display: grid;
    grid-template-columns: inherit;
  }
}
</style>
