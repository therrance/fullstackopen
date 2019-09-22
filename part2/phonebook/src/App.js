import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

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

    const newPersonObject = {
      name: newPerson.name,
      number: newPerson.number
    };

    const existedPerson = persons.find(
      person => person.name === newPerson.name
    );

    if (existedPerson) {
      if (
        window.confirm(
          `${existedPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        newPersonObject.id = existedPerson.id;

        phonebookService
          .updateEntry(existedPerson.id, newPersonObject)
          .then(data => {
            setNotification(`Added ${newPerson.name}`);
            setTimeout(() => setNotification(null), 5000);
            setPersons(
              persons
                .filter(person => person.id !== existedPerson.id)
                .concat(data)
            );
            setNewPerson({ name: "", number: "" });
          });
      }
    } else {
      newPersonObject.id = persons[persons.length - 1].id + 1;

      phonebookService.create(newPersonObject).then(data => {
        setNotification(`Added ${newPerson.name}`);
        setTimeout(() => setNotification(null), 5000);
        setPersons(persons.concat(data));
        setNewPerson({ name: "", number: "" });
      });
    }
  };

  const handleFilter = event => setFilter(event.target.value);

  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      phonebookService
        .deleteEntry(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

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
