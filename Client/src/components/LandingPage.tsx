// src/components/LandingPage.jsx
import { Link } from "react-router-dom";
import "../styles/styles.css";
import Hero from "./Hero";

export function LandingPage() {
  return (
    <>
      <div className="landing">
        <Hero
          title="Creative Computing Institute"
          subtitle="Working at the intersection of creativity and computational technologies—explore our undergraduate, postgraduate and research programmes."
          buttonText="Explore Courses"
          buttonLink="#courses"
          backgroundImage="https://ual-media-res.cloudinary.com/image/fetch/c_fill,f_auto,fl_lossy,g_auto,q_auto,g_auto/w_1280/https://www.arts.ac.uk/__data/assets/image/0032/365288/BSC-Computer-Science-hires.jpg"
        />

        <section id="about" className="landing__about">
          <h3>About CCI</h3>
          <p>
            We are part of how UAL explores the technology shaping our world and
            prepares a new generation of talent to shape it. Explore computer
            science and creative practice through innovative courses, knowledge
            exchange and research opportunities.
          </p>
        </section>

        <section id="courses" className="landing__courses">
          <Link to="/courses" className="landing__title">
            <h3>Our Courses</h3>
          </Link>
          <div className="courses__grid">
            <div className="course-card">
              <h3>Undergraduate Courses</h3>
              <p>Learn to code, build apps & craft digital experiences.</p>
            </div>
            <div className="course-card">
              <h3>Postgraduate courses</h3>
              <p>Build robots and explore their creative applications.</p>
            </div>
            <div className="course-card">
              <h3>Short Courses</h3>
              <p>
                Gain practical skills in data science and machine intelligence.
              </p>
            </div>
            <div className="course-card">
              <h3>Online Courses</h3>
              <p>
                Gain practical skills in data science and machine intelligence.
              </p>
            </div>
            <div className="course-card">
              <h3>Pre-degree</h3>
              <p>
                Gain practical skills in data science and machine intelligence.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
