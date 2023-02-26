// todo - add types for value and return type
// todo - add localstorage config to save an get data

export const getGameStatusFromLocalStorage = () => {
  const gameStatus = localStorage.getItem('gameStatus')
  return gameStatus ? JSON.parse(gameStatus) : null
}
