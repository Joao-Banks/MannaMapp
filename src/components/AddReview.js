import { useState } from "react";
import Modal from "./Modal";
import "./styles/Modal.css";

function AddReview() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Add a Review</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Add Your Review</h2>
        <p>Here’s where your form or text input will go later!</p>
      </Modal>
    </div>
  );
}

export default AddReview;
