import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Noti";
import numService from "./services/num"; // ✅ Importing num.js for API calls

const App = () => {
  const [allPersons, setAllPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [notification, setNotification] = useState(null);

  // ✅ Fetch persons from the backend when the component mounts
  useEffect(() => {
    numService
      .getAll()
      .then((response) => {
        setAllPersons(response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching persons:", error.message);
        setNotification({ type: "error", text: "Failed to load contacts" });
      });
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = allPersons.find(
      (person) => person.name === newPerson.name.trim()
    );

    if (!existingPerson) {
      numService
        .create(newPerson)
        .then((response) => {
          setAllPersons((prev) => [...prev, response.data]);
          setNotification({ type: "success", text: `${newPerson.name} added successfully` });
          setNewPerson({ name: "", number: "" });
        })
        .catch((error) => {
          console.error("❌ Error adding person:", error.message);
          setNotification({ type: "error", text: "Failed to add person" });
        });
    } else {
      if (window.confirm(`${newPerson.name} already exists. Update number?`)) {
        numService
          .update(existingPerson.id, { ...existingPerson, number: newPerson.number })
          .then((response) => {
            setAllPersons((prev) =>
              prev.map((person) => (person.id !== existingPerson.id ? person : response.data))
            );
            setNotification({ type: "success", text: `${newPerson.name} updated successfully` });
            setNewPerson({ name: "", number: "" });
          })
          .catch((error) => {
            console.error("❌ Error updating person:", error.message);
            setNotification({ type: "error", text: "Failed to update person" });
          });
      }
    }
  };

  const handleFormChange = ({ target: { name, value } }) => {
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameFilterChange = (event) => setNameFilter(event.target.value);
  const handleNumberFilterChange = (event) => setNumberFilter(event.target.value);

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      numService
        .remove(id)
        .then(() => {
          setAllPersons((prev) => prev.filter((person) => person.id !== id));
          setNotification({ type: "success", text: `${name} deleted successfully` });
        })
        .catch((error) => {
          console.error("❌ Error deleting person:", error.message);
          setNotification({ type: "error", text: "Failed to delete person" });
        });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        nameFilter={nameFilter}
        numberFilter={numberFilter}
        handleNameFilterChange={handleNameFilterChange}
        handleNumberFilterChange={handleNumberFilterChange}
      />
      <h3>Add a New Contact</h3>
      <PersonForm
        newPerson={newPerson}
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
      />
      <h3>Numbers</h3>
      <Persons
        nameFilter={nameFilter}
        numberFilter={numberFilter}
        allPersons={allPersons}
        handleRemove={handleRemove}
      />
    </>
  );
};

export default App;
