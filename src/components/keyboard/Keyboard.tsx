import { useEffect } from 'react'
import { DELETE_TEXT, ENTER_TEXT } from '../../constants/settings'
import { Key } from './Key'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
}: Props) => {
  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)

    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onChar, onDelete, onEnter])

  return (
    <div className="rounded-[15px] pl-5 pr-9 py-8 bg-gray-05 flex flex-col gap-[9px]">
      <div className="flex justify-center gap-[9px]">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={'correct'}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-end gap-[9px]">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={'correct'}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center gap-[9px]">
        <Key width={71.78} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={'correct'}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={71.78} value="DELETE" onClick={onClick}>
          xx
        </Key>
      </div>
    </div>
  )
}
