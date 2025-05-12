import React, { useState } from "react";

function FullNameForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFullName(`${firstName} ${lastName}`);
  };

  return (
    <div>
      <h1><b>Full Name Display</b></h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {fullName && (
        <p><strong>Full Name:</strong> {fullName}</p>
      )}
    </div>
  );
}

export default FullNameForm;
