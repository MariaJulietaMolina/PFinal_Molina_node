import { db } from '../firebase.js';

export const getAll = async (req, res, next) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) { next(err); }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    // validar nombre, precio > 0, descripcion >= 10 caracteres...
    const docRef = await db.collection('products').add(data);
    const newDoc = await docRef.get();
    res.status(201).json({ id: docRef.id, ...newDoc.data() });
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await db.collection('products').doc(req.params.id).delete();
    res.json({ message: 'Producto eliminado' });
  } catch (err) { next(err); }
};
