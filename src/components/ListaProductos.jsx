// ============================================================
// COMPONENTE LISTA DE PRODUCTOS
// Ubicación: src/components/ListaProductos.jsx
// ============================================================

import ProductoCard from './ProductoCard';

function ListaProductos({ productos, alAgregarAlCarrito }) {
    return (
        <section className="container mt-5" id="productos">
            <h2 className="section-title">🌟 Productos Destacados 🌟</h2>
            <p className="text-muted mb-4">
                Descubre nuestra selección de videojuegos más populares
            </p>

            <div className="row g-4">
                {productos.map((producto) => (
                    <ProductoCard
                        key={producto.id}
                        producto={producto}
                        alAgregarAlCarrito={alAgregarAlCarrito}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListaProductos;