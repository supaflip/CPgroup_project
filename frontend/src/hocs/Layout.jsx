import React, { useEffect } from "react";
import { connect } from "react-redux";
import AppNav from "../components/AppNav";


const Layout = (props) => {

  return (
    <div>
      <AppNav USER_AUTH={props.USER_AUTH} setUserAuth={props.setUserAuth}/>
      {props.children}
    </div>
  );
}
export default Layout;