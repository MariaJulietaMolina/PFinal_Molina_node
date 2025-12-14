import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
