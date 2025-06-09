import React, { useState } from "react";

const XDictionary = () => {
  const [dictionary] = useState([
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    const found = dictionary.find(
      (entry) => entry.word.toLowerCase() === term
    );

    if (found) {
      setDefinition(found.meaning);
    } else {
      setDefinition("Word not found in the dictionary.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h1><strong>Dictionary App</strong></h1>

      {/* ✅ Input for search */}
      <input
        type="text"
        value={searchTerm}
        placeholder="Search for a word..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "6px", fontSize: "16px" }}
      />

      {/* ✅ Search button */}
      <button
        onClick={handleSearch}
        style={{ marginLeft: "5px", padding: "6px 12px", fontSize: "16px" }}
      >
        Search
      </button>

      {/* ✅ Output section always rendered */}
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <h3>Definition:</h3>
        <p>{definition}</p>
      </div>
    </div>
  );
};

export default XDictionary;
