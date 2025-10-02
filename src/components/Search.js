import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // dropdown menu
  const [showResults, setShowResults] = useState(true); //visibility state

  const items = [
    { name: "48th Ward", complex: "The Ridge" },
    { name: "114th Ward", complex: "Milano Flats" },
    { name: "25th Ward", complex: "Stonebrook" },
    { name: "123rd Ward", complex: "University View" },
    { name: "10th Ward", complex: "The Ridge" },
    { name: "12th Ward", complex: "Hillcrest" },
    { name: "15th Ward", complex: "Windsor" },
    { name: "21st Ward", complex: "Windsor" },
    { name: "33rd Ward", complex: "The Ridge" },
    { name: "69th Ward", complex: "Snowview" },
    { name: "70th Ward", complex: "The Ridge" },
    { name: "95th Ward", complex: "Kensington" },
    { name: "98th Ward", complex: "Windsor" },
    { name: "100th Ward", complex: "Kensington" },
    { name: "119th Ward", complex: "The Ridge" },
    { name: "115th Ward", complex: "Abby Lane Manor"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
    { name: "NA", complex: "NA"},
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowResults(true);
    }
  };

  // Apply filter + search
  const filteredItems = items.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || item.complex === filter;
    return matchesQuery && matchesFilter;
  });


  return (
    <div style={{ padding: "1rem" }}>
      <h1>Search Library</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search Ward..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Dropdown Filter */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="The Ridge">The Ridge</option>
        <option value="Stonebrook">Stonebrook</option>
        <option value="Milano Flats">Milano Flats</option>
        <option value="University View">University View</option>
      </select>

      {/* Results */}
      {showResults && (
        <ul>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li key={index}>
                {item.name} — <i>{item.role}</i>
              </li>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
