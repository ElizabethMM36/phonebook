import { useState } from "react";

const PersonForm = ({ newPerson, handleSubmit, handleFormChange }) => {
  const [errors, setErrors] = useState({ name: "", number: "" });

  const validate = (name, number) => {
    const newErrors = { name: "", number: "" };

    if (!name || name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!number || number.trim().length < 8) {
      newErrors.number = "Number must be at least 8 digits long.";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.number;
  };

  const handleLocalSubmit = (event) => {
    event.preventDefault();
    const isValid = validate(newPerson.name, newPerson.number);

    if (isValid) {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleLocalSubmit}>
      <div>
        <label>
          name:{" "}
          <input
            value={newPerson.name}
            onChange={handleFormChange}
            name="name"
            required
          />
        </label>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>
          number:{" "}
          <input
            value={newPerson.number}
            onChange={handleFormChange}
            name="number"
            required
          />
        </label>
        {errors.number && <p style={{ color: "red" }}>{errors.number}</p>}
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
