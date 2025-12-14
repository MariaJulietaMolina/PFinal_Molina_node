import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ onClose }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && password === '1234') {
      login(usuario);
      toast.success("Inicio de sesión exitoso");
      onClose();
      navigate('/');
    } else {
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Usuario</label>
        <input className="form-control" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Contraseña</label>
        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary w-100" type="submit">Ingresar</button>
    </form>
  );
}

export default Login;
