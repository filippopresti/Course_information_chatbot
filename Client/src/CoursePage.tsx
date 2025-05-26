// src/components/CoursePage.tsx
import { useParams, Navigate } from "react-router-dom";
import courses from "../data/courses.json"; // adjust path
import { Hero } from "./components/Hero";
export function CoursePage() {
  // Ensure the courses data is imported correctly
  const { slug } = useParams<{ slug: string }>();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <div className="landing">
        <Hero
          title={course.title}
          subtitle="Because the world needs more creativity in tech"
          buttonText="Apply Now"
          buttonLink="#apply"
          backgroundImage="https://ual-media-res.cloudinary.com/image/fetch/c_fill,f_auto,g_auto,q_auto,w_600/https://www.arts.ac.uk/__data/assets/image/0018/71703/CCI-Events-Digital-Space.jpg"
        />
      </div>
      <div className="course-page">
        <h1>{course.title}</h1>
        <p className="course-level">{course.level}</p>
        <section>
          <h3>Overview</h3>
          <p>{course.description}</p>
        </section>
        <section>
          <h3>Entry requirements</h3>
          <ul>
            {course.entryRequirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Duration</h3>
          <p>{course.duration}</p>
        </section>
        <a id="apply" href={course.applyLink} className="btn">
          Apply now
        </a>
      </div>
    </>
  );
}

export default CoursePage;
