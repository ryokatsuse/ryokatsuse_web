import React from "react"


const Toggle : React.FC = () => {

  return (
    <>
      <label>
        <input
          className="toggle"
          type="checkbox"
        />{' '}
        <span className="toggle__fa"></span>
      </label>
    </>
  );
};
export default Toggle

