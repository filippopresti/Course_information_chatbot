import courses from "../data/courses.json";
import { CourseCard } from "./components/CourseCard";
import { Hero } from "./components/Hero";
import "./styles/styles.css";

export function CoursesList() {
  return (
    <>
      <div className="landing">
        <Hero
          title="Our Courses"
          subtitle="Working at the intersection of creativity and computational technologies — explore our undergraduate, postgraduate and research programmes."
          buttonText="Explore Courses"
          buttonLink="#courses"
          backgroundImage="https://ual-media-res.cloudinary.com/image/fetch/c_fill,f_auto,fl_lossy,g_auto,q_auto,g_auto/w_1280/https://www.arts.ac.uk/__data/assets/image/0038/283979/39752.1.1-UAL_CAMB_CCI_Launch_PV_0101-b-v2.jpeg"
        />
      </div>
      <section className="courses-list">
        <h1>All Courses</h1>
        <div className="courses-grid">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>
    </>
  );
}
export default CoursesList;
