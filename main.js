import Student from "./models.js";
import { fetchStudents } from "./database.js";
import { calculateClassAverage, findTopStudent, filterStudents } from "./analytics.js";

console.log("Fetching data from database...");

fetchStudents((rawData) => {
  console.log("Data received!\n");

  const students = rawData.map((s) => new Student(s.id, s.name, s.courses));

  console.log("Testing Immutability:");
  console.log(`Original ID: ${students[0].id}`);
  console.log("Attempting to change ID to 999...");
  try {
    students[0].id = 999;
  } catch (err) {
    // ES modules run in strict mode, so writing to a read-only property throws.
  }
  const unchanged = students[0].id === 1;
  console.log(`Final ID: ${students[0].id} (${unchanged ? "Success: ID did not change" : "Failure: ID changed"})\n`);

  console.log("--- Analytics Report ---");
  console.log(`Class Average for Course 101: ${calculateClassAverage(students, 101).toFixed(2)}`);

  const top = findTopStudent(students);
  console.log(`Top Student: ${top.name} (Average: ${top.getAverage()})`);

  const inCourse102 = filterStudents(students, (s) => s.courses.some((c) => c.courseId === 102));
  console.log(`Students in Course 102: ${inCourse102.map((s) => s.name).join(", ")}`);
});
