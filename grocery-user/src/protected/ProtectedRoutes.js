import { React, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

function ProtectedRoutes({ component: Component, ...rest }) {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}

export default ProtectedRoutes;
