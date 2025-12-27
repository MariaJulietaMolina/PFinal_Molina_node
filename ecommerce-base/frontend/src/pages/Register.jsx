import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "users"), {
        ...formData,
        role: "user",
        createdAt: Timestamp.now(),
      });

      toast.success("Usuario registrado correctamente");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar usuario");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Registro de usuario</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>DNI</label>
          <input
            type="text"
            name="dni"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Ciudad</label>
            <input
              type="text"
              name="ciudad"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Provincia</label>
            <input
              type="text"
              name="provincia"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Código Postal</label>
            <input
              type="text"
              name="codigoPostal"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <hr />

        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success w-100" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
