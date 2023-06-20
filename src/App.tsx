import { useState } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Window from './components/Window';


function App() {

  const answer = "= 3";

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const [currentEquation, setCurrentEquation] = useState<string>("1+2");

  return (
    <>
      <Container>
        <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
        <Window isDarkTheme={isDarkTheme} currentEquation={currentEquation} answer={answer}/>
        <Keyboard isDarkTheme={isDarkTheme} setCurrentEquation={setCurrentEquation}/>
      </Container>
    </>
  )
}

export default App