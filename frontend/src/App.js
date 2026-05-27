import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import MyReservations from "./pages/MyReservations";
import RoomDetails from "./pages/RoomDetails";
import Requests from "./pages/Requests";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<RoomDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
