/** Configuration interface for shadcn-docs theme */
interface DefaultConfig {
  /**
   * Global site configuration settings
   */
  site: {
    /**
     * Site name used in metadata and title
     *
     * @default 'shadcn-docs'
     */
    name: string
    /**
     * Site description for SEO purposes
     *
     * @default 'Beautifully designed Nuxt Content template built with shadcn-vue'
     */
    description: string
    /**
     * Default OpenGraph image path
     *
     * @default '/hero.png'
     */
    ogImage: string
    /**
     * Component name to use for OpenGraph image generation
     *
     * @default 'ShadcnDocs'
     */
    ogImageComponent: string
    /**
     * Color scheme for OpenGraph image
     *
     * @values 'dark', 'light'
     * @default 'light'
     */
    ogImageColor: 'dark' | 'light'
    /**
     * Umami analytics configuration
     */
    umami: {
      /**
       * Enable or disable Umami analytics
       *
       * @default false
       */
      enable: boolean
      /**
       * Umami script source URL
       *
       * @default 'https://cloud.umami.is/script.js'
       */
      src: string
      /**
       * Umami website ID for analytics
       *
       * @default ''
       */
      dataWebsiteId: string
    }
  }
  /**
   * Theme customization settings
   */
  theme: {
    /**
     * Allow users to customize theme settings
     *
     * @default true
     */
    customizable: boolean
    /**
     * Primary color scheme for the theme
     *
     * @values 'zinc', 'slate', 'stone', 'gray', 'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow', 'violet'
     * @default 'zinc'
     */
    color: Color
    /**
     * Border radius scale (multiplied by 0.5rem)
     *
     * @default 0.5
     */
    radius: number
  }
  /**
   * Top banner configuration
   */
  banner: {
    /**
     * Show or hide the banner
     *
     * @default false
     */
    enable: boolean
    /**
     * Allow users to close the banner
     *
     * @default true
     */
    showClose: boolean
    /**
     * Banner content (supports markdown)
     *
     * @default 'Welcome to **shadcn-docs-nuxt**'
     */
    content: string
    /**
     * Banner link destination
     *
     * @default ''
     */
    to: string
    /**
     * Link target attribute
     *
     * @values '_blank', '_self', '_parent', '_top'
     * @default '_blank'
     */
    target: Target
    /**
     * Show border around banner
     *
     * @default true
     */
    border: boolean
    /**
     * Height of banner
     *
     * @default 3rem // h-12
     */
    height: string
  }
  /**
   * Header configuration
   */
  header: {
    /**
     * Show loading bar during navigation
     *
     * @default true
     */
    showLoadingIndicator: boolean
    /**
     * Header title text
     *
     * @default 'shadcn-docs'
     */
    title: string
    /**
     * Show or hide title in header
     *
     * @default true
     */
    showTitle: boolean
    /**
     * Show border below header
     *
     * @default false
     */
    border: boolean
    /**
     * Logo configuration for light/dark modes
     */
    logo: {
      /**
       * Light theme logo path
       *
       * @default '/logo.svg'
       */
      light: string
      /**
       * Dark theme logo path
       *
       * @default '/logo-dark.svg'
       */
      dark: string
    }
    /**
     * Show title on mobile devices
     *
     * @default false
     */
    showTitleInMobile: boolean
    /**
     * Show dark mode toggle button
     *
     * @default true
     */
    darkModeToggle: boolean
    /**
     * Additional CSS classes for header
     *
     * @default ''
     */
    class: string
    /**
     * Position of header
     *
     * @default null
     * @value 'over' The header is positioned over the content
     */
    position: 'over' | 'floating' | null
    /**
     * Height of header
     *
     * @default '3.5rem' // h-14
     */
    height: string
    /**
     * Behavior of header
     *
     * @default 'fixed'
     */
    behavior: 'fixed' | 'hide-on-scroll'
    /**
     * Language switcher configuration
     */
    languageSwitcher: {
      /**
       * Enable language switcher
       *
       * @default false
       */
      enable: boolean
      triggerType: 'icon' | 'text'
      dropdownType: 'select' | 'popover'
    }
    /**
     * Navigation menu items
     *
     * @default []
     */
    nav: ({
      title: string
      to: string
      target: string
      showLinkIcon: boolean
      /**
       * Dropdown menu items
       */
      links: ({
        title: string
        to: string
        target: string
        description: string
        icon?: string
      })[]
    })[]
    /**
     * Additional header links
     *
     * @default []
     */
    links: ({
      icon: string
      to: string
      target: string
    })[]
  }
  /**
   * Sidebar (aside) configuration
   */
  aside: {
    /**
     * Use heading levels for nesting
     *
     * @default true
     */
    useLevel: boolean
    /**
     * Allow collapsing sidebar sections
     *
     * @default false
     */
    collapse: boolean
    /**
     * Default collapse level for nested items
     *
     * @default 1
     */
    collapseLevel: number
    /**
     * Sidebar folder display style
     *
     * @values 'default', 'tree', 'group'
     * @default 'default'
     */
    folderStyle: 'default' | 'tree' | 'group'
  }
  /**
   * Right sidebar configuration
   */
  sidebarRight: {
    /**
     * Enable right sidebar
     *
     * @default true
     */
    enable: boolean
    /**
     * Sidebar title
     *
     * @default 'On This Page'
     */
    title: string
    /**
     * Components to render in sidebar
     *
     * @default []
     */
    components: string[] | Record<string, unknown>[]
  }
  /**
   * Main content area configuration
   */
  main: {
    /**
     * Breadcrumb navigation configuration
     */
    breadCrumb: {
      /**
       * Show icons in breadcrumb
       *
       * @default true
       */
      showIcon: boolean
      /**
       * Size of regular icons in pixels
       *
       * @default 16
       */
      iconSize: number
      /**
       * Home breadcrumb item
       *
       * @default { title: '', href: '/', icon: 'i-lucide-house', iconSize: 18}
       */
      home: BreadcrumbItem | boolean
    }
    /**
     * Show page title
     *
     * @default true
     */
    showTitle: boolean
    /**
     * Show or hide description in header
     *
     * @default true
     */
    showDescription: boolean
    /**
     * Show toast when code is copied
     *
     * @default true
     */
    codeCopyToast: boolean
    /**
     * Toast message text for code copy
     *
     * @default 'Copied to clipboard!'
     */
    codeCopyToastText: string
    /**
     * Text for required fields
     *
     * @default 'required'
     */
    fieldRequiredText: string
    /**
     * Add padding to main content
     *
     * @default true
     */
    padded: boolean
    /**
     * Edit link configuration
     */
    editLink: {
      /**
       * Enable edit link
       *
       * @default false
       */
      enable: boolean
      /**
       * URL pattern for edit link
       *
       * @default ''
       */
      pattern: string
      /**
       * Edit link text
       *
       * @default 'Edit this page'
       */
      text: string
      /**
       * Edit link icon
       *
       * @default 'lucide:square-pen'
       */
      icon: string
      /**
       * Where to show edit link
       *
       * @values 'pageFooter', 'toc'
       * @default ['pageFooter']
       */
      placement: ('pageFooter' | 'toc')[]
    }
    /**
     * Show page footer
     */
    pageFooter: {
      /**
       * Enable page footer
       *
       * @default true
       */
      enable: boolean
      /**
       * Restrict page footer to same level
       *
       * @default false
       */
      restrictSameLevel: boolean
    }
    /**
     * Package managers to show in code blocks
     *
     * @values 'npm', 'pnpm', 'bun', 'yarn'
     * @default ['npm', 'pnpm', 'bun', 'yarn']
     */
    pm: ('npm' | 'pnpm' | 'bun' | 'yarn')[]
    /**
     * Icon mapping for file types in code blocks
     */
    codeIcon: {
      [key: string]: string
    }
  }
  /**
   * Footer configuration
   */
  footer: {
    /**
     * Footer credits text
     *
     * @default ''
     */
    credits: string
    /**
     * Footer links
     *
     * @default []
     */
    links: ({
      icon: string
      title: string
      alt?: string
      to: string
      target: string
    })[]
    /**
     * Additional CSS classes for footer
     *
     * @default ''
     */
    class: string
    /**
     * Show login button in footer
     *
     * @default false
     */
    showLogin: boolean
  }
  /**
   * Table of contents configuration
   */
  toc: {
    /**
     * Enable table of contents
     *
     * @default true
     */
    enable: boolean
    /**
     * Show table of contents on mobile
     *
     * @default false
     */
    enableInMobile: boolean
    /**
     * Show progress bar in table of contents
     *
     * @default true
     */
    progressBar: boolean
    /**
     * Table of contents title
     *
     * @default 'On This Page'
     */
    title: string
    /**
     * Additional links in table of contents
     *
     * @default []
     */
    links: ({
      title: string
      icon: string
      to: string
      target: string
      showLinkIcon: boolean
    })[]
    /**
     * Carbon Ads configuration
     */
    carbonAds: {
      /**
       * Enable Carbon Ads
       *
       * @default false
       */
      enable: boolean
      /**
       * Disable ads in development
       *
       * @default false
       */
      disableInDev: boolean
      /**
       * Carbon Ads code
       *
       * @default ''
       */
      code: string
      /**
       * Carbon Ads placement
       *
       * @default ''
       */
      placement: string
      /**
       * Carbon Ads format
       *
       * @values 'cover', 'responsive'
       * @default 'cover'
       */
      format: 'cover' | 'responsive'
    }
  }
  /**
   * Search configuration
   */
  search: {
    /**
     * Enable search functionality
     *
     * @default true
     */
    enable: boolean
    /**
     * Show search in sidebar
     *
     * @default false
     */
    inAside: boolean
    /**
     * Search input style
     *
     * @values 'input', 'button'
     * @default 'input'
     */
    style: 'input' | 'button'
    /**
     * Search placeholder text
     *
     * @default 'Search...'
     */
    placeholder: string
    /**
     * Detailed search placeholder text
     *
     * @default 'Search documentation...'
     */
    placeholderDetailed: string
    /**
     * Display shortcut key
     *
     * @default true
     */
    displayShortcut: boolean
  }
}

/**
 * Available color themes
 *
 * @values 'zinc', 'slate', 'stone', 'gray', 'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow', 'violet'
 */
type Color
  = | 'zinc'
    | 'slate'
    | 'stone'
    | 'gray'
    | 'neutral'
    | 'red'
    | 'rose'
    | 'orange'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'violet'

/**
 * HTML anchor target attribute values
 *
 * @values '_blank', '_parent', '_self', '_top'
 */
type Target = '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined

interface BreadcrumbItem {
  title: string
  href: string
  icon?: string
  media?: string
  classes?: string
  iconSize?: number
}

/**
 * File tree item structure
 */
interface FileTreeItem {
  /** Item title */
  title: string
  /** Optional icon for the item */
  icon?: string
  /** Nested children items */
  children?: FileTreeItem[]
  /** Whether the item is highlighted */
  highlighted: boolean
}
