// ingestCourses.js

import "dotenv/config";
import { addCoursesToVectorStore } from "./embeddings.js";

(async () => {
  try {
    console.log("Starting course ingestion…");
    await addCoursesToVectorStore();
    console.log("Course ingestion complete.");
    process.exit(0);
  } catch (err) {
    console.error("Ingestion failed:", err);
    process.exit(1);
  }
})();
