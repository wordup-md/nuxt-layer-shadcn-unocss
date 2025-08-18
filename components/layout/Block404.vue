<script lang="ts" setup>

</script>

<template>
  <div class="col-span-3 mt-[20vh] flex flex-col items-center justify-center">
    <div class="col-span-3 mb-12 flex items-center justify-center">
      <h3 class="scroll-m-20 border-r px-4 py-3 text-2xl font-semibold">
        404
      </h3>
      <span class="scroll-m-20 px-4"> {{ $t('This page could not be found.') }} </span>
    </div>

    <slot>
      <ButtonLink
        to="/"
        as="a"
        icon="lucide:home"
      >
        {{ $t('Go to home') }}
      </ButtonLink>
    </slot>
  </div>
</template>
