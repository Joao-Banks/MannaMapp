import "./styles/Ward.css";
import AddReview from "./AddReview";
import SeeReviews from "./SeeReviews";
function Ward({ name, complexes }) {
  return (
    <div className="ward-card">
      <div className="ward-header">
        <h3 className="ward-title">{name}</h3>
        <div className="ward-stars">{"☆".repeat(5)}</div>
      </div>

      <p className="ward-details">
        <strong>Complexes:</strong> {complexes.join(", ")}
      </p>

      <div className="ward-buttons">
        <SeeReviews />
        <AddReview />
      </div>
    </div>
  );
}

export default Ward;
