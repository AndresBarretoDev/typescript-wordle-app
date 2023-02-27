import { ReactNode } from 'react'
import { CharStatus } from '../../constants/settings'

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
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      className={`keypad uppercase w-11 h-[51px] ${value}${
        status ? ' ' + status : ''
      }`}
      onClick={handleClick}
      style={{ width }}
    >
      {children || value}
    </button>
  )
}
