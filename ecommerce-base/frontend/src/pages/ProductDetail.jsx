import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetail = ({ agregarAlCarrito }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar producto");
        return res.json();
      })
      .then(data => setProducto(data))
      .catch(() => setError(true));
  }, [id]);

  if (error) return <p>Error al cargar el producto.</p>;
  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>{producto.title}</h2>
      <img src={producto.image} alt={producto.title} style={{ maxWidth: '200px' }} />
      <p>{producto.description}</p>
      <p><strong>${producto.price}</strong></p>
      <button className="btn btn-success" onClick={() => agregarAlCarrito(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductDetail;
