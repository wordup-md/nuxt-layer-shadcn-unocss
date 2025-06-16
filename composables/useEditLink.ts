export function useEditLink() {
  const { page } = useContent()
  const { enable, pattern, text, icon, placement } = useConfig().value.main.editLink

  const url = computed(
    () => pattern.replace(/:path/g, page.value._file ?? ''),
  )

  const enabled = computed(
    () => enable && page.value.editLink !== false && page.value._file && url.value !== '',
  )

  const enabledToc = computed(
    () => enabled.value && placement.includes('toc'),
  )
  const enabledPageFooter = computed(
    () => enabled.value && placement.includes('pageFooter'),
  )

  return {
    url,
    text,
    icon,
    enabledToc,
    enabledPageFooter,
  }
}
