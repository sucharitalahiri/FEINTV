import React, { useEffect, useState } from "react";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Countries List</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {countries.map((country) => (
          <div key={country.name} style={{ textAlign: "center" }}>
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              style={{ width: "100px", height: "auto", border: "1px solid #ccc" }}
            />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Countries;
