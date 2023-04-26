const Filter = () => {
    
      return (
        <section className="filter">
          <form className="form-control">
    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search for a country..."
      className={`form-control`}
      
    />
    <i className="far fa-search" style={{color: 'red'}}></i>
  </form>
          <div className="region-filter">
            <select
              name="region"
              id="region"
              className={`select`}
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