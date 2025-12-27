import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


function Login({ onClose }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === "admin" && password === "1234") {
      login(usuario, "admin");
      toast.success("Ingresaste como administrador");
    } else {
      login(usuario, "user");
      toast.success("Ingresaste como usuario");
    }

    onClose();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Usuario</label>
        <input
          className="form-control"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Contraseña</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-secondary w-100 mb-3" type="submit">
        Ingresar
      </button>

      
      <div className="text-center">
        <span>¿No tenés cuenta? </span>
        <Link
          to="/register"
          onClick={onClose}
          className="text-decoration-none fw-bold"
        >
          Registrate
        </Link>
      </div>
    </form>
  );
}

export default Login;
