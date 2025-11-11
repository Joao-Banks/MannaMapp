import { useState, useEffect } from "react";
import Ward from "./Ward";
import "./styles/Search.css";
import "./styles/Modal.css";
import reviewsData from "./ReviewsData";
import { supabase } from "../supabaseClient";

function Search() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("none");
  const [showResults, setShowResults] = useState(true);
  const [reviews, setReviews] = useState(reviewsData);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch wards and complexes from Supabase ---
  useEffect(() => {
    const fetchWards = async () => {
      setLoading(true);

      // Get all wards
      const { data: wards, error: wardError } = await supabase
        .from("Ward")
        .select("ward_id, name");

      if (wardError) {
        console.error("Error fetching wards:", wardError);
        setLoading(false);
        return;
      }

      // Get relationships between wards and complexes
      const { data: relations, error: relationError } = await supabase
        .from("Ward_has_Complex")
        .select("ward_id, complex_id");

      if (relationError) {
        console.error("Error fetching relationships:", relationError);
        setLoading(false);
        return;
      }

      // Get all complexes
      const { data: complexes, error: complexError } = await supabase
        .from("Complex")
        .select("complex_id, name");

      if (complexError) {
        console.error("Error fetching complexes:", complexError);
        setLoading(false);
        return;
      }

      // Combine data into your ward objects
      const formatted = wards.map((w) => {
        const wardComplexIds = relations
          .filter((rel) => rel.ward_id === w.ward_id)
          .map((rel) => rel.complex_id);

        const wardComplexes = complexes
          .filter((c) => wardComplexIds.includes(c.complex_id))
          .map((c) => c.name);

        return {
          ward_id: w.ward_id,
          name: w.name,
          complexes: wardComplexes,
        };
      });

      setItems(formatted);
      setLoading(false);
    };

    fetchWards();
  }, []);

  if (loading) return <p>Loading wards...</p>;

  // --- Add review handler ---
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

  // --- Handle Enter key ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter") setShowResults(true);
  };

  // --- Get complexes list for dropdown ---
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

  // --- Display results ---
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
            filteredItems.map((item) => {
              const wardReviews =
                reviews.find((r) => r.wardName === item.name)?.reviews || [];
              return (
                <Ward
                  key={item.ward_id}
                  id={item.ward_id}
                  name={item.name}
                  complexes={item.complexes}
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
