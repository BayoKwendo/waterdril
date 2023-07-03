import React from 'react';
import * as JWT from 'jwt-decode';

import { withRouter } from "react-router-dom";

const AuthVerifyComponent = ({ history }) => {
  history.listen(() => {  // <--- Here you subscribe to the route change
    if (localStorage.getItem("token")) {
      const jwt_Token_decoded = JWT(localStorage.getItem("token"));
      console.log("DDDD", "djd");
      alert(jwt_Token_decoded)
      console.log(Date.now());
      //   if (jwt_Token_decoded.exp * 1000 < Date.now()) {
      //     localStorage.removeItem('token');
      // } else {
      //     initialstate.user = jwt_Token_decoded;
      //   }
    }
  });
  return <div></div>;
};

export default withRouter(AuthVerifyComponent);