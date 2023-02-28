import { Cell } from '../gridRow/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  closeModal: () => void
  isOpen: boolean
}

export const ModalInstructions = ({ closeModal, isOpen }: Props) => {
  return (
    <BaseModal title="Cómo jugar" closeModal={closeModal} isOpen={isOpen}>
      <p className="mt-4 text-sm 2xl:text-[19px]">
        Adivina la palabra oculta en cinco intentos.
      </p>
      <p className="mt-4 text-sm 2xl:text-[19px]">
        Cada intento debe ser una palabra válida de cinco letras.
      </p>
      <p className="mt-4 text-sm 2xl:text-[19px]">
        Después de cada intento el color de las letras cambia para mostrar qué
        tan cerca estás de acertar la palabra.
      </p>
      <h4 className="font-bold text-lg 2xl:text-4xl mt-4">Ejemplos</h4>

      {/* example grid */}

      <div className="mt-2 flex justify-center instructions">
        <Cell isRevealed={true} isCompleted={true} value="G" status="correct" />
        <Cell value="A" />
        <Cell value="T" />
        <Cell value="O" />
        <Cell value="S" />
      </div>
      <p className="mt-2 text-sm 2xl:text-[19px]">
        La letra <strong>G</strong> está en la palabra y en la posición
        correcta.
      </p>
      <div className="mt-2 flex justify-center instructions">
        <Cell value="V" />
        <Cell value="o" />
        <Cell isRevealed={true} isCompleted={true} status="present" value="c" />
        <Cell value="a" />
        <Cell value="l" />
      </div>
      <p className="mt-2 text-sm 2xl:text-[19px]">
        La letra <strong>C</strong> está en la palabra pero en la posición
        incorrecta.
      </p>
      <div className="mt-2 flex justify-center instructions">
        <Cell value="c" />
        <Cell value="a" />
        <Cell value="n" />
        <Cell value="t" />
        <Cell isRevealed={true} isCompleted={true} status="absent" value="o" />
      </div>
      <p className="mt-2 text-sm 2xl:text-[19px]">
        La letra <strong>O</strong> no está en la palabra.
      </p>

      <p className="mt-6 text-sm 2xl:text-[19px]">
        Puede haber letras repetidas. Las pistas son independientes para cada
        letra.
      </p>

      <p className="mt-6 text-center text-sm 2xl:text-[19px]">
        ¡Una palabra nueva cada 5 minutos!
      </p>

      <button
        onClick={closeModal}
        className="bg-success-dark hover:bg-success-light transition duration-300 text-white font-bold py-2 px-10 mt-8 mx-auto flex  rounded-md text-lg border-none outline-none focus:outline-none"
      >
        !JUGAR!
      </button>
    </BaseModal>
  )
}
