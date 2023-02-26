import { useEffect } from 'react'
import { DELETE_TEXT, ENTER_TEXT } from '../../constants/settings'
import { getStatuses } from '../../utils/utilities'
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
  const transformLowercase = (guesses: string[]) => {
    const lowercaseGuesses = guesses.map((guess) => guess.toLowerCase())
    return lowercaseGuesses
  }
  const charStatuses = getStatuses(solution, guesses)
  console.log('charStatuses', charStatuses)
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
    <div className="rounded-[15px] pl-5 pr-9 py-8 bg-gray-05 dark:bg-gray-03 flex flex-col gap-[9px]">
      <div className="flex justify-center gap-[9px]">
        {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-end gap-[9px]">
        {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center gap-[9px]">
        <Key width={71.78} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
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
