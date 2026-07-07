import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * SearchBar Component
 */

function SearchBar({ value, onChange }) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(input);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-4 top-4 text-slate-400"
      />

      <input
        aria-label="Search leads"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by name, company, or email..."
        className="w-full border rounded-xl py-3 pl-12 pr-12"
      />

      {input && (
        <button
          onClick={() => {
            setInput("");
            onChange("");
          }}
          className="absolute right-4 top-4"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;