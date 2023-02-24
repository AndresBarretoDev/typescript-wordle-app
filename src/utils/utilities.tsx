import { WORDS_LIST } from '../constants/wordsList'
export type CharStatus = 'absent' | 'present' | 'correct'

export const isExistingWord = (word: string) => {
  console.log('isExistingWord', word.toLowerCase())
  console.log('WORDS_LIST', WORDS_LIST.includes(word.toLowerCase()))

  return WORDS_LIST.includes(word.toLowerCase())
}

export const getGuessStatuses = (
  solution: string,
  guess: string,
): CharStatus[] => {
  const splitSolution = solution.split('')

  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))
  console.log('char statuses', statuses)

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    console.log('letter', letter, ' === splitSolution[i]', splitSolution[i])

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
    console.log('solutionCharsTaken[index]', solutionCharsTaken)

    // now we are left with "present"s
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
  console.log('statuses end', statuses)

  return statuses
}
