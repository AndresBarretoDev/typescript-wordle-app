import { ReactNode } from 'react'
import { CharStatus, REVEAL_TIME_MS } from '../../constants/settings'

type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
}

export const Key = ({
  children,
  value,
  width = 44,
  onClick,
  isRevealing,
  status,
}: Props) => {
  const solution = 'HOLAS'
  const keyDelayMs = REVEAL_TIME_MS * solution.length

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log('handleClick', event.currentTarget, value)

    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      style={styles}
      aria-label={`${value}${status ? ' ' + status : ''}`}
      className="flex h-12 items-center justify-center rounded text-xs font-bold cursor-pointer select-none dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400"
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
