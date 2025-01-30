interface BreadcrumbItem {
  title: string
  href: string
  icon?: string
  classes?: string
}

export function useBreadcrumb(url: string): BreadcrumbItem[] {
  const { navigation } = useContent()
  const breadcrumbItems: BreadcrumbItem[] = []

  // Remove empty segments
  const segments = url.split('/').filter(segment => segment !== '')

  // segments.unshift("");
  // Construct breadcrumb for each segment
  let href = ''
  let nav = navigation.value

  if (!nav) return []

  const home = nav?.find(x => (x._path as string) === '/')

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i].replace('.html', '')
    href += `/${segment}`
    const page = nav?.find(x => (x._path as string) === href)
    nav = page?.children

    breadcrumbItems.push({
      title: page?.title ?? segment,
      href,
      icon: page?.icon,
    })
  }

  const showHomeTitle = false
  breadcrumbItems.unshift({
    title: showHomeTitle ? home?.title : '',
    href: '/',
    icon: home?.icon || 'i-lucide-house',
    classes: 'transform scale-120',
  })
  return breadcrumbItems
}
