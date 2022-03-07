//Imported Libraries
import React, { useState } from "react";

//Imported Functions
import { getAverage } from "../utilities/average";

//Functional Component
const StudentCard = ({ student, createTag }) => {
  //Hook to set up and update student tags
  const [newTag, setNewTag] = useState("");
  //Hook to toggle whether expanded grades list is showing
  const [gradesToggle, setGradesToggle] = useState(false);

  //Function to store tag that calls createTag function passed down through props
  function storeTag() {
    createTag(student, newTag);
  }

  return (
    <div className="student__card">
      <div className="student__container--image">
        <img
          className="student__avatar"
          src={student.pic}
          alt="student avatar"
        />
      </div>
      <div className="student__container--info">
        <h1 className="student__name">
          {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
        </h1>
        <div className="student__details">
          <p>Email: {student.email} </p>
          <p>Company: {student.company}</p>
          <p>Skill: {student.skill}</p>
          <p>Average: {getAverage(student.grades)}%</p>
          <div className="student__grades">
            {gradesToggle &&
              student.grades.map((grade, index) => {
                return (
                  <div
                    className="student__grades--container"
                    key={grade + " " + index}
                  >
                    <div className="student__test">Test {index + 1}:</div>
                    <div className="student__grade">{grade}%</div>
                  </div>
                );
              })}
          </div>
          {student.tags.map((tag) => {
            if (tag === "") return false;
            else
              return (
                <div className="student__tag" key={student.id + " " + tag}>
                  {tag}
                </div>
              );
          })}
          <div>
            <input
              className="student__input"
              onChange={(event) => {
                setNewTag(event.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  storeTag();
                  event.target.value = "";
                }
              }}
              type="text"
              placeholder="Add a tag"
            />
          </div>
        </div>
      </div>
      <div className="student__container--button">
        <button
          className="student__button"
          onClick={() => {
            setGradesToggle(!gradesToggle);
          }}
        >
          {gradesToggle ? "-" : "+"}
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
