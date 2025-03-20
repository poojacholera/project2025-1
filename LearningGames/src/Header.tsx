import { NavLink} from "react-router";

function Header() {
  return (
    <nav className="header-nav-card">
      {/* NavLink makes it easy to show active states */}
      <NavLink
        to="/"
        className="header-navlink"
        end
      >
        Home
      </NavLink> 
      <NavLink to="/Games" className="header-navlink" end>
        Games
        
      </NavLink>
      <NavLink to="/Twister" className="header-navlink" end>
        Twister
      </NavLink>
    </nav>
  );
}export default Header;
  