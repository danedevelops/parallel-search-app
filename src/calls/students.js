import axios from "axios";

export const getAllStudents = async () => {
  try {
    const { data } = await axios.get(
      "https://api.hatchways.io/assessment/students"
    );
    const studentList = data.students;
    studentList.forEach((student) => {
      student.tags = [""];
      student.name = `${student.firstName} ${student.lastName}`.toLowerCase();
    });
    console.log(studentList);
    return studentList;
  } catch (err) {
    console.log(err);
  }
};
