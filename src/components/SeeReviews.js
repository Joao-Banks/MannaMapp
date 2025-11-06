import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./styles/Modal.css";
import "./styles/Ward.css";

function SeeReviews({ wardId, wardName }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isModalOpen) return; // only fetch when modal is opened
    setLoading(true);
    setError("");

    fetch(`http://localhost:4000/api/reviews/${wardId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading reviews:", err);
        setError("Failed to load reviews.");
        setLoading(false);
      });
  }, [isModalOpen, wardId]);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>See Reviews</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>{wardName} Reviews</h2>

        {loading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((r) => (
              <div key={r.review_id} className="review-card">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < r.rating ? "★" : "☆"}</span>
                ))}
                <span className="review-fraction"> {r.rating}/5</span>
                <p className="review-text">"{r.comment}"</p>
                <small className="review-meta">
                  — {r.reviewer} on{" "}
                  {new Date(r.date).toLocaleDateString("en-US")}
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
