import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";

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

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCountryData = async () => {
    try {
      const response = await fetch(url);
      const countries: Country[] = await response.json();
      setCountries(countries.slice(0, 20));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <Filter setCountries={setCountries} countries={countries} /> */}
      <section className="grid">
        {countries.map((country: Country) => {
          const { population, region, capital, flags, name } = country;
          const countryName = name.common;

          return (
            <Link
              to={`/countries/${name.common}`}
              style={{ color: "inherit", textDecoration: "none" }}
              key={population}
            >
              <article>
                <div>
                  <img src={flags.svg} alt={countryName} />
                  <div className={`details`}>
                    <h3>{countryName}</h3>
                    <h4>
                      Population: <span>{population}</span>
                    </h4>
                    <h4>
                      Region: <span>{region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{capital}</span>
                    </h4>
                    <div className="buttons"></div>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default Countries;
