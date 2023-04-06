import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import SignupForm from '../components/SignupForm';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  const handleShowNewClientModal = () => setShowNewClientModal(true);
  const handleCloseNewClientModal = () => setShowNewClientModal(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("searchTerm", searchTerm); // delete when done testing
    onSearch(searchTerm);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          {/* <Navbar.Brand>**Coach Menu</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link onClick={handleShowNewClientModal}>Add New Client</Nav.Link>
            </Nav>
            <Form inline="true" onSubmit={handleSubmit}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormControl
                  type="text"
                  placeholder="Search Profiles"
                  className="mr-sm-2"
                  value={searchTerm}
                  onChange={handleChange}
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showNewClientModal} onHide={handleCloseNewClientModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SearchBar;
