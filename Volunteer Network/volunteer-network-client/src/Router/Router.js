import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "../Admin/AdminRoute";
import AddEvent from "../Components/AddEvent/AddEvent";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import MakeAdmin from "../Components/MakeAdmin/MakeAdmin";
import ManageEvents from "../Components/ManageEvents/ManageEvents";
import NotFound from "../Components/NotFound/NotFound";
import RegisteredEvents from "../Components/RegisteredEvents/RegisteredEvents";
import Registration from "../Components/Registration/Registration";
import NavigationBar from "../Components/Shared/NavigationBar/NavigationBar";
import Signup from "../Components/Signup/Signup";
import UserEvents from "../Components/UserEvents/UserEvents";
import Forbidden from "../Forbidden/Forbidden";
import PrivateRoute from "../private/PrivateRoute";
const AppRouter = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/register/:eventId"
          element={
            <PrivateRoute>
              <Registration />
            </PrivateRoute>
          }
        />
        <Route
          path="/registeredEvents/myEvents"
          element={
            <PrivateRoute>
              <UserEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/manageAllEvent"
          element={
            <AdminRoute>
              <ManageEvents />
            </AdminRoute>
          }
        />
        <Route
          path="/addEvent"
          element={
            <AdminRoute>
              <AddEvent />
            </AdminRoute>
          }
        />
        <Route
          path="/allRegisteredEvent"
          element={
            <AdminRoute>
              <RegisteredEvents />
            </AdminRoute>
          }
        />
        <Route
          path="/makeAdmin"
          element={
            <AdminRoute>
              <MakeAdmin />
            </AdminRoute>
          }
        />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
