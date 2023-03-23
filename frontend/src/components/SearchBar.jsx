import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("searchTerm", searchTerm); // delete when done testing
    onSearch(searchTerm);
  };

  return (
    <Form inline="true" onSubmit={handleSubmit}>
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
    </Form>
  );
}

export default SearchBar;