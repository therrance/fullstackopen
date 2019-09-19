import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={event => {
          event.preventDefault();

          setPersons(
            persons.concat({
              name: newName,
              id: persons[persons.length - 1].id + 1
            })
          );
          setNewName("");
        }}
      >
        <div>
          name:{" "}
          <input
            onChange={event => setNewName(event.target.value)}
            value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
