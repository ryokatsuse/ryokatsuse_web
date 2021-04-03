import React from "react"
import useDarkMode from 'use-dark-mode';

const Toggle : React.FC = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <button
        className="toggle__button"
        type="button" onClick={darkMode.disable}>
        🌞
      </button>
      <button
        className="toggle__button"
        type="button" onClick={darkMode.enable}>
        🌛
      </button>
    </div>
  );
};
export default Toggle

