import { useState } from "react";
import Modal from "./Modal";
import "./styles/Modal.css";
import "./styles/AddReview.css"; // keep your styling

function AddReview({ wardId, wardName, onReviewAdded }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewer, setReviewer] = useState("");
  const openModal = () => {
    setModalOpen(true);
    setRating(0);
    setHoverRating(0);
  };

  const handleSubmit = async () => {
    if (!reviewText.trim() || rating < 1) {
      alert("Please select a rating and write your review.");
      return;
    }

    // --- Prepare review data ---
    const newReview = {
      reviewer: reviewer.trim() || "Anonymous",
      rating,
      comment: reviewText.trim(),
      ward_id: wardId,
    };

    try {
      const response = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Review added successfully!");
        // close modal and reset
        setModalOpen(false);
        setReviewer("");
        setReviewText("");
        setRating(0);
        setHoverRating(0);

        // ask parent to refresh the reviews
        if (onReviewAdded) onReviewAdded();
      } else {
        alert("❌ Failed to add review. Please try again.");
      }
    } catch (err) {
      console.error("Error adding review:", err);
      alert("Server error while adding review.");
    }
  };

  return (
    <>
      <button className="add-btn" onClick={openModal}>
        Add a Review
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="modal-title">Add a Review for {wardName}</h2>

        {/* --- Name Input --- */}
        <label className="input-label">Your Name:</label>
        <input
          type="text"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          placeholder="Enter your name (optional)"
          className="review-input"
        />

        {/* --- Star Rating --- */}
        <div className="star-rating">
          {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1;
            return (
              <span
                key={i}
                className={`star ${
                  i + 1 <= (hoverRating || rating) ? "filled" : ""
                }`}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            );
          })}
        </div>

        {/* --- Review Text --- */}
        <label className="input-label">Your Review:</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          className="review-textarea"
        />

        {/* --- Submit Button --- */}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Review
        </button>
      </Modal>
    </>
  );
}

export default AddReview;
