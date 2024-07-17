import type { ComponentProps, ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: 'rounded-lg px-5 py-2 font-medium flex items-center justify-center gap-2',

  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
      secundary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11'
    },

    loading: {
      true: 'opacity-50 cursor-not-allowed',
      false: ''
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
    loading: false
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode
  isLoading?: boolean
}

export function Button({ children, variant, size, isLoading = false, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size, loading: isLoading })} disabled={isLoading}>
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  )
}
