import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/public/Home";
import Properties from "../pages/public/Properties";
import PropertyDetails from "../pages/public/PropertyDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// User Pages
import Dashboard from "../pages/user/Dashboard";
import MyProperties from "../pages/user/MyProperties";
import AddProperty from "../pages/user/AddProperty";
import Profile from "../pages/user/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProperties from "../pages/admin/AdminProperties";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminEnquiries from "../pages/admin/AdminEnquiries";

// Guards
import ProtectedRoute from "../guards/ProtectedRoute";
import AdminRoute from "../guards/AdminRoute";

// Layouts
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/my-properties"
          element={
            <ProtectedRoute>
              <MyProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/properties"
          element={
            <AdminRoute>
              <AdminProperties />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/enquiries"
          element={
            <AdminRoute>
              <AdminEnquiries />
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container">
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
