import React, { useState } from "react";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";

export default function Dropdown({ name, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-32">
      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-evenly items-center w-full text-base font-semibold text-gray-800 hover:bg-gray-200 py-2 px-4 rounded"
      >
        <span>{name}</span>
        {open ? <span><FaArrowDown /></span> : <span><FaArrowRight /></span>}
      </button>


      {/* Dropdown menu */}
      {open && (
        <ul className="absolute right-0 top-10 mt-2 w-40 bg-white rounded shadow-md">
          {items &&
            items.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block text-base px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200 rounded"
              >
                {item}
              </a>
            ))}
        </ul>
      )}
    </div>
  );
}
