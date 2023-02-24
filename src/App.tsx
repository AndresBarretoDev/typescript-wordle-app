import { useState } from 'react'
import { Grid } from './components/gridRow/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { Toolbar } from './components/toolbar/Toolbar'
import { MAX_CHALLENGES, REVEAL_TIME_MS } from './constants/settings'
import { isExistingWord } from './utils/utilities'
const solution = 'jugar'

function App() {
  const [isRevealing, setIsRevealing] = useState(false)
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentClass, setCurrentClass] = useState('')

  // todo: fill guesses with localstorage data
  const [guesses, setGuesses] = useState<string[]>([])

  const clearCurrentRowClass = () => {
    setCurrentClass('')
  }
  const wordLength = (value: string) => {
    let spliti = value.split('')
    return spliti.length
  }

  const onChar = (value: string) => {
    let curr = `${currentGuess}${value}`
    let spliti = curr.split('')
    console.log('onChar', spliti.length)

    if (spliti.length <= solution.length && guesses.length < MAX_CHALLENGES) {
      setCurrentGuess(currentGuess + value)
    }
  }
  const onDelete = () => {
    console.log('onDelete', currentGuess)
    setCurrentGuess(currentGuess.slice(0, -1))
  }
  const onEnter = () => {
    console.log('onEnter')

    if (wordLength(currentGuess) < solution.length) {
      setCurrentClass('shake-horizontal')
      setTimeout(() => {
        clearCurrentRowClass()
      }, 1000)
      return
    }

    if (!isExistingWord(currentGuess)) {
      console.log('not existing word')
      setCurrentClass('shake-horizontal')
      setTimeout(() => {
        clearCurrentRowClass()
      }, 1000)
      return
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      // setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.length)
    if (currentGuess.length === solution.length) {
      console.log('kjsdhksjdhkj')

      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
    }
  }

  return (
    <div className="app">
      <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 max-w-[638px] lg:px-0 short:pb-2 short:pt-2">
        {/* toolbar */}
        <Toolbar />
        {/* toolbar */}

        <div className="flex grow flex-col justify-center py-6 short:pb-2">
          <Grid
            solution={solution}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealed={isRevealing}
            currentRowClassName={currentClass}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          solution={solution}
          guesses={guesses}
          isRevealing={isRevealing}
        />
      </div>
    </div>
  )
}

export default App
