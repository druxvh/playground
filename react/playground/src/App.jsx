import "./App.css";
import ReactVideoPlayer from "./components/react-player";
import ThemeBtn, { ThemeContext } from "./hooks/useContext";
import ReducerCounter from "./hooks/useReducer";
import { Counter, StopWatch } from "./hooks/useRef";

function App() {
  return (
    <>
      {/* <Counter />
      <StopWatch /> */}
      {/* <ReducerCounter /> */}
      <ReactVideoPlayer />

      {/* <ThemeContext.Provider value="light">
        <ThemeBtn />
      </ThemeContext.Provider> */}
    </>
  );
}

export default App;
