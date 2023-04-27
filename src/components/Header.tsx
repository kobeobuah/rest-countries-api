import { useContext } from "react";
import { ThemeContext } from "../App";

interface Props {
    toggleTheme: () => void;
  }

  const Header: React.FC<Props> = ({ toggleTheme }: Props) => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme;
    return (
      <>
          <header className={`header ${theme}`}>
              <div>
                  <h1>Where in the world?</h1>
              </div>
  
              <div className='moon-dark-mode'>
                  <i className="fas fa-moon" onClick={() => toggleTheme()}> Dark Mode</i>
              </div>
          </header>
      </>
    )
  }
  
  export default Header