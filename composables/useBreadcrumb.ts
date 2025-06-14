import type { NavItem } from '@nuxt/content'

export function useBreadcrumb(url: string, navigation?: NavItem[]): BreadcrumbItem[] {
  const config = useConfig()
  const { navigation: _nav } = useContent()
  const breadcrumbItems: BreadcrumbItem[] = []

  // Remove empty segments
  const segments = url.split('/').filter(segment => segment !== '')

  // Construct breadcrumb for each segment
  let href = ''
  let nav = navigation || _nav.value

  if (!nav) return []

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i].replace('.html', '')
    href += `/${segment}`
    const page = nav?.find(x => (x._path as string) === href)
    nav = page?.children

    breadcrumbItems.push({
      title: page?.title ?? segment,
      href,
      icon: page?.icon,
      image: page?.image,
    })
  }

  // Add home to breadcrumb
  const _home = config.value.main.breadCrumb.home
  if (_home) {
    const defaultHome = {
      title: '',
      href: '/',
      icon: 'i-lucide-house',
      iconSize: 18,
    }
    const __home = typeof _home === 'object' ? Object.assign(defaultHome, _home) : defaultHome
    breadcrumbItems.unshift({
      title: __home.title,
      href: '/',
      icon: __home.icon,
      iconSize: __home.iconSize,
    })
  }

  return breadcrumbItems
}
