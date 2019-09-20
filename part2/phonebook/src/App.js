import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filterValue, handleFilter }) => (
  <div>
    filter shown with: <input onChange={handleFilter} value={filterValue} />
  </div>
);

const PersonForm = ({ setNewPerson, addPerson, newPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          onChange={event =>
            setNewPerson({ ...newPerson, name: event.target.value })
          }
          value={newPerson.name}
        />
        <br />
        phone:{" "}
        <input
          onChange={event =>
            setNewPerson({ ...newPerson, number: event.target.value })
          }
          value={newPerson.number}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) =>
  persons.map(person => (
    <p key={person.name}>
      {person.name} : {person.number}
    </p>
  ));

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const personsToShow = filter.length
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const addPerson = event => {
    event.preventDefault();

    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(
        persons.concat({
          name: newPerson.name,
          number: newPerson.number,
          id: persons[persons.length - 1].id + 1
        })
      );
      setNewPerson({ name: "", number: "" });
    }
  };

  const handleFilter = event => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        setNewPerson={setNewPerson}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;