import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";


const UpdateProfileForm = ({ showModal, setShowModal, profile }) => {
    const handleCloseModal = () => setShowModal(false);

    const token = localStorage.getItem("token");
    const BASE_URL = "http://localhost:8000/workouts";

    const [formData, setFormData] = useState({
        user: profile.user,
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

    /* Get User's current profile*/
    useEffect(()=>{
      setFormData(profile);
    }, [profile, showModal])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const SUBMIT_URL = BASE_URL + "/profile/"+ profile.user + "/";
        
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
            alert(errors, "made it")
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
            window.location.reload(false)
          } catch (err) {
            console.error(err);
          }

    }

    const handleIntegerChange = (e) => {
        const value = e.target.value;
        const intValue = parseInt(value);
        //console.log(intValue);

        if (!isNaN(intValue)) {
            //console.log(intValue);
          setFormData({
            ...formData,
            user: profile.user,
            [e.target.name]: intValue,
          });
        }
      };


    return (
        <>
        <Modal className='backdrop' show={showModal} onHide={handleCloseModal} backdrop={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update My Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Weight Unit</Form.Label>
                        <Form.Select name="weights" value={formData.weights} onChange={handleIntegerChange}>
                            <option value="">--Please choose your preferred weight system--</option>
                            <option value="1">English -- LBs</option>
                            <option value="2">Metric -- KGs</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Max Snatch :</Form.Label>
                        <Form.Control step={1} name="max_snatch" type="number" id="max_snatch" value={formData.max_snatch} onChange={handleIntegerChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max Clean &amp; Jerk:</Form.Label>
                        <Form.Control step={1} name="max_cleanjerk" type="number" id="max_cleanjerk" value={formData.max_cleanjerk} onChange={handleIntegerChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max Front Squat</Form.Label>
                        <Form.Control step={1} name="max_frontsquat" type="number" id="max_frontsquat" value={formData.max_frontsquat} onChange={handleIntegerChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max Back Squat</Form.Label>
                        <Form.Control step={1} name="max_backsquat" type="number" id="max_backsquat" value={formData.max_backsquat} onChange={handleIntegerChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <div className="textaligncenter">
            <Button variant="primary" onClick={handleSubmit} type="submit">Save Changes</Button> 
            </div>
            </Modal.Footer>
        </Modal>

        </>);
};

export default UpdateProfileForm;
