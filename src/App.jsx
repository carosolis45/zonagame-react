// ============================================================
// COMPONENTE PRINCIPAL - APP
// Ubicación: src/App.jsx
// ============================================================

import { useState } from 'react';
import Navbar from './components/Navbar';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import productos from './data/productos';
import './App.css';

function App() {
    // ============================================================
    // ESTADOS CON useState
    // ============================================================

    const [carrito, setCarrito] = useState([]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    // ============================================================
    // FUNCIONES DEL CARRITO
    // ============================================================

    const agregarAlCarrito = (producto) => {
        const existente = carrito.find((item) => item.id === producto.id);

        if (existente) {
            setCarrito(
                carrito.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
        setMostrarCarrito(false);
    };

    const cantidadTotal = carrito.reduce(
        (suma, item) => suma + item.cantidad,
        0
    );

    // ============================================================
    // RENDERIZADO (JSX)
    // ============================================================

    return (
        <>
            {/* NAVBAR */}
            <Navbar
                cantidadCarrito={cantidadTotal}
                alAbrirCarrito={() => setMostrarCarrito(true)}
            />

            {/* HERO SECTION */}
            <section className="hero-section text-center" id="inicio">
                <div className="container">
                    <h1>🎮 ZonaGame 🎮</h1>
                    <p className="lead">La tienda de videojuegos, consolas y accesorios</p>
                    <p>Encuentra los mejores juegos al mejor precio</p>
                </div>
            </section>

            {/* LISTA DE PRODUCTOS */}
            <ListaProductos
                productos={productos}
                alAgregarAlCarrito={agregarAlCarrito}
            />

            {/* MODAL DEL CARRITO */}
            <Carrito
                carrito={carrito}
                mostrar={mostrarCarrito}
                alCerrar={() => setMostrarCarrito(false)}
                alEliminar={eliminarDelCarrito}
                alVaciar={vaciarCarrito}
            />

            {/* FOOTER */}
            <footer className="footer-zonagame mt-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <h5 className="footer-titulo">
                                <i className="bi bi-controller"></i> ZonaGame
                            </h5>
                            <p className="footer-texto">
                                Tu tienda de videojuegos favorita en Chile.
                            </p>
                        </div>
                        <div className="col-12 col-md-4">
                            <h5 className="footer-titulo">Enlaces rápidos</h5>
                            <ul className="list-unstyled footer-lista">
                                <li><a href="#inicio">Inicio</a></li>
                                <li><a href="#productos">Productos</a></li>
                                <li><a href="#contacto">Contacto</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4">
                            <h5 className="footer-titulo">Síguenos</h5>
                            <div className="footer-redes">
                                <a href="#" aria-label="Facebook">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <i className="bi bi-twitter-x"></i>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="#" aria-label="YouTube">
                                    <i className="bi bi-youtube"></i>
                                </a>
                            </div>
                            <p className="footer-copyright">
                                &copy; 2026 ZonaGame. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;
