// src/components/CourseCard.tsx
import { Link } from "react-router-dom";

export function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.slug}`} className="course-card">
      <h3>{course.title}</h3>
      <p>{course.level}</p>
    </Link>
  );
}
export default CourseCard;
