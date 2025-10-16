import { useState } from "react";
import Modal from "./Modal";
import "./styles/Modal.css";

function SeeReviews() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>See Reviews</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Here's where you can looks at all the reviews!</h2>
        <p>Here’s where your form or text input will go later!</p>
      </Modal>
    </div>
  );
}

export default SeeReviews;
