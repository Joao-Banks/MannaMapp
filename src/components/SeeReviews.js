import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./styles/Modal.css";
import "./styles/Ward.css";
import { supabase } from "../supabaseClient";

function SeeReviews({ wardId, wardName }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isModalOpen) return; // only fetch when modal is opened

    const fetchReviews = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("Review")
        .select("review_id, reviewer, rating, comment, date")
        .eq("ward_id", wardId)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error loading reviews:", error);
        setError("Failed to load reviews.");
        setLoading(false);
        return;
      }

      setReviews(data || []);
      setLoading(false);
    };

    fetchReviews();
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
