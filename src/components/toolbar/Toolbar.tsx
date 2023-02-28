import switchSun from '../../assets/switch-sun.svg'
import switchMoon from '../../assets/switch-moon.svg'
import switchBody from '../../assets/switch-body.svg'
import switchBodyNight from '../../assets/switch-body-night.svg'

type Props = {
  children?: React.ReactNode
  isDark?: boolean
  setIsDark?: () => void
  setStadisticsModal?: () => void
  setInstructionsModal?: () => void
}

export const Toolbar = ({
  children,
  isDark,
  setIsDark,
  setStadisticsModal,
  setInstructionsModal,
}: Props) => {
  return (
    <nav className="rounded-[15px] bg-gray-light dark:bg-gray-03 flex items-center justify-between px-6 py-4">
      <button
        onClick={setInstructionsModal}
        className="min-w-[28px] w-7 h-7 flex items-center justify-center rounded-full bg-gray-01 dark:bg-gray-lighter dark:text-black-2 text-white"
      >
        ?
      </button>
      <p className="text-gray-darker dark:text-gray-lighter tracking-[0.075em] font-semibold uppercase text-xl xl:text-2xl 2xl:text-3xl leading-[47px]">
        wordle
      </p>
      <div className="flex items-center gap-x-3">
        <div
          onClick={setStadisticsModal}
          className="py-2 rounded-sm h-7 flex items-center justify-center bg-gray-01 dark:bg-gray-lighter hover:bg-gray-darker-89 text-white dark:text-black-2 cursor-pointer"
        >
          <svg
            width="40"
            height="100"
            viewBox="0 0 40 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4.93549"
              y="6"
              width="29.6129"
              height="24"
              rx="2"
              fill="tansparent"
              fillOpacity="1"
            />
            <path
              d="M13.1613 15L13.1613 24"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.7419 18V24"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.3226 12V24"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* toggle button */}

        <div
          onClick={setIsDark}
          className="relative p-1 rounded-full w-14 h-8 flex items-center shrink-0 bg-gray-01 text-white cursor-pointer bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${isDark ? switchBodyNight : switchBody})`,
          }}
        >
          <div
            className={`absolute top-px left-0.5 w-8 h-8 rounded-full transform duration-300 ease-in-out ${!isDark && 'translate-x-6'
              }`}
          >
            <img
              src={!isDark ? switchSun : switchMoon}
              className="w-full h-full object-cover"
              alt="rouded switch"
            />
          </div>
        </div>
        {/* toggle button */}
      </div>
    </nav>
  )
}
