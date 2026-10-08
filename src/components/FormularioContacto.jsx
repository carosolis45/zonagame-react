// ============================================================
// COMPONENTE FORMULARIO DE CONTACTO
// Ubicación: src/components/FormularioContacto.jsx
// Con validación de campos
// ============================================================

import { useState } from 'react';

function FormularioContacto({ alEnviarMensaje }) {
    // Estado para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Estado para los errores
    const [errores, setErrores] = useState({});

    // Validación del formulario
    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validar nombre (mínimo 3 caracteres)
        if (!nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio';
        } else if (nombre.trim().length < 3) {
            nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
        }

        // Validar email (formato válido)
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            nuevosErrores.email = 'El email es obligatorio';
        } else if (!regexEmail.test(email)) {
            nuevosErrores.email = 'Ingresa un email válido (ejemplo@dominio.com)';
        }

        // Validar mensaje (mínimo 10 caracteres)
        if (!mensaje.trim()) {
            nuevosErrores.mensaje = 'El mensaje es obligatorio';
        } else if (mensaje.trim().length < 10) {
            nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0; // true si no hay errores
    };

    // Manejar envío del formulario
    const manejarEnvio = (e) => {
        e.preventDefault();

        // Validar antes de enviar
        if (validarFormulario()) {
            // Si no hay errores, enviar
            alEnviarMensaje({ nombre, email, mensaje });

            // Limpiar formulario
            setNombre('');
            setEmail('');
            setMensaje('');
            setErrores({});
        }
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>
            {/* Campo: Nombre */}
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                    Nombre
                </label>
                <input
                    type="text"
                    id="nombre"
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                {errores.nombre && (
                    <div className="invalid-feedback">{errores.nombre}</div>
                )}
            </div>

            {/* Campo: Email */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errores.email && (
                    <div className="invalid-feedback">{errores.email}</div>
                )}
            </div>

            {/* Campo: Mensaje */}
            <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">
                    Mensaje
                </label>
                <textarea
                    id="mensaje"
                    className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                    rows="3"
                    placeholder="Escribe tu mensaje..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                ></textarea>
                {errores.mensaje && (
                    <div className="invalid-feedback">{errores.mensaje}</div>
                )}
            </div>

            {/* Botón de envío */}
            <button type="submit" className="btn btn-primary-custom w-100">
                Enviar mensaje <i className="bi bi-send"></i>
            </button>
        </form>
    );
}

export default FormularioContacto;