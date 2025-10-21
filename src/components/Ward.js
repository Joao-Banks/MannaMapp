import "./styles/Ward.css";
import "./styles/Modal.css";
import AddReview from "./AddReview";
import SeeReviews from "./SeeReviews";
import { useMemo } from "react";

function Ward({ name, complexes, reviews, onAddReview }) {
  // Calculate average rating (memoized for performance)
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  return (
    <div className="ward-card">
      {/* Header */}
      <div className="ward-header">
        <h3 className="ward-title">{name}</h3>

        {/* Dynamic stars with half-star logic */}
        <div className="ward-stars">
          {Array.from({ length: 5 }).map((_, i) => {
            const diff = averageRating - i;
            if (diff >= 1) return <span key={i}>★</span>; // full star
            if (diff >= 0.5) return <span key={i}>⯪</span>; // half star
            return <span key={i}>☆</span>; // empty star
          })}
          {reviews.length > 0 && (
            <span className="avg-number">({averageRating.toFixed(1)})</span>
          )}
        </div>
      </div>

      {/* Ward details */}
      <p className="ward-details">
        <strong>Complexes:</strong> {complexes.join(", ")}
      </p>

      {/* Buttons */}
      <div className="ward-buttons">
        <SeeReviews wardName={name} reviews={reviews} />
        <AddReview wardName={name} onAddReview={onAddReview} />
      </div>
    </div>
  );
}

export default Ward;
