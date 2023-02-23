import { MAX_CHALLENGES } from '../../constants/settings'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { FilledRow } from './FilledRow'

type Props = {
  solution: string
  guesses: string[]
  currentGuess: string
  isRevealed?: boolean
  currentRowClassName: string
}
export const Grid = ({
  solution,
  guesses,
  currentGuess,
  isRevealed,
  currentRowClassName,
}: Props) => {
  console.log('Grid', guesses)

  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []
  return (
    <>
      {guesses.map((guess, i) => (
        <FilledRow
          key={i}
          solution={solution}
          guess={guess}
          isRevealed={isRevealed && guesses.length - 1 === 0}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}
