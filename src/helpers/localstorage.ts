import { MAX_CHALLENGES } from '../constants/settings'

const gameStateKey = 'gameStatus'
const gameStatisticsKey = 'gameStatistics'
export interface gameStore {
  guesses: string[]
  solution: string
}

export type GameStats = {
  gamesFailed: number
  totalGames: number
  successRate: number
  victories: number
}

const defaultStats: GameStats = {
  gamesFailed: 0,
  totalGames: 0,
  successRate: 0,
  victories: 0,
}

export const saveGameInLocalstorage = (gameGuesses: gameStore) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameGuesses))
}
export const getGameStatusFromLocalStorage = () => {
  const gameStatus = localStorage.getItem(gameStateKey)
  return gameStatus ? JSON.parse(gameStatus) : null
}

export const getGameStatisticsFromLocalStorage = () => {
  const gameStatistics = localStorage.getItem(gameStatisticsKey)
  return gameStatistics ? JSON.parse(gameStatistics) : null
}

export const loadStatistics = () => {
  return getGameStatisticsFromLocalStorage() || defaultStats
}

export const addStatisticsInCompletedGame = (
  gameStats: GameStats,
  counter: number,
) => {
  const gameStatistics = gameStats || defaultStats
  console.log('add statistics', counter)
  console.log('gameStatistics', gameStatistics)
  const stats = { ...gameStatistics }
  console.log('stats', stats)

  stats.totalGames += 1
  if (counter >= MAX_CHALLENGES) {
    stats.gamesFailed += 1
  }
  stats.successRate =
    Math.round(
      ((stats.totalGames - stats.gamesFailed) / stats.totalGames) * 100,
    ) || 0

  stats.victories = stats.totalGames - stats.gamesFailed
  localStorage.setItem(gameStatisticsKey, JSON.stringify(stats))
  return stats
}
