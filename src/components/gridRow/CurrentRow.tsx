import { Cell } from './Cell'
const solution = 'HOLAS'

type Props = {
  guess: string
  className: string
}

export const CurrentRow = ({ guess, className }: Props) => {
  console.log('guess', guess)

  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))

  const classes = `flex justify-center ${className}`
  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
