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
    { name: "95th Ward", complex: "Abri Apartments"},
    { name: "113th Ward", complex: "Abri APartments"},
    { name: "98th Ward", complex: "Alldredge House"},
    { name: "57th Ward", complex: "Allen Sunrise Village"},
    { name: "102nd Ward", complex: "Allen Sunrise Village"},
    { name: "7th Ward", complex: "Alpine Chalet"},
    { name: "36th Ward", complex: "Alpine Chalet"},
    { name: "52nd Ward", complex: "Alpine Chalet"},
    { name: "104th Ward", complex: "Alpine Chalet"},
    { name: "4th Ward", complex: "American Avenue"},
    { name: "97th Ward", complex: "American Avenue"},
    { name: "118th Ward", complex: "Arcadia Apartments"},
    { name: "100th Ward", complex: "At the Grove"},
    { name: "7th Ward", complex: "Autumn Winds"},
    { name: "8th Ward", complex: "Autumn Winds"},
    { name: "31st Ward", complex: "Autumn Winds"},
    { name: "36th Ward", complex: "Autumn Winds"},
    { name: "52nd Ward", complex: "Autumn Winds"},
    { name: "56th Ward", complex: "Autumn Winds"},
    { name: "71st Ward", complex: "Autumn Winds"},
    { name: "72nd Ward", complex: "Autumn Winds"},
    { name: "89th Ward", complex: "Autumn Winds"},
    { name: "90th Ward", complex: "Autumn Winds"},
    { name: "104th Ward", complex: "Autumn Winds"},
    { name: "122nd Ward", complex: "Autumn Winds"},
    { name: "38th Ward", complex: "Avonlea-Men"},
    { name: "44th Ward", complex: "Avonlea-Women"},
    { name: "94th Ward", complex: "Avonlea House"},
    { name: "100th Ward", complex: "Bayside Manor"},
    { name: "18th Ward", complex: "Birch Plaza"},
    { name: "47th Ward", complex: "Birch Plaza"},
    { name: "76th Ward", complex: "Birch Plaza"},
    { name: "88th Ward", complex: "Birch Plaza"},
    { name: "120th Ward", complex: "Birch Plaza"},
    { name: "126th Ward", complex: "Birch Plaza"},
    { name: "18th Ward", complex: "Birch 1"},
    { name: "88th Ward", complex: "Birch 1"},
    { name: "18th Ward", complex: "Birch 2"},
    { name: "11th Ward", complex: "Bountiful Place"},
    { name: "35th Ward", complex: "Bountiful Place"},
    { name: "68th Ward", complex: "Bountiful Place"},
    { name: "6th Ward", complex: "Brighton Apartments"},
    { name: "121st Ward", complex: "Brighton Apartments"},
    { name: "29th Ward", complex: "Brooklyn Apartments"},
    { name: "118th Ward", complex: "Brooklyn APartments"},
    { name: "75th Ward", complex: "Brookside Village"},
    { name: "51st Ward", complex: "Brookside Village"},
    { name: "78th Ward", complex: "Brookside Village"},
    { name: "18th Ward", complex: "Bunkhouse"},
    { name: "44th Ward", complex: "Bunkhouse"},
    { name: "77th Ward", complex: "Bunkhouse"},
    { name: "120th Ward", complex: "Bunkhouse"},
    { name: "126th Ward", complex: "Bunkhouse"},
    { name: "78th Ward", complex: "Camden Apartments"},
    { name: "75th Ward", complex: "Camden APartments"},
    { name: "38th Ward", complex: "Carriage House"},
    { name: "39th Ward", complex: "Carriage House"},
    { name: "65th Ward", complex: "Carriage House"},
    { name: "99th Ward", complex: "Carriage House"},
    { name: "65th Ward", complex: "Carriage House Townhouse"},
    { name: "14th Ward", complex: "The Cedars"},
    { name: "22nd Ward", complex: "The Cedars"},
    { name: "45th Ward", complex: "The Cedars"},
    { name: "59th Ward", complex: "The Cedars"},
    { name: "76th Ward", complex: "The Cedars"},
    { name: "18th Ward", complex: "The Cedars"},
    { name: "47th Ward", complex: "The Cedars"},
    { name: "77th Ward", complex: "The Cedars"},
    { name: "120th Ward", complex: "The Cedars"},
    { name: "6th Ward", complex: "Centre Square"},
    { name: "9th Ward", complex: "Centre Square"},
    { name: "30th Ward", complex: "Centre Square"},
    { name: "34th Ward", complex: "Centre Square"},
    { name: "42nd Ward", complex: "Centre Square"},
    { name: "74th Ward", complex: "Centre Square"},
    { name: "26th Ward", complex: "Centre Square"},
    { name: "94th Ward", complex: "Clarke Apartments"},
    { name: "41st Ward", complex: "College Avenue Apartments"},
    { name: "69th Ward", complex: "Colonial Heights Townhouses"},
    { name: "49th Ward", complex: "Colonial House"},
    { name: "127th Ward", complex: "Colonial House"},
    { name: "128th Ward", complex: "Colonial House"},
    { name: "55th Ward", complex: "Cottonwood"},
    { name: "5th Ward", complex: "The Cove"},
    { name: "61st Ward", complex: "The Cove"},
    { name: "62nd Ward", complex: "The Cove"},
    { name: "65th Ward", complex: "The Cove"},
    { name: "125th Ward", complex: "The Cove"},
    { name: "50th Ward", complex: "Creekside Cottages"},
    { name: "58th Ward", complex: "Crestwood Apartments"},
    { name: "58th Ward", complex: "Crestwood Cottage"},
    { name: "58th Ward", complex: "Crestwood House"},
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
        {Array.from(new Set(items.map((item) => item.complex)))  // unique complexes
        .sort() // optional: sort alphabetically
        .map((complex) => (
      <option key={complex} value={complex}>
        {complex}
      </option>
      ))}
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
