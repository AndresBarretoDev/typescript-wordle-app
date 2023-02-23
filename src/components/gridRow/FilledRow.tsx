import { Cell } from './Cell'
type Props = {
  solution: string
  guess: string
  isRevealed?: boolean
}
export const FilledRow = ({ solution, guess, isRevealed }: Props) => {
  const splitGuess = guess.split('')
  return (
    <div className="flex justify-center">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={'completed'}
          position={i}
          isRevealed={isRevealed}
          isCompleted
        />
      ))}
    </div>
  )
}
