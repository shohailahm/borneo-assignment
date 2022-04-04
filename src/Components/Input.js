import React from "react";

function Input({ label, type, placeholder }) {
  return (
    <div>
      <label htmlFor="password">{label}</label>
      <input
        type={type}
        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
