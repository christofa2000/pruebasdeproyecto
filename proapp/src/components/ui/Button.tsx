import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: Props) {
  const base =
    'rounded-2xl font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants: Record<NonNullable<Props['variant']>, string> = {
    primary: 'bg-brand-600 text-white hover:bg-brand-500 focus:ring-brand-600',
    ghost:
      'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800',
  }

  const sizes: Record<NonNullable<Props['size']>, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5 text-lg',
  }

  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
