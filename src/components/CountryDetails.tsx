import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import "../countryDetails.css";


interface CountryDetail {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: {
    svg: string;
  };
  topLevelDomain: string[];
  currencies: {
    [code: string]: {
      name: string;
    };
  };
  languages: {
    [code: string]: {
      name: string;
    }
  };
  borders: string[];
}

const CountryDetails = () => {
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [borderCountries, setBorderCountry] = useState<string[]>([])
  const { name } = useParams();
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme;

  useEffect(() => {
    const fetchCountryData = async (name: string) => {
      try {
        const url = `https://restcountries.com/v2/name/${name}`;
        const response = await fetch(url);
        const data = await response.json();
        setCountry(data[0]);
        const borderData = await Promise.all(
          data[0]?.borders?.map((border: string) => findCountryData(border))
        );
        setBorderCountry(borderData);
      } catch (error) {
        console.log(error);
      }
    };
    const findCountryData = async (border: string) => {
      try {
        const url = `https://restcountries.com/v2/alpha/${border}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.name;
      } catch (error) {
        console.log(error);
      }
    };
    if (name) {
      fetchCountryData(name);
    }
    
  }, [name]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${theme}`}>
      <section className={`country`}>
      <Link to="/" className={`btn btn-${theme}`}>
          <i className="fas fa-arrow-left"></i>
          <span className="back">Back</span>
        </Link>
        <article className="article">
          <div className="country-inner">
          <div className="flag">
            <img src={country.flags?.svg} alt={country.name} />
          </div>


          <div className="country-details-container">
          <div className="country-details">
            <div>
              <h2>{country.name}</h2>
              <h5>
                Native Name: <span>{country.nativeName}</span>
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
                Capital: <span>{country.capital}</span>
              </h5>
            </div>
            <div>
              <h5>
                Top Level Domain: <span>{country.topLevelDomain?.[0]}</span>
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
                        .map((language) => language.name)
                        .join(", ")}
                  </span>
                </h5>
            </div>
          </div>
          
          <div className={`border-country ${theme}`}>
          {borderCountries && borderCountries.length > 0 && (
            <>
            <h3>Border Countries:</h3>
                <div className="borders">
                  <ul>
                    {borderCountries.map((border) => (
                      <li key={border} className={`border-countries ${theme}`}>
                        <Link to={`/countries/${border}`} style={{ textDecoration: 'none', color: "inherit" }}>{border}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                </>
              )} 
          </div>
          </div>
          </div>
        </article>
      </section>
    </div>
  )
}

export default CountryDetails
