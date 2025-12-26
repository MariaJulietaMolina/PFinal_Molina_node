import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({ carrito, eliminarDelCarrito }) => {
  const total = carrito.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

  const handleComprar = () => {
    toast.success(" Gracias por tu compra ", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="alert alert-info text-center">
          El carrito está vacío. ¡Agrega productos para comenzar!
        </div>
      ) : (
        <>
          <ul className="list-group shadow-sm">
            {carrito.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.title || "Producto"}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginRight: "1rem",
                    }}
                  />
                  <div>
                    <strong>{item.title || "Sin título"}</strong>
                    <p className="mb-0 text-muted">
                      ${Number(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => eliminarDelCarrito(item.id)}
                  aria-label="Eliminar del carrito"
                >
                  <FaTrashAlt /> Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 p-3 border rounded shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-center">
            <h4 className="mb-3 mb-md-0">
              Total: <span className="text-secondary">${total.toFixed(2)}</span>
            </h4>
            <button
              className="btn btn-warning btn-lg"
              onClick={handleComprar}
              aria-label="Confirmar compra"
            >
              <FaCheckCircle className="me-2" />
              Confirmar Compra
            </button>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Cart;


