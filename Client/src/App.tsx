// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.tsx";
import LocationsPage from "./LocationsPage.tsx";
import Navbar from "./components/Navbar.tsx";
import CoursesList from "./CoursesList.tsx";
import CoursePage from "./CoursePage.tsx";
import { ChatWidget } from "./components/ChatWidget.tsx";
import { Footer } from "./components/Footer.tsx";

export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/courses/:slug" element={<CoursePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      <ChatWidget apiUrl={apiUrl} />

      <Footer />
    </>
  );
}
