import { useState } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Window from './components/Window';


function App() {

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
        <Window isDarkTheme={isDarkTheme}/>
        <Keyboard isDarkTheme={isDarkTheme}/>
      </Container>
    </>
  )
}

export default App