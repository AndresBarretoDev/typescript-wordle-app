import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { GameStats } from '../../helpers/localstorage'
import { getWordSolution, solution } from '../../utils/utilities'

import { BaseModal } from './BaseModal'

type Props = {
  closeModal: () => void
  isOpen: boolean
  statistics: GameStats
}
type RenderProps = {
  completed: boolean
  minutes: number
  seconds: number
}
export const ModalStatistics = ({ closeModal, isOpen, statistics }: Props) => {
  const [countDown, setcountDown] = useState<number>(0)
  const [getSolution, setGetSolution] = useState<string>(solution)

  const renderTime = ({ minutes, seconds, completed }: RenderProps) => {
    if (completed) {
      localStorage.removeItem('gameSolution')
      localStorage.removeItem('fiveMinutes')
      getWordSolution()

      return <h1>Completado</h1>
    } else {
      // Render a countdown
      return (
        <span className="text-black font-bold">
          0{minutes}:{seconds}
        </span>
      )
    }
  }
  useEffect(() => {
    console.log('useEffect get:', getSolution)
  }, [getSolution])
  useEffect(() => {
    const fiveMinutes = localStorage.getItem('fiveMinutes')
    if (fiveMinutes) {
      setcountDown(parseInt(fiveMinutes))
    }
  }, [isOpen])

  return (
    <BaseModal title="Estadísticas" isOpen={isOpen} closeModal={closeModal}>
      <div className="max-w-xs mx-auto text-black dark:text-white">
        <div className="flex justify-between my-6  text-center">
          <div className="flex-col">
            <p className="font-bold text-xl">{statistics?.totalGames}</p>
            <p>Jugadas</p>
          </div>
          <div className="flex-col">
            <p className="font-bold text-xl">{statistics?.victories}</p>
            <p>Victorias</p>
          </div>
        </div>
        {/* todo: condition to show the next word if game won or lost */}
        <div className="flex flex-col flex-wrap justify-center pt-8 items-center">
          <p className="uppercase mb-2">Siguiente palabra</p>
          <Countdown date={countDown} renderer={renderTime} />
          <button
            onClick={closeModal}
            className="bg-success-dark hover:bg-success-light transition duration-300 text-white font-bold py-2 px-10 mt-4 mx-auto flex  rounded-md text-lg border-none outline-none focus:outline-none"
          >
            Aceptar
          </button>
        </div>
      </div>
    </BaseModal>
  )
}
