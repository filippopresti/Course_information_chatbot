// import "../styles/LandingPage.css";
// export function Navbar() {
//   return (
//     <header className="landing__header">
//       <a href="#">
//         <h1 className="landing__title">ual:</h1>
//       </a>
//       <nav className="landing__nav">
//         <a href="#about">About</a>
//         <a href="#courses">Courses</a>
//         <a href="#research">Locations</a>
//       </nav>
//     </header>
//   );
// }

// export default Navbar;
// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import "../styles/styles.css";

export function Navbar() {
  return (
    <header className="landing__header">
      <Link to="/" className="landing__title">
        <h1>ual:</h1>
      </Link>
      <nav className="landing__nav">
        <Link to="/#about">About</Link>
        <Link to="/courses">Courses</Link>
        {/* change this: */}
        <Link to="/locations">Locations</Link>
      </nav>
    </header>
  );
}

export default Navbar;
