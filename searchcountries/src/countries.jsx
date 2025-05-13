import  { useEffect, useState } from "react";
import "./Countries.css";

const API = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
  country.common && country.common.toLowerCase().includes(searchText.toLowerCase())
);

  

  return (
    <><div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: "80%",
          maxWidth: "600px",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
        }} />
    </div><div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px"
    }}>
        {filteredCountries.map((country) => (
          <div key={country.common} className="countryCard">
            <img
              src={country.png}
              alt={`Flag of ${country.common}`} />
            <h2>{country.common}</h2>
          </div>
        ))}
      </div></>
  );
}

export default Countries;
