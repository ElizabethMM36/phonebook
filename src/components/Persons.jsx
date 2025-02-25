const Persons = ({ nameFilter, numberFilter, allPersons, handleRemove }) => {
  const filteredPersons = () => {
    return allPersons.filter((person) =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase().trim()) &&
      person.number.includes(numberFilter.trim())
    );
  };

  const persons = filteredPersons();

  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleRemove(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;