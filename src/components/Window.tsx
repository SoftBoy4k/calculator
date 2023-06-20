
interface WindowProps {
  isDarkTheme: boolean,
  currentEquation: string,
  answer: string
}

const Window = ({isDarkTheme, currentEquation, answer}: WindowProps) => {

  const getClassNameForTextEquation = ():string => {
    if (answer) {
      return `window__secondary-text ${isDarkTheme ? "window__secondary-text--dark" : "window__secondary-text--light" }`;
    } else {
      return `window__main-text ${isDarkTheme ? "window__main-text--dark" : "window__main-text--light" }`;
    }
  }

  return (
    <div className={`window ${isDarkTheme ? "window--dark" : "window--light" }`}>
      <p className={getClassNameForTextEquation()}>{currentEquation}</p>
      <p className={`window__main-text ${isDarkTheme ? "window__main-text--dark" : "window__main-text--light" }`}>{answer}</p>
    </div>
  )
}

export default Window