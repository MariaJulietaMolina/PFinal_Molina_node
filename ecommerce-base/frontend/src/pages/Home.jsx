import ProductList from "../components/ProductList";

const Home = ({ agregarAlCarrito }) => {
  return (
    <div>
      <ProductList agregarAlCarrito={agregarAlCarrito} />
    </div>
  );
};


export default Home;
