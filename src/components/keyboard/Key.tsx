import { ReactNode } from 'react'
import { CharStatus } from '../../constants/settings'

type Props = {
  children?: ReactNode
  value: string
  width?: number | string
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
}

export const Key = ({
  children,
  value,
  width = 'max-content',
  onClick,
  isRevealing,
  status,
}: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      className={`keypad uppercase w-7 h-7 md:w-11 md:h-[51px] ${value}${status ? ' ' + status : ''
        }`}
      onClick={handleClick}
      style={{ width: `${width}px` }}
    >
      {children || value}
    </button>
  )
}
