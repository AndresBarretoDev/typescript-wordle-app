import { BaseModal } from './BaseModal'

type Props = {
  closeModal: () => void
  isOpen: boolean
}
export const ModalStatistics = ({ closeModal, isOpen }: Props) => {
  return (
    <BaseModal title="Estadísticas" isOpen={isOpen} closeModal={closeModal}>
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between my-6 text-black text-center">
          <div className="flex-col">
            <p className="font-bold text-xl">8</p>
            <p>Jugadas</p>
          </div>
          <div className="flex-col">
            <p className="font-bold text-xl">2</p>
            <p>Victorias</p>
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-center pt-8 items-center">
          <p className="uppercase mb-2">Siguiente palabra</p>
          <p className="font-bold">4:20</p>
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
