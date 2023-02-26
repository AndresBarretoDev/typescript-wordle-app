import { WORDS_LIST } from '../constants/wordsList'
export type CharStatus = 'absent' | 'present' | 'correct'

export const isExistingWord = (word: string) => {
  console.log('isExistingWord', word.toLowerCase())
  console.log('WORDS_LIST', WORDS_LIST.includes(word.toLowerCase()))

  return WORDS_LIST.includes(word.toLowerCase())
}

export const splitWords = (word: string) => word.split('')
export const splitWordsLength = (word: string) => word.split('').length

export const getStatuses = (
  solution: string,
  guesses: string[],
): { [key: string]: CharStatus } => {
  const statsObj: { [key: string]: CharStatus } = {}
  const splitSolution = splitWords(solution)

  guesses.forEach((word) => {
    splitWords(word.toLowerCase()).forEach((letter, i) => {
      if (!splitSolution.includes(letter)) {
        return (statsObj[letter] = 'absent')
      }

      if (letter === splitSolution[i]) {
        return (statsObj[letter] = 'correct')
      }

      if (statsObj[letter] !== 'correct') {
        return (statsObj[letter] = 'present')
      }
    })
  })

  return statsObj
}

export const getGuessStatuses = (
  solution: string,
  guess: string,
): CharStatus[] => {
  const splitSolution = splitWords(solution)

  const splitGuess = splitWords(guess)
  const solutionCharsTaken = splitSolution.map((_) => false)
  const statuses: CharStatus[] = Array.from(Array(guess.length))

  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      statuses[i] = 'absent'
      return
    }

    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index],
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
