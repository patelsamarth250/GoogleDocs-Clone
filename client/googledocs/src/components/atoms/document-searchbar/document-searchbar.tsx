
import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";

interface DocumentSearchBarProps {
  onSearch: (value: string) => void;
}

const DocumentSearchBar: React.FC<DocumentSearchBarProps> = ({ onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleInputChange = (value: string) => {
    setValue(value);
    onSearch(value);
  };

  return (
    <div
      className={`${
        isFocused ? "bg-white shadow-xl" : "bg-gray-100"
      } w-full max-w-2xl rounded-md h-12 flex items-center text-gray-500 mr-4 cursor-text`}
    >
      <div className="flex justify-center px-4">
        <SearchIcon className="w-6 h-6"></SearchIcon>
      </div>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        className={`${
          isFocused ? "bg-white" : "bg-gray-100 cursor-text"
        } w-full h-full pr-4 font-medium bg-gray-100`}
        placeholder="Search"
        onChange={(e) => handleInputChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default DocumentSearchBar;
