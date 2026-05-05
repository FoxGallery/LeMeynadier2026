import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine clsx + tailwind-merge — résout les conflits de classes Tailwind.
 *
 * @example
 *   cn('px-4 py-2', condition && 'bg-brass-500', 'px-6') // → 'py-2 bg-brass-500 px-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
