import UpdateProfileForm from "./UpdateProfileForm";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DeleteProfile from "./DeleteProfile";

function MyProfileCard({profile}) {
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* FUNCTIONS */
  const handleShowModal = () => setShowModal(true);
  const handleShowDeleteModal = () => setShowDeleteModal(true);


  useEffect(()=>{
    if(window.location.pathname === '/myprofile/')
      setIsExpanded(true)
  }, []);


  return (
    <div>
      <Card style={{ width: "18rem" }}>
          <Card.Header>
            <Card.Title>{profile.user_name}</Card.Title>
          </Card.Header>
            <div className="profile_breakdown">
            <Card.Body>
              <p>
                Snatch:{" "}
                {profile.weights === 1
                  ? `${profile.max_snatch} LB`
                  : `${profile.max_snatch} KG`}
              </p>
              <p>
                Clean & Jerk:{" "}
                {profile.weights === 1
                  ? `${profile.max_cleanjerk} LB`
                  : `${profile.max_cleanjerk} KG`}
              </p>
              <p>
                Front Squat:{" "}
                {profile.weights === 1
                  ? `${profile.max_frontsquat} LB`
                  : `${profile.max_frontsquat} KG`}
              </p>
              <p>
                Back Squat:{" "}
                {profile.weights === 1
                  ? `${profile.max_backsquat} LB`
                  : `${profile.max_backsquat} KG`}
              </p>
            </Card.Body>
            <Card.Footer>
              <ButtonGroup size="sm">
                <Button variant="info" onClick={handleShowModal}>Update</Button>
                <Button variant="danger" onClick={handleShowDeleteModal}>Delete</Button>
              </ButtonGroup>

              <UpdateProfileForm
                showModal={showModal}
                setShowModal={setShowModal}
                profile={profile} />

              <DeleteProfile
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                profile={profile} />

            </Card.Footer>
            </div>
        </Card>
    </div>
  );
}

export default MyProfileCard;
