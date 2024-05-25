// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = useSelector((state) => state.isAuthenticated);
  
//     return isAuthenticated ? (
//       <Route {...rest} element={<Component {...rest} />} />
//     ) : (
//       <Navigate to="/login" />
//     );
// };

// export default PrivateRoute;