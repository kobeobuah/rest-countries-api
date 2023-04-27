import { useContext } from "react";
import { ThemeContext } from "../App";

interface Country {
  population: number;
  region: string;
  capital: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
}

interface Props {
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  countries: Country[];
}

const Filter = ({ setCountries, countries }: Props) => {

  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim().toLowerCase();
    if (input) {
      const url = `https://restcountries.com/v3.1/name/${input}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
        })
        .catch((error) => {
          console.log(error);
          setCountries([]);
        });
    } else {
      setCountries(countries.slice(0, 10));
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const input = e.target.value.toLowerCase();
    const url = `https://restcountries.com/v3.1/region/${input}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log(error);
        setCountries([]);
      });
  };

  return (
    <section className="filter">
      <form className="form-control">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country..."
          className={`form-control ${theme}`}
          onChange={handleSearch}
        />
        <i className="far fa-search" style={{ color: "red" }}></i>
      </form>

      <div className="region-filter">
        <select
          name="region"
          id="region"
          className={`select ${theme}`}
          onChange={handleFilter}
        >
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
