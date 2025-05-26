// import { Routes, Route, Link } from "react-router-dom";
// import LandingPage from "./components/LandingPage"; // your existing landing page
// import LocationsPage from "./LocationsPage"; // the one we just built
// import { ChatWidget } from "./ChatWidget";
// import { Navbar } from "./components/Navbar";

// function App() {
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
//   return (
//     <div className="App">
//       <LandingPage />
//       <div className="right_bottom_corner">
//         <ChatWidget apiUrl={apiUrl} />
//       </div>
//     </div>
//   );
// }

// export default App;
// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LocationsPage from "./LocationsPage";
import Navbar from "./components/Navbar";
import CoursesList from "./CoursesList.tsx";
import CoursePage from "./CoursePage";
import { ChatWidget } from "./ChatWidget";
import { Footer } from "./components/Footer";

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
