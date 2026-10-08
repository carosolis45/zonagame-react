// ============================================================
// COMPONENTE FILTRO
// Ubicación: src/components/Filtro.jsx
// Permite filtrar productos por categoría
// ============================================================

function Filtro({ categoriaActual, alCambiarCategoria }) {
    // Lista de categorías disponibles
    const categorias = [
        { valor: 'todos', etiqueta: 'Todos' },
        { valor: 'aventura', etiqueta: 'Aventura' },
        { valor: 'rpg', etiqueta: 'RPG' },
        { valor: 'sandbox', etiqueta: 'Sandbox' }
    ];

    return (
        <div className="filtro-categorias mb-4 text-center">
            {categorias.map((categoria) => (
                <button
                    key={categoria.valor}
                    className={`btn me-2 mb-2 ${
                        categoriaActual === categoria.valor
                            ? 'btn-primary-custom'   // Botón activo (morado)
                            : 'btn-outline-secondary' // Botón inactivo (gris)
                    }`}
                    onClick={() => alCambiarCategoria(categoria.valor)}
                >
                    {categoria.etiqueta}
                </button>
            ))}
        </div>
    );
}

export default Filtro;