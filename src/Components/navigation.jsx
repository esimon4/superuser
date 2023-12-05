import { Link, NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg bg-light mb-2">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          SuperUser
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/account"
              className="nav-link"
              activeClassName="active"
            >
              Account
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
