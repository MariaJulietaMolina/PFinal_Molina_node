import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import menu from "../assets/hamburguesa 1.png";
import Login from "./Login";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const { busqueda, setBusqueda, buscarProductos } =
    useContext(ProductsContext);

  const cerrarModal = () => {
    const modalEl = document.getElementById("loginModal");
    let modalInstance = window.bootstrap.Modal.getInstance(modalEl);
    if (!modalInstance) {
      modalInstance = new window.bootstrap.Modal(modalEl);
    }
    modalInstance.hide();
    document.querySelector(".modal-backdrop")?.remove();
    document.body.classList.remove("modal-open");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarProductos();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark  px-3">

          <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span  ><img
            src={menu}
            alt="Logo"
            height="40"
            style={{ cursor: "pointer" }}
          /></span>
        </button>

        <button
          className="navbar-brand me-3 btn btn-link p-0 border-0"
          onClick={() => window.location.reload()}
        >
          <Link to="/">
          <img
            src={logo}
            alt="Logo"
            height="60"
            style={{ cursor: "pointer" }}
          />
          </Link>
        </button>

      

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav w-100 align-items-lg-center flex-lg-row flex-column">
            <li className="nav-item w-100 w-lg-50 mx-lg-auto my-2 my-lg-0">
              <form
                className="d-flex w-100"
                role="search"
                onSubmit={handleSubmit}
              >
                <input
                  className="form-control me-2 me-lg-5"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Buscar"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="btn btn-outline-light" type="submit">
                  Buscar
                </button>
              </form>
            </li>

            <li className="nav-item dropdown my-2 my-lg-0 ms-lg-3">
              <button
                className="btn btn-secondary dropdown-toggle w-100"
                data-bs-toggle="dropdown"
              >
                Categorías
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Novedades
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Auriculares
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Parlantes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Higiene personal
                  </a>
                </li>
              </ul>
            </li>

            {user ? (
              <>
                <li className="nav-item my-2 my-lg-0 ms-lg-3">
                  <Link to="/admin" className="btn btn-outline-info w-100">
                    Admin
                  </Link>
                </li>
                <li className="nav-item my-2 my-lg-0 ms-lg-3">
                  <Link to="/cart" className="btn btn-outline-warning w-100">
                    Carrito
                  </Link>
                </li>
                <li className="nav-item my-2 my-lg-0 ms-lg-3">
                  <button
                    className="btn btn-outline-danger w-100 d-flex justify-content-center align-items-center"
                    onClick={logout}
                  >
                    <span style={{ whiteSpace: "pre" }}>Cerrar sesión</span>
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item my-2 my-lg-0 ms-lg-3">
                <button
                  className="btn btn-outline-success w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Iniciar sesión</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <Login onClose={cerrarModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
