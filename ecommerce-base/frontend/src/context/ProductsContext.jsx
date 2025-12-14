import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  const obtenerProductos = async () => {
    try {
      const res = await fetch("https://687c5fc4b4bc7cfbda88de39.mockapi.io/api/v1/productos");
      const data = await res.json();
      setProductos(data);
      setProductosFiltrados(data);
    } catch (error) {
      console.error(" Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const buscarProductos = () => {
    const palabra = busqueda.trim().toLowerCase();
    if (palabra.length >= 3) {
      const resultados = productos.filter(p =>
        p.title?.toLowerCase().includes(palabra)
      );
      setProductosFiltrados(resultados);
    } else {
      setProductosFiltrados(productos);
    }
  };

  const agregarProducto = async (producto) => {
    try {
      const res = await fetch("https://687c5fc4b4bc7cfbda88de39.mockapi.io/api/v1/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      const nuevo = await res.json();
      const actualizados = [...productos, nuevo];
      setProductos(actualizados);
      setProductosFiltrados(actualizados);
    } catch (error) {
      console.error(" Error al agregar producto:", error);
    }
  };

  const editarProducto = async (productoActualizado) => {
    try {
      const res = await fetch(`https://687c5fc4b4bc7cfbda88de39.mockapi.io/api/v1/productos/${productoActualizado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado),
      });
      const actualizado = await res.json();
      const actualizados = productos.map(p => p.id === actualizado.id ? actualizado : p);
      setProductos(actualizados);
      setProductosFiltrados(actualizados);
    } catch (error) {
      console.error(" Error al editar producto:", error);
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás segura/o de eliminar este producto?");
    if (!confirmar) return;

    try {
      await fetch(`https://687c5fc4b4bc7cfbda88de39.mockapi.io/api/v1/productos/${id}`, {
        method: "DELETE",
      });
      const actualizados = productos.filter(p => p.id !== id);
      setProductos(actualizados);
      setProductosFiltrados(actualizados);
    } catch (error) {
      console.error(" Error al eliminar producto:", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        productos,
        productosFiltrados,
        loading,
        busqueda,
        setBusqueda,
        buscarProductos,
        agregarProducto,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};