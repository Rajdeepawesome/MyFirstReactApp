const Switch = ({isChecked,setIsChecked}) => {
    console.log(`isChecked - ${isChecked}`);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    return (
        <>
            <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-gradient-to-r p-1'>
                <input
                    type='checkbox'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                        !isChecked ? 'text-black bg-gradient-to-r from-gray-800 to-white' : 'text-white bg-gradient-to-r from-black-500 to-gray-600'
                    }`}
                >
          <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              className='mr-[6px] fill-current'
          >
            <g clipPath='url(#clip0_3122_652)'>
            </g>
            <defs>
              <clipPath id='clip0_3122_652'>
                <rect width='16' height='16' fill='white'></rect>
              </clipPath>
            </defs>
          </svg>
           🎬 Movies
        </span>
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                        isChecked ? 'text-black bg-gradient-to-r from-white to-gray-800' : 'text-white bg-gradient-to-r from-gray-600 to-black-500'
                    }`}
                >
          <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              className='mr-[6px] fill-current'
          >
          </svg>
          📺 Tv Shows
        </span>
            </label>
        </>
    )
}

export default Switch