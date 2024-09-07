import { useRef } from "react";
import { useKey } from "../useKey";

export default function Search({ placeholder, value, onChange, setQuery }) {
  const inputEl = useRef(null);

  useKey(() => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  }, "Enter");

  return (
    <input
      className="search"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={inputEl}
    />
  );
}
