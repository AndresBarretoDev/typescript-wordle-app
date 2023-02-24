import { Cell } from './Cell'

export const EmptyRow = () => {
  const solution = 'jugar'
  const emptyCells = Array.from(Array(solution.length))

  return (
    <div className="flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
