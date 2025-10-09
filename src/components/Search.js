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
    { name: "98th Ward", complex: "Windsor" },
    { name: "33rd Ward", complex: "The Ridge" },
    { name: "69th Ward", complex: "TBA" },
    { name: "70th Ward", complex: "TBA" },
    { name: "95th Ward", complex: "TBA" },
    { name: "98th Ward", complex: "TBA" },
    { name: "100th Ward", complex: "TBA" },
    { name: "119th Ward", complex: "TBA" },
    { name: "23rd Ward", complex: "University View" },
    { name: "32nd Ward", complex: "University View" },
    { name: "79th Ward", complex: "University View" },
    { name: "82nd Ward", complex: "University View" },
    { name: "105th Ward", complex: "University View" },
    { name: "111th Ward", complex: "University View" },
    { name: "112th Ward", complex: "University View" },
    { name: "123rd Ward", complex: "University View" },
    { name: "11th Ward", complex: "Towers 2" },
    { name: "35th Ward", complex: "Towers 2" },
    { name: "68th Ward", complex: "Towers 2" },
    { name: "116th Ward", complex: "Towers 2" },
    { name: "63rd Ward", complex: "Towers 1" },
    { name: "111th Ward", complex: "Towers 1" },
    { name: "112th Ward", complex: "Towers 1" },
    { name: "123rd Ward", complex: "Towers 1" },
    { name: "67th Ward", complex: "Sundance" },
    { name: "110th Ward", complex: "Sundance" },
    { name: "39th Ward", complex: "Sundance" },
    { name: "99th Ward", complex: "Sundance" },    
    { name: "110th Ward", complex: "Sundance" },
    { name: "118th Ward", complex: "Sundance" },
    { name: "36th Ward", complex: "Somerset" },
    { name: "89th Ward", complex: "Somerset" },
    { name: "90th Ward", complex: "Somerset" },
    { name: "89th Ward", complex: "Somerset" },
    { name: "90th Ward", complex: "Somerset" },
    { name: "69th Ward", complex: "Snowview" },
    { name: "13th Ward", complex: "Shelbourne" },
    { name: "51st Ward", complex: "Shelbourne" },
    { name: "78th Ward", complex: "Shelbourne" },
    { name: "7th Ward", complex: "Royal Crest" },
    { name: "52nd Ward", complex: "Royal Crest" },
    { name: "56th Ward", complex: "Royal Crest" },
    { name: "72nd Ward", complex: "Royal Crest" },
    { name: "104th Ward", complex: "Royal Crest" },
    { name: "122nd Ward", complex: "Royal Crest" },
    { name: "16th Ward", complex: "Rockland" },
    { name: "114th Ward", complex: "Rockland" },
    { name: "117th Ward", complex: "Rockland" },
    { name: "33rd Ward", complex: "Riviera" },
    { name: "98th Ward", complex: "Riviera" },
    { name: "50th Ward", complex: "Raspberry Gardens" },
    { name: "17th Ward", complex: "Pinnacle Point" },
    { name: "97th Ward", complex: "Pinnacle Point" },
    { name: "66th Ward", complex: "Pines" },
    { name: "84th Ward", complex: "Pines" },
    { name: "66th Ward", complex: "Pines" },
    { name: "84th Ward", complex: "Pines" },
    { name: "94th Ward", complex: "Pines" },
    { name: "50th Ward", complex: "Park View" },
    { name: "50th Ward", complex: "Park View" },
    { name: "27th Ward", complex: "Northpoint" },
    { name: "37th Ward", complex: "Northpoint" },
    { name: "60th Ward", complex: "Northpoint" },
    { name: "83rd Ward", complex: "Northpoint" },
    { name: "91st Ward", complex: "Northpoint" },
    { name: "92nd Ward", complex: "Northpoint" },
    { name: "93rd Ward", complex: "Northpoint" },
    { name: "106th Ward", complex: "Northpoint" },
    { name: "46th Ward", complex: "Nauvoo House 2" },
    { name: "107th Ward", complex: "Nauvoo House 2" },
    { name: "108th Ward", complex: "Nauvoo House 2" },
    { name: "109th Ward", complex: "Nauvoo House 2" },
    { name: "26th Ward", complex: "Nauvoo House 1" },
    { name: "46th Ward", complex: "Nauvoo House 1" },
    { name: "107th Ward", complex: "Nauvoo House 1" },
    { name: "108th Ward", complex: "Nauvoo House 1" },
    { name: "109th Ward", complex: "Nauvoo House 1" },
    { name: "11th Ward", complex: "Mountain Crest" },
    { name: "16th Ward", complex: "Milano Flats" },
    { name: "114th Ward", complex: "Milano Flats" },
    { name: "56th Ward", complex: "Milano Flats" },
    { name: "122nd Ward", complex: "Milano Flats" },
    { name: "13th Ward", complex: "Lodge" },
    { name: "20th Ward", complex: "Lodge" },
    { name: "24th Ward", complex: "Lodge" },
    { name: "43rd Ward", complex: "Lodge" },
    { name: "51st Ward", complex: "Lodge" },
    { name: "53rd Ward", complex: "Lodge" },
    { name: "54th Ward", complex: "Lodge" },
    { name: "64th Ward", complex: "Lodge" },
    { name: "103rd Ward", complex: "Lodge" },
    { name: "124th Ward", complex: "Lodge" },
    { name: "10th Ward", complex: "Legacy Ridge" },
    {name: "48th Ward", complex: "Legacy Ridge" },
    {name: "70th Ward", complex: "Legacy Ridge" },
    {name: "119th Ward", complex: "Legacy Ridge" },
    {name: "115th Ward", complex: "Landing" },
    {name: "116th Ward", complex: "Landing" },
    {name: "117th Ward", complex: "Landing" },
    {name: "17th Ward", complex: "La Jolla" },
    {name: "40th Ward", complex: "La Jolla" },
    {name: "58th Ward", complex: "La Jolla" },
    {name: "95th Ward", complex: "Kensington Manor" },
    {name: "100th Ward", complex: "Kensington Manor" },
    {name: "10th Ward", complex: "Jordan Ridge" },
    {name: "33rd Ward", complex: "Jordan Ridge" },
    {name: "48th Ward", complex: "Jordan Ridge" },
    {name: "70th Ward", complex: "Jordan Ridge" },
    {name: "119th Ward", complex: "Jordan Ridge" },
    {name: "12th Ward", complex: "Hillcrest Townhouses" },
    {name: "8th Ward", complex: "Heritage" },
    {name: "31st Ward", complex: "Heritage" },
    {name: "71st Ward", complex: "Heritage" },
    {name: "41st Ward", complex: "Haven White" },
    {name: "41st Ward", complex: "Haven Red" },
    {name: "41st Ward", complex: "Haven House 179" },
    {name: "41st Ward", complex: "Haven House 175" },
    {name: "41st Ward", complex: "Haven House 163" },
    {name: "41st Ward", complex: "Haven House 149" },
    {name: "25th Ward", complex: "Haven House 129" },
    {name: "41st Ward", complex: "Haven Green" },
    {name: "25th Ward", complex: "Haven Green" },
    {name: "41st Ward", complex: "Haven Blue" },
    {name: "25th Ward", complex: "Haven Blue" },
    {name: "29th Ward", complex: "Georgetown" },
    {name: "63rd Ward", complex: "Gates" },
    {name: "73rd Ward", complex: "Gates" },
    {name: "80th Ward", complex: "Gates" },
    {name: "81st Ward", complex: "Gates" },
    {name: "105th Ward", complex: "Gates" },
    {name: "112th Ward", complex: "Gates" },
    {name: "123rd Ward", complex: "Gates" },
    {name: "72nd Ward", complex: "Delta Phi" },
    {name: "94th Ward", complex: "Davenport" },

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
