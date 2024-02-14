
import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({isAdmin,children}) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    if(isAdmin===true && user.role!=="admin" ){
    return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;


// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Route,useLocation } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//  let location = useLocation();
//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate to="/login" state={{ from: location}} replace/>;
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               return <Navigate to="/login" state={{ from: location}} replace/>;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;