import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <strong>
      Total of {parts.reduce((m, n) => m + n.exercises, 0)} exercises
    </strong>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
