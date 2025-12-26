import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import logo from "../assets/logo.jpg";
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
      <nav className="navbar navbar-expand-lg navbar-dark px-3">
        {/* Botón menú mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src={menu} alt="Menú" height="40" />
        </button>

        {/* Logo */}
        <Link className="navbar-brand me-3" to="/">
          <img src={logo} alt="Logo" height="60" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav w-100 align-items-lg-center flex-lg-row flex-column">

            {/* Buscador */}
            <li className="nav-item w-100 mx-lg-auto my-2 my-lg-0">
              <form className="d-flex w-100" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="btn btn-outline-light" type="submit">
                  Buscar
                </button>
              </form>
            </li>

            {/* Usuario logueado */}
            {user ? (
              <>
                {user.role === "admin" && (
                  <li className="nav-item my-2 my-lg-0 ms-lg-3">
                    <Link to="/admin" className="btn btn-outline-warning w-100">
                      Admin
                    </Link>
                  </li>
                )}

                {user.role === "user" && (
                  <li className="nav-item my-2 my-lg-0 ms-lg-3">
                    <Link to="/perfil" className="btn btn-outline-success w-100">
                      Usuario
                    </Link>
                  </li>
                )}

                <li className="nav-item my-2 my-lg-0 ms-lg-3">
                  <Link to="/cart" className="btn btn-outline-info w-100">
                    Carrito
                  </Link>
                </li>

                <li className="nav-item my-2 my-lg-0 ms-lg-3">
                  <button
                    className="btn btn-outline-warning w-100"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item my-2 my-lg-0 ms-lg-3">
                <button
                  className="btn btn-outline-warning w-100"
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

      {/* Modal Login */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Iniciar sesión</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
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
