import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
  const { username, password } = req.body;
  // Validar con Firestore; por ahora simulamos:
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token: `Bearer ${token}` });
  }
  return res.status(401).json({ error: 'Credenciales inválidas' });
};
