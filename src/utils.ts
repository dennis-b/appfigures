import { format } from 'date-fns'
import { isString, isInteger, inRange } from 'lodash'
import { DATE_FORMAT_MMM_D_YYYY } from './constants'

export function formatDate(date: string | Date, dateFormat: string = DATE_FORMAT_MMM_D_YYYY): string {
  return format(typeof date === 'string' ? new Date(date) : date, dateFormat)
}

export function parseSearchQ(value: unknown): string | undefined {
  return isString(value) && value ? value : undefined
}

export function parseSearchStars(value: unknown): number | undefined {
  const n = Number(value)
  return isInteger(n) && inRange(n, 1, 6) ? n : undefined
}
