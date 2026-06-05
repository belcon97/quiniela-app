import { useMemo } from 'react'
import { useTheme } from '@/theme'
import type { Theme } from '@/theme'

export function useStyles(makeStylesFn: (theme: Theme) => any) {
  const theme = useTheme()
  return useMemo(() => makeStylesFn(theme), [theme, makeStylesFn])
}