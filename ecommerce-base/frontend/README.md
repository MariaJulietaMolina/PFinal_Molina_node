Facilitech eCommerce 

Proyecto final del curso **React JS - Talento Lab**.  
Se trata de un eCommerce de electrodomésticos funcional con carrito, autenticación, CRUD de productos y diseño responsive.



Para acceder:

Para ingresar al área de administración o al carrito, debés iniciar sesión con:

Usuario: admin  
Contraseña: 1234


Funcionalidades principales

* Carrito de compras
- Agregar y eliminar productos.
- Calcular el total automáticamente.
- Confirmar compra con mensaje de éxito.
- Estado global usando Context API.

* Autenticación de usuarios
- Simulación con `localStorage`.
- Login modal desde la barra de navegación.
- Acceso restringido a `/admin` y `/cart`.

* CRUD de productos (MockAPI)
- Leer, agregar, editar y eliminar productos desde MockAPI.
- Validaciones de formulario (nombre obligatorio, precio mayor a 0, descripción mínima 10 caracteres).
- Confirmación antes de eliminar.
- Mensajes de éxito y error con `react-toastify`.

* Buscador y paginación
- Filtra productos por título con mínimo 3 letras.
- Paginador con scroll automático arriba.
- Botón del logo resetea búsqueda.

* Diseño y accesibilidad
- Estilizado con Bootstrap y styled-components.
- Totalmente responsive.
- Navegación clara y accesible.
- `React Helmet` para SEO.


--> Instalación local

1. Clonar el repositorio:

git clone https://github.com/MariaJulietaMolina/ecommerce-electrodomesticos.git  
cd ecommerce-electrodomesticos

2. Instalar dependencias:

npm install --legacy-peer-deps

> ⚠ Importante: Se usa React 18

3. Ejecutar localmente:

npm run dev



# Despliegue

El proyecto está desplegado en [Vercel](https://facilitech-molina.vercel.app) (URL final confirmada).



# Tareas pendientes

Este MVP ya es funcional, pero hay detalles menores que serán ajustados a la brevedad:

- Mejora visual.
- Iconografía.
- Posibilidad de vaciar el carrito completo.


# Herramientas utilizadas

- React JS
- React Router DOM
- Bootstrap 5
- Styled-components
- React Toastify
- React Helmet Async
- Context API
- MockAPI

---

# Contacto

*MARIA JULEITA MOLINA*  
Frontend Developer Jr.  
mariajulietamolina91@gmail.com


Gracias por visitar el proyecto ♥
