import { deleteArrowIconDark, deleteArrowIconLight } from "../svg"

interface KeyboardProps {
  isDarkTheme: boolean
}

const Keyboard = ({isDarkTheme}: KeyboardProps) => {
  return (
    <ul className={`keyboard ${isDarkTheme ? "keyboard--dark" : "keyboard--light" }`}>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__main-item--dark" : "keyboard__main-item--light" }`}>AC</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__main-item--dark" : "keyboard__main-item--light" }`}>{isDarkTheme ? deleteArrowIconDark : deleteArrowIconLight}</li>
      <li className="keyboard__item keyboard__math__signs">%</li>
      <li className="keyboard__item keyboard__math__signs">÷</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>7</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>8</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>9</li>
      <li className="keyboard__item keyboard__math__signs">×</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>4</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>5</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>6</li>
      <li className="keyboard__item keyboard__math__signs">-</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>1</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>2</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>3</li>
      <li className="keyboard__item keyboard__math__signs">+</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>±</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>0</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`}>.</li>
      <li className="keyboard__item keyboard__math__signs">=</li>
    </ul>
  )
}

export default Keyboard