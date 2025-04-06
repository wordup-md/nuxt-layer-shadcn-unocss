import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      type: {
        default: 'bg-muted',
        primary: 'bg-primary text-primary border-primary',
        secondary: 'bg-secondary-foreground dark:bg-secondary text-secondary-foreground border-secondary-foreground',
        info: 'bg-info text-info border-info',
        warning: 'bg-warning text-warning border-warning',
        success: 'bg-success text-success border-success',
        danger: 'bg-danger text-danger border-danger',
        new: 'bg-new text-new-foreground border-new',
        // info: 'bg-sky-500 text-sky-500 border-sky-500',
        // warning: 'bg-yellow-400 text-yellow-500 border-yellow-500 a11y:text-black',
        // success: 'bg-green-500 text-green-600 border-green-600',
        // danger: 'bg-red-500 text-red-500 border-red-500',
        // new: 'bg-[#adfa1d] dark:text-[#adfa1d] border-[#adfa1d]',
      },
      variant: {
        default:
          'border-transparent !bg-opacity-15 !dark:bg-opacity-20', // cva breaks bg-opacity-* without !
        fill:
          'text-white border-transparent',
        outline:
          '!bg-opacity-0',
        text:
          'bg-transparent border-transparent',
        // default:
        //   'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        // secondary:
        //   'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // destructive:
        //   'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        // outline: 'text-foreground',
      },
    },
    defaultVariants: {
      type: 'default',
      variant: 'default',
    },
    compoundVariants: [
      {
        type: ['default', 'new'],
        variant: 'default',
        class: '!bg-opacity-80 !dark:bg-opacity-80',
      },
      {
        type: ['default'],
        variant: 'fill',
        class: 'text-inherit',
      },
      {
        type: ['new'],
        variant: 'fill',
        class: '!text-new-foreground',
      },
      {
        type: ['new'],
        variant: 'outline',
        class: 'dark:text-new',
      },
    ],
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
