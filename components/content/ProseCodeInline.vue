<template>
  <code class="inline-code px-1.5 py-0.5 text-sm font-mono font-medium rounded-md inline-block border bg-muted/50">
    <slot />
  </code>
</template>

<style scoped>
.inline-code {
  /* :not(h1>code, h1>a>code, h2>a>code, h3>a>code, h4>a>code, h5>a>code, strong>a>code) { */
  /* text-sm
  font-size: 0.875rem;
  line-height: 1.25rem;*/
  font-size: 0.875em;
  line-height: 1.25rem;
}

/* p .inline-code {
  vertical-align: -0.05rem;
} */

strong .inline-code {
  font-weight: inherit;
}
</style>
