import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "111-1111", id: 1 }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addPerson = event => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          phone: newPhone,
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
      {persons.map(person => (
        <p key={person.id}>
          {person.name} : {person.phone}
        </p>
      ))}
    </div>
  );
};

export default App;
