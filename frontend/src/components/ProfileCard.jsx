import UpdateProfileForm from "../components/UpdateProfileForm";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DeleteProfile from "./DeleteProfile";

function ProfileCard({profile}) {
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const srcPage = window.location.pathname;

  /* FUNCTIONS */
  const handleShowModal = () => setShowModal(true);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleStatsToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(()=>{
    if(srcPage === '/myprofile/')
      setIsExpanded(true)
  }, [srcPage]);


  return (
    <div>
      <Card className="mx-auto " >
          <Card.Header>
            <Card.Title>{profile.user_name}</Card.Title>
            {(window.location.pathname === '/profile/') && <Button 
              variant="outline-primary"
              size="sm"
              onClick={() => handleStatsToggle()} >
                {isExpanded ? "Hide" : "Stats"}
            </Button>}
          </Card.Header>
          {isExpanded && (
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
                <Button variant="primary" onClick={handleShowModal}>Update</Button>
                <button className="btn btn-outline-danger" variant="danger" onClick={handleShowDeleteModal}>Delete</button>
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
          )}
        </Card>
    </div>
  );
}

export default ProfileCard;
