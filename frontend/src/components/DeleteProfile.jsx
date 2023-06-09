import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const DeleteProfile = ({ showModal, setShowModal, profile }) => {
    const handleCloseModal = () => setShowModal(false);

    const token = localStorage.getItem("token");
    const BASE_URL = "http://localhost:8000/workouts";
    const navigate = useNavigate();

    const handleDeleteProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(BASE_URL + '/profile/' + profile.user, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            
            alert('The profile has been removed')

            if (window.location.pathname === '/myprofile/'){
                window.location.reload();
            } else if (window.location.pathname === '/profile/') {
                window.location.reload();
            } else {
                navigate('/app');
            }
            
        } catch (error) {
            console.error(error); // Log any errors to the console
        }
      };

    return (
        <>
        <Modal className='backdrop' show={showModal} onHide={handleCloseModal} backdrop={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete this profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {profile.user_name}'s profile will be deleted.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteProfile}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        </>);
};

export default DeleteProfile;
