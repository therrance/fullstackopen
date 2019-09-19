import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const personsToShow = filter.length
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  console.log("filter: ", filter.length);
  console.log("personsToShow: ", personsToShow);

  const addPerson = event => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newPhone,
          id: persons[persons.length - 1].id + 1
        })
      );
      setNewName("");
      setNewPhone("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input
          onChange={event => setFilter(event.target.value)}
          value={filter}
        />
      </div>{" "}
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            onChange={event => setNewName(event.target.value)}
            value={newName}
          />
          <br />
          phone:{" "}
          <input
            onChange={event => setNewPhone(event.target.value)}
            value={newPhone}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <p key={person.name}>
          {person.name} : {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
