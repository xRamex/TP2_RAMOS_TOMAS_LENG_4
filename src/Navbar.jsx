import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="badge">TP2</span>
        <h1 className="title">Lenguajes 4 — Trabajo Práctico 2</h1>
      </div>
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
          Inicio
        </NavLink>
        <NavLink to="/servicios" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Servicios
        </NavLink>
        <NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Contacto
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
