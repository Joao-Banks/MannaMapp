import { useState } from "react";
import wardsData from "./WardsData";
import Ward from "./Ward";
import "./styles/Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("none");
  const [showResults, setShowResults] = useState(false); // 👈 start hidden

  const items = wardsData;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowResults(true); // show results when pressing Enter
    }
  };

  // All unique complexes for the dropdown
  const allComplexes = Array.from(
    new Set(items.flatMap((item) => item.complexes))
  ).sort();

  // Filter logic
  const filteredItems = items.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.complexes.some((c) => c.toLowerCase().includes(query.toLowerCase()));

    const matchesFilter = filter === "none" || item.complexes.includes(filter);

    return matchesQuery && matchesFilter;
  });

  // Decide whether to show results:
  // Only show when there’s a query or a real filter
  const shouldShowResults =
    showResults && (query.trim() !== "" || filter !== "none");

  return (
    <div className="search-container">
      <h1 className="search-header">Find a Ward</h1>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Search Ward or Complex..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setShowResults(true); // show results when changing filter
          }}
          className="search-select"
        >
          <option value="none">None</option>
          {allComplexes.map((complex) => (
            <option key={complex} value={complex}>
              {complex}
            </option>
          ))}
        </select>
      </div>

      {/* --- Results --- */}
      {shouldShowResults && (
        <div className="search-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <Ward key={index} name={item.name} complexes={item.complexes} />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
