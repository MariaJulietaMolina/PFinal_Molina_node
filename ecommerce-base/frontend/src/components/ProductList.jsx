import { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import { Pagination } from "react-bootstrap";
import { ProductsContext } from "../context/ProductsContext";

const ProductList = ({ agregarAlCarrito }) => {
  const { productosFiltrados, loading } = useContext(ProductsContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 9;

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indexUltimo = paginaActual * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indexPrimero, indexUltimo);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {productosPagina.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {[...Array(totalPaginas)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === paginaActual}
                onClick={() => cambiarPagina(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductList;
