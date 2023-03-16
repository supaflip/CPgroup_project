import CreateProfileForm from "../components/CreateProfileForm";
import React from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

function CreateProfilePage(props) {
  console.log(props.username);

  return (
    <div>
      <br></br>
      <h2>Bar Path Program</h2>
      <hr />
      <br></br>
      <ProfileForm />
    </div>
  );
}

export default CreateProfilePage;




// import CreateProfileForm from "../components/CreateProfileForm";
// import React from "react";

// function CreateProfilePage() {
//   return (
//     <div>
//       <br></br>
//       <h2>Bar Path Program</h2>
//       <hr />
//       <br></br>
//       <CreateProfileForm />
//     </div>
//   );
// }

// export default CreateProfilePage;
