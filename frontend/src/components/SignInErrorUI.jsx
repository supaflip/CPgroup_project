import React from 'react';

function SignInErrorUI(props) {
  return (
    <div className="backdrop">
    <div className="popup-overlay">
      <h5>Invalid Credentials</h5>
      <button className="btn" onClick={props.onClose}>Okay</button>
    </div>
    </div>
  );
}

export default SignInErrorUI;