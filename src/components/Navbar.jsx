// ============================================================
// COMPONENTE NAVBAR
// Ubicación: src/components/Navbar.jsx
// ============================================================

function Navbar({ cantidadCarrito, alAbrirCarrito }) {
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <i className="bi bi-controller"></i> ZonaGame
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <a className="nav-link active" href="#inicio">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#productos">Productos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#nosotros">Nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contacto">Contacto</a>
                        </li>

                        {/* CARRITO con contador */}
                        <li className="nav-item ms-3">
                            <button
                                className="btn btn-primary-custom position-relative"
                                onClick={alAbrirCarrito}
                            >
                                🛒 Carrito
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cantidadCarrito}
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;