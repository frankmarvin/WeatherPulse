import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3"
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-4"
        />

        <input
          type="text"
          placeholder="Search city..."
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          className="
            w-full
            pl-11
            pr-4
            py-3
            rounded-2xl
            bg-white/10
            outline-none
          "
        />
      </div>

      <button
        className="
          px-6
          bg-blue-500
          rounded-2xl
          hover:bg-blue-600
        "
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
