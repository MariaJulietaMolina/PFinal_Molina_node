import { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate, useLocation } from "react-router-dom";

function FormularioProducto() {
  const { agregarProducto, editarProducto } = useContext(ProductsContext);
  const navigate = useNavigate();
  const location = useLocation();

  const productoInicial = location.state?.producto || null;

  const [producto, setProducto] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoInicial) {
      setProducto({
        id: productoInicial.id || "",
        title: productoInicial.title || "",
        price: productoInicial.price || "",
        description: productoInicial.description || "",
        image: productoInicial.image || "",
      });
    }
  }, [productoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!producto.title.trim()) {
      nuevosErrores.title = "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      nuevosErrores.price = "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      nuevosErrores.description = "La descripción debe tener al menos 10 caracteres.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    if (productoInicial) {
      await editarProducto(producto);
      alert(" Producto editado correctamente");
    } else {
      await agregarProducto(producto);
      alert(" Producto agregado correctamente");
    }

    navigate("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow">
      <h2>{productoInicial ? "Editar Producto" : "Agregar Producto"}</h2>

      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={producto.title}
          onChange={handleChange}
        />
        {errores.title && <p className="text-danger">{errores.title}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Precio:</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={producto.price}
          onChange={handleChange}
        />
        {errores.price && <p className="text-danger">{errores.price}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción:</label>
        <textarea
          name="description"
          className="form-control"
          value={producto.description}
          onChange={handleChange}
        />
        {errores.description && <p className="text-danger">{errores.description}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Imagen (URL):</label>
        <input
          type="text"
          name="image"
          className="form-control"
          value={producto.image}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {productoInicial ? "Actualizar" : "Agregar"} Producto
      </button>
    </form>
  );
}

export default FormularioProducto;
