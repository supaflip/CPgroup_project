import React from 'react';

function SignUpErrorUI(props) {
  return (
    <div className="backdrop">
    <div className="popup-overlay">
      <h5>A User With This Username Already Exist</h5>
      <button className="btn" onClick={props.onClose}>Okay</button>
    </div>
    </div>
  );
}

export default SignUpErrorUI;
