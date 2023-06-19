import { lightIcon, darkIcon } from "../svg";

interface ThemeSwitcherProps {
  isDarkTheme: boolean
  setIsDarkTheme: (arg0: boolean) => void
}

const ThemeSwitcher = ({isDarkTheme, setIsDarkTheme}: ThemeSwitcherProps) => {

  return (
    <>
      <div className="switcher" onClick={() => {setIsDarkTheme(!isDarkTheme)}}>
        { isDarkTheme ? lightIcon : darkIcon }
      </div>
    </>
  )
}

export default ThemeSwitcher