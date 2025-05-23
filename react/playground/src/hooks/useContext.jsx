import { createContext, useContext } from "react";

// often keep the context in a seperate file (good practice)
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext("light");

function ThemeBtn() {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <button
        style={{
          background: theme === "dark" ? "#333" : "#EEE",
          color: theme === "dark" ? "#FFF" : "#000",
        }}
      >
        I am styled by theme context!
      </button>
    </div>
  );
}

export default ThemeBtn;
