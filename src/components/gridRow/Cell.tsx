type CharStatus = 'absent' | 'present' | 'correct'

type Props = {
  value?: string
  status?: CharStatus
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
  // console.log('isFilled', isFilled)
  // console.log('shouldReveal', shouldReveal)
  // console.log('status', status)

  return (
    <div className={`cell ${status}`} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
