import "./styles/Ward.css";
import "./styles/Modal.css";
import AddReview from "./AddReview";
import SeeReviews from "./SeeReviews";
import { useMemo } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Ward({
  id,
  name,
  complexes,
  avgRating = 0,
  reviews = [],
  onAddReview,
}) {
  // ✅ Fallback to DB avgRating if there are no local reviews
  const averageRating = useMemo(() => {
    if (reviews.length > 0) {
      const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
      return total / reviews.length;
    }
    return Number(avgRating) || 0;
  }, [reviews, avgRating]);

  return (
    <div className="ward-card">
      {/* Header */}
      <div className="ward-header">
        <h3 className="ward-title">{name}</h3>

        {/* ⭐ Star Rating */}
        <div className="ward-stars">
          {Array.from({ length: 5 }).map((_, i) => {
            const diff = averageRating - i;
            if (diff >= 1) return <FaStar key={i} color="gold" />;
            if (diff >= 0.5) return <FaStarHalfAlt key={i} color="gold" />;
            return <FaRegStar key={i} color="#ccc" />;
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
        <SeeReviews wardId={id} wardName={name} />
        <AddReview wardId={id} wardName={name} onReviewAdded={onAddReview} />
      </div>
    </div>
  );
}

export default Ward;
