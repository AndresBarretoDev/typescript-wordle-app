import { useEffect, useState } from 'react'
import { Grid } from './components/gridRow/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { Toolbar } from './components/toolbar/Toolbar'
import { MAX_CHALLENGES, REVEAL_TIME_MS } from './constants/settings'
import {
  currentDatePlusFiveMinutes,
  isExistingWord,
  splitWords,
  splitWordsLength,
  solution,
} from './utils/utilities'
import { ModalInstructions } from './components/modals/ModalInstructions'
import { ModalStatistics } from './components/modals/ModalStatistics'
import {
  addStatisticsInCompletedGame,
  getGameStatusFromLocalStorage,
  loadStatistics,
  saveGameInLocalstorage,
} from './helpers/localstorage'
// const solution = 'jugar'

function App() {

  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
  const getDataFromStorage = () => {

    const response = getGameStatusFromLocalStorage()
    if (response?.solution !== solution) return []
    const gameWinner = response.guesses.includes(solution)

    if (gameWinner) {
      setGameWon(true)
    }
    if (response.guesses.length === MAX_CHALLENGES && !gameWinner) {
      setGameLost(true)
    }
    return response.guesses
  }
  const [isRevealing, setIsRevealing] = useState(false)
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentClass, setCurrentClass] = useState('')
  const [instructionsModalOpen, setInstructionsModalOpen] = useState(false)
  const [statisticsModalOpen, setStatisticsModalOpen] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
        ? true
        : false,
  )
  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }
  const [guesses, setGuesses] = useState<string[]>(() => getDataFromStorage())
  const [statistics, setStatistics] = useState(() => loadStatistics())

  const handleStatisticsModal = () => {
    setTimeout(() => {
      setStatisticsModalOpen(true)
    }, 350 * solution.length + 1)
  }

  useEffect(() => {
    // show instructions modal only when the user has not seen it before
    if (!localStorage.getItem('gameStatus')) {
      setTimeout(() => {
        setInstructionsModalOpen(true)
      }, 500)
    }
  })

  useEffect(() => {
    saveGameInLocalstorage({ guesses, solution })

  }, [guesses])

  const clearCurrentRowClass = () => {
    setCurrentClass('')
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    if (gameWon) {
      handleStatisticsModal()
    }

    if (gameLost) {
      handleStatisticsModal()
    }
  }, [gameWon, gameLost])

  const onChar = (value: string) => {
    let currentValue = splitWords(`${currentGuess}${value}`)

    if (
      currentValue.length <= solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !gameWon
    ) {
      setCurrentGuess(currentGuess + value)
    }
  }
  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }
  const onEnter = () => {

    if (gameWon || gameLost) return

    if (splitWordsLength(currentGuess) < solution.length) {
      setCurrentClass('shake-horizontal')
      setTimeout(() => {
        clearCurrentRowClass()
      }, 1000)
      return
    }

    if (!isExistingWord(currentGuess)) {
      setCurrentClass('shake-horizontal')
      setTimeout(() => {
        clearCurrentRowClass()
      }, 1000)
      return
    }

    setIsRevealing(true)
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.length)

    const winningWord = currentGuess === solution

    if (
      currentGuess.length === solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !gameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
      if (winningWord) {
        setStatistics(addStatisticsInCompletedGame(statistics, guesses.length))

        setGameWon(true)
        const fiveMinutes: Date = currentDatePlusFiveMinutes()
        localStorage.setItem('fiveMinutes', JSON.stringify(+fiveMinutes))

        handleStatisticsModal()
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStatistics(
          addStatisticsInCompletedGame(statistics, guesses.length + 1),
        )
        setGameLost(true)
        handleStatisticsModal()
      }
    }
  }

  return (
    <div className="app">
      <ModalInstructions
        isOpen={instructionsModalOpen}
        closeModal={() => setInstructionsModalOpen(false)}
      />
      <ModalStatistics
        isOpen={statisticsModalOpen}
        closeModal={() => setStatisticsModalOpen(false)}
        statistics={statistics}
        gameWon={gameWon}
        gameLost={gameLost}
      />

      <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 max-w-[638px] lg:px-0 short:pb-2 short:pt-2">
        {/* toolbar */}
        <Toolbar
          isDark={isDarkMode}
          setIsDark={() => handleDarkMode(!isDarkMode)}
          setStadisticsModal={() =>
            setStatisticsModalOpen(!statisticsModalOpen)
          }
          setInstructionsModal={() =>
            setInstructionsModalOpen(!instructionsModalOpen)
          }
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
