import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const ModalProfileForm = ({ showModal, setShowModal, profile }) => {
    const handleCloseModal = () => setShowModal(false);
    const token = localStorage.getItem("token");
    const BASE_URL = "http://127.0.0.1:8000/workouts";

    const [formData, setFormData] = useState({
        user: "",
        weights: "",
        max_snatch: "",
        max_cleanjerk: "",
        max_frontsquat: "",
        max_backsquat: "",
        id: profile.id,
      });
    
    /* USE FOR DEV ONLY*/
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();
    

    /* Get User's current profile*/
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await axios.get(
              BASE_URL + "/profile/",
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            setFormData(response.data);
          } catch (err) {
            // console.log(err.response.data)
          }
        };
        fetchProfile();
      }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const SUBMIT_URL = BASE_URL + "/profile/"+ profile.id + "/";
        console.log('submit func');
        /* Validation of input data */
        let errors = {};
        if (formData.max_snatch <= 0) {
            errors.max_snatch = "Max Snatch must be greater than 0";
        }
        if (formData.max_cleanjerk <= 0) {
            errors.max_cleanjerk = "Max Clean & Jerk must be greater than 0";
        }
        if (formData.max_frontsquat <= 0) {
            errors.max_frontsquat = "Max Front Squat must be greater than 0";
        }
        if (formData.max_backsquat <= 0) {
            errors.max_backsquat = "Max Back Squat must be greater than 0";
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            alert(errors)
            return;
        }

        try {
            // const base_url = process.env.REACT_APP_BASE_URL
            await axios.put(
              SUBMIT_URL,
              formData,
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            setErrors({});
            setSubmitted(true);
            alert("Profile has been updated");
          } catch (err) {
            console.log(err.response.data);
          }

    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            user: profile.id,
            [e.target.name]: e.target.value,
          });
          console.log(formData, "DATA OF THE FORM IS NEWLY SET"); // delete when done, for testing only      
    }


    return (
        <>
        <Modal show={showModal} onHide={handleCloseModal} backdrop={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update MyProfile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Weight Unit</Form.Label>
                        <Form.Select name="weights" value={formData.weights} onChange={handleChange}>
                            <option value="">--Please choose your preferred weight system--</option>
                            <option value="1">English -- LBs</option>
                            <option value="2">Metric -- KGs</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Max Snatch :</Form.Label>
                        <Form.Control name="max_snatch" type="number" id="max_snatch" value={formData.max_snatch} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max Clean &amp; Jerk:</Form.Label>
                        <Form.Control name="max_cleanjerk" type="number" id="max_cleanjerk" value={formData.max_cleanjerk} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max Front Squat</Form.Label>
                        <Form.Control name="max_frontsquat" type="number" id="max_frontsquat" value={formData.max_frontsquat} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max Back Squat</Form.Label>
                        <Form.Control name="max_backsquat" type="number" id="max_backsquat" value={formData.max_backsquat} onChange={handleChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Button variant="primary" onClick={handleSubmit} type="submit">Save Changes</Button>
            </Modal.Footer>
        </Modal>

        </>);
};

export default ModalProfileForm;