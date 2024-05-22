import { Route } from "react-router-dom";
import Admin from "../components/Admin";
import AdminDetail from "../components/AdminDetail";
import Contact from "../components/Contact";
import Home from "../components/Home";
import Login from "../components/Login";


const routes = [
  { path: "/", element: <Home /> },
  { path: "/contact/:id", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <Admin /> },
  { path: "/admin/:id", element: <AdminDetail /> }
];

const RouteComponents = routes.map( ({path,element})  => (
  <Route key={path} path={path} element={element} />
));

export default RouteComponents;