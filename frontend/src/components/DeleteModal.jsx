import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import DeleteWeekForm from "./DeleteWeekForm";
import "../index.css";

const DeleteModal = ({ data, onClose }) => {
  // data holds all week, day, and workout objects in 1 file

  // Extract weeks information from data
  const weeks = data.map((item) => ({
    week_number: item.week_number,
  }));

  const [weekFormData, setWeekFormData] = useState({
    week_number: "",
  });

  const handleWeekChange = (e) => {
    setWeekFormData({ ...weekFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called") // delete when done testing
    const token = localStorage.getItem("token");

    if (weekFormData.week_number) {
      console.log("Week number to delete:", weekFormData.week_number); // delete when done testing
      const userConfirmation = window.confirm(
        "Do you really want to delete the entire Week?"
      );

      if (userConfirmation) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/workouts/week/${weekFormData.week_number}`,
            {
              headers: {
                Authorization: "Token " + token,
              },
            }
          );
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    }
    onClose();
  };

  return (
    <Modal
      show
      onHide={onClose}
      size="lg"
      backdrop={false}
      className="backdrop"
      style={{ zIndex: 1050 }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">
          Select Fields as Needed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DeleteWeekForm
          weeks={weeks}
          weekFormData={weekFormData}
          handleChange={handleWeekChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={(e) => { console.log('Delete button clicked'); handleSubmit(e); }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
