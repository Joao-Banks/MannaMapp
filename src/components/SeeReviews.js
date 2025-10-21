// src/components/SeeReviews.js
import { useState } from "react";
import Modal from "./Modal";
import "./styles/Modal.css";
import "./styles/Ward.css"; // optional, if you need your .review-card styles

function SeeReviews({ wardName, reviews }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>See Reviews</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>{wardName} Reviews</h2>

        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((r) => (
              <div key={r.id} className="review-card">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < r.rating ? "★" : "☆"}</span>
                ))}
                <span className="review-fraction"> {r.rating}/5</span>{" "}
                <p className="review-text">"{r.text}"</p>
                <small className="review-meta">
                  — {r.reviewer} on {r.date}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to add one!</p>
        )}
      </Modal>
    </>
  );
}

export default SeeReviews;
