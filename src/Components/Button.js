import React from "react";

function Button({ children, ...rest }) {
  return (
    <button
      className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
