import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";


interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: {
    svg: string;
  };
  tld: string[];
  currencies: {
    [code: string]: {
      name: string;
    };
  };
  languages: {
    [code: string]: string;
  };
  borders: string[];
}

const Country = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const { name } = useParams();
  

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const data = await response.json();
        console.log(data); // Log the full response to see the data fields

        // Check if the response contains an error message
        if (data.status === 404) {
          throw new Error(data.message);
        }

        setCountry(data[0]); // Set the first country in the response array
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountryData();
  }, [name]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className={``}>
      <section className={`country`}>
        <Link to="/" className={`btn btn-`}>
          <i className="fas fa-arrow-left"></i>
          <span className="back">Back</span>
        </Link>
        <article className="article">
          <div className="country-inner">
            <div className="flag">
              <img src={country.flags?.svg} alt={country.name?.common} />
            </div>
            <div className="country-details">
              <div>
                <h2>{country.name?.common}</h2>
                <h5>
                  Native Name: <span>{country.name?.common}</span>
                </h5>
                <h5>
                  Population: <span>{country.population?.toLocaleString()}</span>
                </h5>
                <h5>
                  Region: <span>{country.region}</span>
                </h5>
                <h5>
                  Subregion: <span>{country.subregion}</span>
                </h5>
                <h5>
                  Capital: <span>{country.capital?.[0]}</span>
                </h5>
              </div>
              <div>
                <h5>
                  Top Level Domain: <span>{country.tld?.[0]}</span>
                </h5>
                <h5>
                  Currencies:{" "}
                  <span>
                    {country.currencies &&
                      Object.values(country.currencies)
                        .map((currency) => currency.name)
                        .join(", ")}
                  </span>
                </h5>
                <h5>
                  Languages:{" "}
                  <span>
                    {country.languages &&
                      Object.values(country.languages)
                        .map((language) => language)
                        .join(", ")}
                  </span>
                </h5>
              </div>
            </div>
          </div>
          <div className={`border-country`}>
            {country.borders && country.borders.length > 0 && (
              <>
                <h3>Border Countries:</h3>
                <div className="borders">
                  <ul>
                    {country.borders.map((border) => (
                      <li key={border} className={`border-countries`}>
                        <Link to={`/countries/${border}`} style={{ textDecoration: 'none', color: "inherit" }}>{border}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                </>
              )} 
          </div>
        </article>
      </section>
    </div>
  )
}

export default Country
