import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then(phones => setPersons(phones));
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
      const newPersonObject = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons[persons.length - 1].id + 1
      };

      phonebookService.create(newPersonObject).then(data => {
        setPersons(persons.concat(data));
        setNewPerson({ name: "", number: "" });
      });
    }
  };

  const handleFilter = event => setFilter(event.target.value);

  const handleDelete = id => {
    phonebookService
      .deleteEntry(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)));
  };

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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
