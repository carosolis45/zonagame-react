// ============================================================
// COMPONENTE PRINCIPAL - APP
// Ubicación: src/App.jsx
// Semana 8 + EFT - localStorage + useEffect + Renderizado Condicional
// + Secciones Nosotros, Contacto con Formulario validado
// + Filtro por categoría + Eliminar producto del catálogo
// ============================================================

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import FormularioContacto from './components/FormularioContacto';
import productosData from './data/productos';
import './App.css';

// Clave para guardar el carrito en localStorage
const CARRITO_KEY = 'zonagame_carrito';

function App() {
    // ============================================================
    // 1. ESTADOS CON useState
    // ============================================================

    // Carrito: recupera del localStorage al iniciar
    const [carrito, setCarrito] = useState(() => {
        try {
            const guardado = localStorage.getItem(CARRITO_KEY);
            return guardado ? JSON.parse(guardado) : [];
        } catch (error) {
            console.error('❌ Error al cargar carrito:', error);
            return [];
        }
    });

    // Estado para mostrar/ocultar el modal del carrito
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    // Estado para los productos cargados dinámicamente
    const [productos, setProductos] = useState([]);

    // Estado para saber si está cargando
    const [cargando, setCargando] = useState(true);

    // Estado para la notificación flotante
    const [notificacion, setNotificacion] = useState(null);

    // ============================================================
    // 2. useEffect: Cargar productos simulando una API
    // ============================================================

    useEffect(() => {
        console.log('📦 Cargando productos...');

        const timer = setTimeout(() => {
            setProductos(productosData);
            setCargando(false);
            console.log('✅ Productos cargados:', productosData.length);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // ============================================================
    // 3. useEffect: Guardar carrito en localStorage
    // ============================================================

    useEffect(() => {
        try {
            localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
            console.log('💾 Carrito guardado:', carrito.length, 'productos');
        } catch (error) {
            console.error('❌ Error al guardar carrito:', error);
        }
    }, [carrito]);

    // ============================================================
    // 4. FUNCIONES
    // ============================================================

    // Función para mostrar notificación flotante
    const mostrarNotificacion = (mensaje) => {
        setNotificacion(mensaje);
        setTimeout(() => {
            setNotificacion(null);
        }, 3000);
    };

    // Agregar producto al carrito
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

        // Mostrar notificación
        mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
    };

    // Eliminar producto del carrito
    const eliminarDelCarrito = (id) => {
        const producto = carrito.find((item) => item.id === id);
        setCarrito(carrito.filter((item) => item.id !== id));

        // Mostrar notificación
        if (producto) {
            mostrarNotificacion(`🗑️ ${producto.nombre} eliminado`);
        }
    };

    // Vaciar carrito completo
    const vaciarCarrito = () => {
        setCarrito([]);
        setMostrarCarrito(false);
        mostrarNotificacion('🗑️ Carrito vaciado');
    };

    // Eliminar producto del catálogo (de la lista de productos)
    const eliminarProductoDelCatalogo = (id) => {
        const producto = productos.find((p) => p.id === id);
        setProductos(productos.filter((p) => p.id !== id));

        if (producto) {
            mostrarNotificacion(`🗑️ ${producto.nombre} eliminado del catálogo`);
        }
    };

    // Calcular cantidad total
    const cantidadTotal = carrito.reduce(
        (suma, item) => suma + item.cantidad,
        0
    );

    // ============================================================
    // 5. RENDERIZADO
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

            {/* RENDERIZADO CONDICIONAL: spinner o productos */}
            {cargando ? (
                <section className="container mt-5 text-center py-5">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                        style={{ width: '3rem', height: '3rem' }}
                    >
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3">⏳ Cargando productos...</p>
                </section>
            ) : (
                <ListaProductos
                    productos={productos}
                    alAgregarAlCarrito={agregarAlCarrito}
                    carrito={carrito}
                    alEliminarProducto={eliminarProductoDelCatalogo}
                />
            )}

            {/* ============================================================
                SECCIÓN NOSOTROS
                ============================================================ */}
            <section className="container mt-5" id="nosotros">
                <div className="row g-4 align-items-center">
                    <div className="col-12 col-lg-6">
                        <h2 className="section-title">📖 Sobre ZonaGame</h2>
                        <p>
                            Somos una tienda especializada en videojuegos,
                            consolas y accesorios. Nuestro objetivo es ofrecer
                            la mejor experiencia de compra para los gamers de Chile.
                        </p>
                        <ul className="list-unstyled">
                            <li>
                                <i className="bi bi-check-circle-fill text-success"></i>{" "}
                                Envíos a todo Chile
                            </li>
                            <li>
                                <i className="bi bi-check-circle-fill text-success"></i>{" "}
                                Los mejores precios del mercado
                            </li>
                            <li>
                                <i className="bi bi-check-circle-fill text-success"></i>{" "}
                                Atención personalizada
                            </li>
                            <li>
                                <i className="bi bi-check-circle-fill text-success"></i>{" "}
                                Garantía en todos los productos
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-6">
                        <img
                            src="https://wallpapercave.com/wp/wp11579600.jpg"
                            alt="Are you Player - ZonaGame"
                            className="img-fluid rounded-4 shadow"
                            style={{ maxHeight: '450px', width: 'auto' }}
                        />
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECCIÓN CONTACTO CON FORMULARIO VALIDADO
                ============================================================ */}
            <section className="container mt-5" id="contacto">
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <h2 className="section-title">📬 Contáctanos</h2>
                        <p className="text-muted">
                            Déjanos tu mensaje y te responderemos a la brevedad.
                        </p>
                        {/* COMPONENTE FORMULARIO CON VALIDACIÓN */}
                        <FormularioContacto alEnviarMensaje={mostrarNotificacion} />
                    </div>
                    <div className="col-12 col-md-6">
                        <h2 className="section-title">📍 Ubicación</h2>
                        <p>
                            <i className="bi bi-geo-alt"></i> Av. Videojuegoscarolina 123, Santiago
                        </p>
                        <p>
                            <i className="bi bi-envelope"></i>{" "}
                            <a href="mailto:info@zonagame.cl">info@zonagame.cl</a>
                        </p>
                        <p>
                            <i className="bi bi-telephone"></i> +56 9 1234 5678
                        </p>
                        <div className="mt-4">
                            <a href="#" className="btn btn-outline-primary me-2">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="btn btn-outline-primary me-2">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="#" className="btn btn-outline-primary me-2">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="btn btn-outline-primary">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODAL DEL CARRITO */}
            <Carrito
                carrito={carrito}
                mostrar={mostrarCarrito}
                alCerrar={() => setMostrarCarrito(false)}
                alEliminar={eliminarDelCarrito}
                alVaciar={vaciarCarrito}
            />

            {/* NOTIFICACIÓN FLOTANTE (renderizado condicional) */}
            {notificacion && (
                <div className="notificacion-flotante">
                    {notificacion}
                </div>
            )}

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
                                <li><a href="#nosotros">Nosotros</a></li>
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