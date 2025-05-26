import { Link } from "react-router-dom";

interface Course {
  title: string;
  slug: string;
  level: string;
  // description?: string;
  // duration?: string;
  // entryRequirements?: string[];
  // applyLink?: string;
}

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.slug}`} className="course-card">
      <h3>{course.title}</h3>
      <p className="course-level">{course.level}</p>
    </Link>
  );
}

export default CourseCard;
