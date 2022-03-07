//Imported Libraries
import React, { useState, useEffect, useRef, useReducer } from "react";

//Imported Components
import StudentCard from "./StudentCard";
import Search from "./Search";

//Imported Functions
import { getAllStudents } from "../calls/students";

//Functional Component
const StudentsContainer = () => {
  //Hook to set and update list of students
  const [students, setStudents] = useState([]);
  //useReducer to initialize empty state for search terms on component mount
  const componentIsMounted = useRef(true);
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      tags: "",
    }
  );

  //useEffect() to make the API call on page load and set initial state
  useEffect(() => {
    getAllStudents()
      .then((response) => {
        if (componentIsMounted.current) {
          setStudents(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  //Function to update search terms in state
  const handleFilterStudents = (event) => {
    const { name, value } = event.target;
    setFilterInput({ [name]: value });
    console.log(filterInput);
  };

  //Function to filter students based on input
  const filterStudents = (list) => {
    return list.filter((item) => {
      return (
        item.name.toLowerCase().includes(filterInput.name.toLowerCase()) &&
        item.tags.includes(filterInput.tags)
      );
    });
  };
  const filteredStudents = filterStudents(students);

  //Function to add a tag to a student instance
  const createTag = (student, newTag) => {
    student.tags.push(newTag);

    const studentLocation = students.findIndex(
      (locatedStudent) => locatedStudent.id === student.id
    );
    let newStudentData = [
      ...students.slice(0, studentLocation),
      student,
      ...students.slice(studentLocation + 1),
    ];
    setStudents(newStudentData);
  };

  return (
    <>
      <div className="students__wrapper">
        <Search
          searchValue={filterInput}
          handleChangeValue={handleFilterStudents}
        />
        <div className="students__container">
          {filteredStudents.map((student) => {
            return (
              <StudentCard
                key={student.id}
                student={student}
                createTag={createTag}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StudentsContainer;
