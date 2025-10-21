import { useState } from "react";
import Modal from "./Modal";
import "./styles/Modal.css";
import "./styles/AddReview.css"; // new file for form styling

function AddReview({ wardName, onAddReview }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewer, setReviewer] = useState("");

  const handleSubmit = () => {
    if (!reviewText.trim() || rating < 1) {
      alert("Please select a rating and write your review.");
      return;
    }

    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}-${today.getFullYear()}`;

    const newReview = {
      id: Date.now(),
      reviewer: reviewer.trim() || "Anonymous",
      rating,
      text: reviewText,
      date: formattedDate,
    };

    onAddReview(wardName, newReview);

    // reset fields
    setModalOpen(false);
    setReviewer("");
    setReviewText("");
    setRating(0);
    setHoverRating(0);
  };

  return (
    <>
      <button className="add-btn" onClick={() => setModalOpen(true)}>
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
                key={starValue}
                className={
                  starValue <= (hoverRating || rating) ? "star filled" : "star"
                }
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
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
