import { useEffect, useState } from 'react'
import { Grid } from './components/gridRow/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { Toolbar } from './components/toolbar/Toolbar'
import { MAX_CHALLENGES, REVEAL_TIME_MS } from './constants/settings'
import { isExistingWord, splitWords, splitWordsLength } from './utils/utilities'
import { BaseModal } from './components/modals/BaseModal'
import { ModalInstructions } from './components/modals/ModalInstructions'
import { ModalStatistics } from './components/modals/ModalStatistics'
const solution = 'jugar'

function App() {
  const [isRevealing, setIsRevealing] = useState(false)
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentClass, setCurrentClass] = useState('')
  const [instructionsModalOpen, setInstructionsModalOpen] = useState(false)
  const [statisticsModalOpen, setStatisticsModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // todo: fill guesses with localstorage data
  const [guesses, setGuesses] = useState<string[]>([])

  const clearCurrentRowClass = () => {
    setCurrentClass('')
  }
  useEffect(() => {
    // show instructions modal only when the user has not seen it before
    if (!localStorage.getItem('hellow')) {
      setTimeout(() => {
        setInstructionsModalOpen(true)
      }, 500)
    }
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const onChar = (value: string) => {
    let currentValue = splitWords(`${currentGuess}${value}`)

    console.log('onChar', currentValue)

    if (
      currentValue.length <= solution.length &&
      guesses.length < MAX_CHALLENGES
    ) {
      setCurrentGuess(currentGuess + value)
    }
  }
  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }
  const onEnter = () => {
    console.log('onEnter')

    if (splitWordsLength(currentGuess) < solution.length) {
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
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
    }
  }

  return (
    <div className="app">
      {/* <button onClick={() => setInstructionsModalOpen(true)}>
        modal instrucciones
      </button>
      <br />
      <button onClick={() => setStatisticsModalOpen(true)}>
        modal estadísticas
      </button> */}
      <ModalInstructions
        isOpen={instructionsModalOpen}
        closeModal={() => setInstructionsModalOpen(false)}
      />
      <ModalStatistics
        isOpen={statisticsModalOpen}
        closeModal={() => setStatisticsModalOpen(false)}
      />

      <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 max-w-[638px] lg:px-0 short:pb-2 short:pt-2">
        {/* toolbar */}
        <Toolbar
          isDark={isDarkMode}
          setIsDark={() => setIsDarkMode(!isDarkMode)}
        />
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
