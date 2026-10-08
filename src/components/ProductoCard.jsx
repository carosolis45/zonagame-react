// ============================================================
// COMPONENTE PRODUCTO CARD
// Ubicación: src/components/ProductoCard.jsx
// Con botón de eliminar producto
// ============================================================

function ProductoCard({ producto, alAgregarAlCarrito, carrito, alEliminarProducto }) {
    // Verificamos si este producto ya está en el carrito
    const estaEnCarrito = carrito.some((item) => item.id === producto.id);

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm position-relative">
                {/* Botón de eliminar producto (esquina superior derecha) */}
                <button
                    className="btn-eliminar-producto"
                    onClick={() => alEliminarProducto(producto.id)}
                    title="Eliminar producto"
                >
                    ❌
                </button>

                <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text text-muted">{producto.descripcion}</p>

                    {/* Precio normal tachado */}
                    <p className="text-muted mb-1">
                        <s>${producto.precioNormal.toLocaleString('es-CL')}</s>
                    </p>

                    {/* Precio de oferta */}
                    <p className="precio mt-auto">
                        💰 ${producto.precioOferta.toLocaleString('es-CL')} CLP
                    </p>

                    {/* RENDERIZADO CONDICIONAL: botón cambia según el estado */}
                    {estaEnCarrito ? (
                        <button
                            className="btn btn-success w-100"
                            disabled
                        >
                            ✅ En el carrito
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary-custom w-100"
                            onClick={() => alAgregarAlCarrito(producto)}
                        >
                            Agregar al carrito 🛒
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductoCard;