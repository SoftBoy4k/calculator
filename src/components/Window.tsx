
interface WindowProps {
  isDarkTheme: boolean
}

const Window = ({isDarkTheme}: WindowProps) => {
  return (
    <div className={`window ${isDarkTheme ? "window--dark" : "window--light" }`}>

    </div>
  )
}

export default Window