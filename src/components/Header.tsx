import ThemeSwitcher from "./ThemeSwitcher"

interface HeaderProps {
  isDarkTheme: boolean
  setIsDarkTheme: (arg0: boolean) => void
}

const Header = ({isDarkTheme, setIsDarkTheme}: HeaderProps) => {

  return (
    <div className={`header ${isDarkTheme ? "header--dark" : "header--light" }`}>
        <ThemeSwitcher isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
    </div>
  )
}

export default Header