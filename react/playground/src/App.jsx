import "./App.css";
import ReducerCounter from "./hooks/useReducer";
import { Counter, StopWatch } from "./hooks/useRef";

function App() {
  return (
    <>
      {/* <Counter />
      <StopWatch /> */}
      <ReducerCounter />
    </>
  );
}

export default App;
