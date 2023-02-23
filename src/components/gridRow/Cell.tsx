type Props = {
  value?: string
  status?: string
  isRevealed?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealed,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealed && isCompleted
  const animationDelay = `${position * 450}ms`

  return (
    <div
      className="w-16 h-16 flex items-center justify-center m-1 text-4xl font-bold rounded text-gray-darker bg-gray-04 dark:bg-gray-02 uppercase"
      style={{ animationDelay }}
    >
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
