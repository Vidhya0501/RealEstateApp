import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import MyProperties from "./components/MyProperties";
import AddProperty from "./components/AddProperty";
import { AuthContext } from "./context/AuthContext";
import Topbar from "./components/Topbar";
import EditProperty from "./components/EditProperty";

import MyProfile from "./components/MyProfile";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div>
        {isAuthenticated && <Topbar />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-properties"
            element={
              isAuthenticated ? <MyProperties /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-property"
            element={
              isAuthenticated ? <AddProperty /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/edit-property/:id"
            element={
              isAuthenticated ? <EditProperty /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
