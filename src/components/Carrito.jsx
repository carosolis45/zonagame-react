// ============================================================
// COMPONENTE CARRITO (MODAL)
// Ubicación: src/components/Carrito.jsx
// ============================================================

function Carrito({ carrito, mostrar, alCerrar, alEliminar, alVaciar }) {
    const total = carrito.reduce(
        (suma, item) => suma + item.precioOferta * item.cantidad,
        0
    );

    if (!mostrar) return null;

    return (
        <div
            className="modal fade show d-block"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">🛒 Tu Carrito</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={alCerrar}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {carrito.length === 0 ? (
                            <p className="text-muted text-center py-4">
                                🛒 Tu carrito está vacío
                            </p>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.nombre}</td>
                                            <td>
                                                ${item.precioOferta.toLocaleString('es-CL')}
                                            </td>
                                            <td>{item.cantidad}</td>
                                            <td>
                                                ${(item.precioOferta * item.cantidad).toLocaleString('es-CL')}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn-eliminar"
                                                    onClick={() => alEliminar(item.id)}
                                                >
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div className="text-end mt-3">
                            <h4>
                                Total: ${total.toLocaleString('es-CL')} CLP
                            </h4>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={alCerrar}>
                            Cerrar
                        </button>
                        <button className="btn btn-danger" onClick={alVaciar}>
                            🗑️ Vaciar Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;