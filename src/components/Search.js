import { useState, useEffect } from "react";
import Ward from "./Ward";
import "./styles/Search.css";
import "./styles/Modal.css";
import reviewsData from "./ReviewsData";

function Search() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("none");
  const [showResults, setShowResults] = useState(true);
  const [reviews, setReviews] = useState(reviewsData);
  const [items, setItems] = useState([]); // list of wards from backend
  const [loading, setLoading] = useState(true);

  // --- Fetch wards from Express API ---
  useEffect(() => {
    fetch("http://localhost:4000/api/wards")
      .then((res) => res.json())
      .then((data) => {
        // backend returns ward_id, ward_name, complexes
        const formatted = data.map((w) => ({
          ward_id: w.ward_id,
          name: w.ward_name,
          complexes: w.complexes ? w.complexes.split(", ") : [],
          avg_rating: w.avg_rating || 0, // ← new field
        }));
        setItems(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching wards:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading wards...</p>;

  // --- Add review handler (local state only) ---
  function handleAddReview(wardName, newReview) {
    setReviews((prev) => {
      const existingWard = prev.find((w) => w.wardName === wardName);
      if (existingWard) {
        return prev.map((w) =>
          w.wardName === wardName
            ? { ...w, reviews: [...w.reviews, newReview] }
            : w
        );
      } else {
        return [...prev, { wardName, reviews: [newReview] }];
      }
    });
  }

  // --- Handle Enter key for search ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowResults(true);
    }
  };

  // --- Get all unique complexes for dropdown ---
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

  // --- Decide whether to show results ---
  const shouldShowResults =
    showResults && (query.trim() !== "" || filter !== "none");

  // --- Render ---
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

      {/* --- Results --- */}
      {shouldShowResults && (
        <div className="search-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const wardReviews =
                reviews.find((r) => r.wardName === item.name)?.reviews || [];

              return (
                <Ward
                  key={item.ward_id}
                  id={item.ward_id}
                  name={item.name}
                  complexes={item.complexes}
                  avgRating={item.avg_rating} // ✅ new prop
                  reviews={wardReviews}
                  onAddReview={handleAddReview}
                />
              );
            })
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
