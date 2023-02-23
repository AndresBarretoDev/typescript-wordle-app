import switchSun from '../../assets/switch-sun.svg'
import switchMoon from '../../assets/switch-moon.svg'
import switchBody from '../../assets/switch-body.svg'
import switchBodyNight from '../../assets/switch-body-night.svg'

type Props = {
  children: React.ReactNode
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

export const Toolbar = () => {
  return (
    <nav className="rounded-[15px] bg-gray-light flex items-center justify-between px-6 py-4">
      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-01 text-white">
        ?
      </div>
      <p className="text-gray-darker tracking-[0.075em] font-semibold uppercase text-[40px] leading-[47px]">
        wordle
      </p>
      <div className="flex items-center gap-x-3">
        <div className="py-2 rounded-sm h-7 flex items-center justify-center bg-gray-01 hover:bg-gray-darker-89 text-white cursor-pointer">
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
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.7419 18V24"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.3226 12V24"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* toggle button */}

        <div
          className="relative p-1 rounded-full w-14 h-8 flex items-center shrink-0 bg-gray-01 text-white cursor-pointer bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${switchBody})` }}
        >
          <div className="absolute top-px left-0.5 w-8 h-8 rounded-full transform duration-300 ease-in-out translate-x-6">
            <img
              src={switchSun}
              className="w-full h-full object-cover"
              alt="sun"
            />
            {/* <img
              src={switchMoon}
              className="w-full h-full object-cover"
              alt="moon"
            /> */}
          </div>
        </div>
        {/* toggle button */}
      </div>
    </nav>
  )
}
