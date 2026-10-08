// ============================================================
// COMPONENTE LISTA DE PRODUCTOS
// Ubicación: src/components/ListaProductos.jsx
// Con filtro por categoría y eliminar producto
// ============================================================

import { useState } from 'react';
import ProductoCard from './ProductoCard';
import Filtro from './Filtro';

function ListaProductos({ productos, alAgregarAlCarrito, carrito, alEliminarProducto }) {
    // Estado local para la categoría seleccionada
    const [categoriaActual, setCategoriaActual] = useState('todos');

    // Filtrar productos según la categoría
    const productosFiltrados = categoriaActual === 'todos'
        ? productos
        : productos.filter((producto) => producto.categoria === categoriaActual);

    return (
        <section className="container mt-5" id="productos">
            <h2 className="section-title">🌟 Productos Destacados 🌟</h2>
            <p className="text-muted mb-4">
                Descubre nuestra selección de videojuegos más populares
            </p>

            {/* FILTRO POR CATEGORÍA */}
            <Filtro
                categoriaActual={categoriaActual}
                alCambiarCategoria={setCategoriaActual}
            />

            {/* GRID DE PRODUCTOS (filtrados) */}
            <div className="row g-4">
                {productosFiltrados.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <h4 className="text-muted">
                            😢 No hay productos en esta categoría
                        </h4>
                    </div>
                ) : (
                    productosFiltrados.map((producto) => (
                        <ProductoCard
                            key={producto.id}
                            producto={producto}
                            alAgregarAlCarrito={alAgregarAlCarrito}
                            carrito={carrito}
                            alEliminarProducto={alEliminarProducto}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

export default ListaProductos;