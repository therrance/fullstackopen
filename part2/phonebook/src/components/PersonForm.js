import React from "react";

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

export default PersonForm;
