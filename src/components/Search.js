import { useState, useEffect, useCallback } from "react";
import Ward from "./Ward";
import "./styles/Search.css";
import "./styles/Modal.css";
import { supabase } from "../supabaseClient";

function Search() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("none");
  const [showResults, setShowResults] = useState(true);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch wards, complexes, and average ratings ---
  const fetchWards = useCallback(async () => {
    setLoading(true);

    // 1️⃣ Get all wards
    const { data: wards, error: wardError } = await supabase
      .from("Ward")
      .select("ward_id, name");
    if (wardError) {
      console.error("Error fetching wards:", wardError);
      setLoading(false);
      return;
    }

    // 2️⃣ Get relationships between wards and complexes
    const { data: relations, error: relationError } = await supabase
      .from("Ward_has_Complex")
      .select("ward_id, complex_id");
    if (relationError) {
      console.error("Error fetching relationships:", relationError);
      setLoading(false);
      return;
    }

    // 3️⃣ Get all complexes
    const { data: complexes, error: complexError } = await supabase
      .from("Complex")
      .select("complex_id, name");
    if (complexError) {
      console.error("Error fetching complexes:", complexError);
      setLoading(false);
      return;
    }

    // 4️⃣ Get average ratings for each ward
    // 4️⃣ Get average ratings for each ward (aggregate)
    // 4️⃣ Get average ratings for each ward via RPC
    const { data: ratings, error: ratingError } = await supabase.rpc(
      "get_average_ratings"
    );

    if (ratingError) {
      console.error("Error fetching ratings:", ratingError);
      setLoading(false);
      return;
    }

    // 5️⃣ Combine everything into a single data structure
    const formatted = wards.map((w) => {
      const wardComplexIds = relations
        .filter((rel) => rel.ward_id === w.ward_id)
        .map((rel) => rel.complex_id);

      const wardComplexes = complexes
        .filter((c) => wardComplexIds.includes(c.complex_id))
        .map((c) => c.name);

      const wardRating = ratings.find((r) => r.ward_id === w.ward_id);
      const avgRating = wardRating ? Number(wardRating.avg_rating) : 0;

      return {
        ward_id: w.ward_id,
        name: w.name,
        complexes: wardComplexes,
        avgRating,
      };
    });

    setItems(formatted);
    setLoading(false);
  }, []);

  // --- Initial load ---
  useEffect(() => {
    fetchWards();
  }, [fetchWards]);

  if (loading)
    return (
      <div className="loading-container">
        <p className="loading-text">
          🕊️ Loading wards<span className="dots"></span>
        </p>
      </div>
    );

  // --- Called when a new review is added ---
  async function handleAddReview() {
    await fetchWards(); // refresh averages from Supabase
  }

  // --- Handle Enter key ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter") setShowResults(true);
  };

  // --- Build complex list for dropdown ---
  const allComplexes = Array.from(
    new Set(items.flatMap((item) => item.complexes))
  ).sort();

  // --- Filter search results ---
  const filteredItems = items.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.complexes.some((c) => c.toLowerCase().includes(query.toLowerCase()));
    const matchesFilter = filter === "none" || item.complexes.includes(filter);
    return matchesQuery && matchesFilter;
  });

  // --- Determine whether to show results ---
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
            setShowResults(true);
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

      {shouldShowResults && (
        <div className="search-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Ward
                key={item.ward_id}
                id={item.ward_id}
                name={item.name}
                complexes={item.complexes}
                avgRating={item.avgRating}
                reviews={[]} // Reviews handled individually via modals
                onAddReview={handleAddReview}
              />
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
