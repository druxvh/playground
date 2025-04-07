import "./App.css";
import ThemeBtn, { ThemeContext } from "./hooks/useContext";
import ReducerCounter from "./hooks/useReducer";
import { Counter, StopWatch } from "./hooks/useRef";

function App() {
  return (
    <>
      {/* <Counter />
      <StopWatch /> */}
      {/* <ReducerCounter /> */}

      <ThemeContext.Provider value="light">
        <ThemeBtn />
      </ThemeContext.Provider>
    </>
    
  );
}

export default App;
