import React from "react";

const Persons = ({ persons, handleDelete }) =>
  persons.map(person => (
    <p key={person.name}>
      {person.name} : {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
  ));

export default Persons;
