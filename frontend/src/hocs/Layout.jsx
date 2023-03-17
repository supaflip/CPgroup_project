import React, { useEffect } from "react";
import { connect } from "react-redux";
import AppNav from "../components/AppNav";


const Layout = (props) => {
  
  return(
    <div>
      <AppNav loggedin={props.loggedin}/>
      {console.log("loggedin: ", props.loggedin)}
      {props.children}

    </div>
);
}
export default Layout;