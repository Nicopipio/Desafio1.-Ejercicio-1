// Componente para el formulario que se utiliza para crear un formulario interactivo 
// que permite al usuario ingresar información sobre movimientos financieros, ya sean
// gastos o ingresos.


import React, { useState } from "react";

// Función que representa el componente Formulario.

const Formulario = ({ onAddMovimiento }) => {
  const [tipo, setTipo] = useState("gasto");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState(0);

   // Función que maneja el envío del formulario.

  const handleSubmit = (e) => {
    e.preventDefault();

    const movimiento = {
      id: Date.now(),
      tipo,
      categoria,
      fecha,
      descripcion,
      monto,
    };

    onAddMovimiento(movimiento);

    setTipo("gasto");
    setCategoria("");
    setFecha("");
    setDescripcion("");
    setMonto(0);
  };

  const categoriasGasto = ["Alimentación", "Transporte", "Entretenimiento", "Servicios públicos", "Otros..."];
  const categoriasIngreso = ["Salario", "Trabajo esporádico", "Caja fuerte", "Ahorro", "Cartera", "Otros..."];

  return (
    <div className="formRe">
      <form onSubmit={handleSubmit}>
        <label htmlFor="tipo">Movimiento:</label>
        <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>

        {tipo === "gasto" && (
          <div>
            <label htmlFor="categoria">Categoría de Gasto:</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categoriasGasto.map((categoria) => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
        )}

        {tipo === "ingreso" && (
          <div>
            <label htmlFor="categoria">Categoría de Ingreso:</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categoriasIngreso.map((categoria) => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
        )}

        <label htmlFor="fecha">Fecha:</label>
        <input
          id="fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <label htmlFor="descripcion">Descripción:</label>
        <input
          id="descripcion"
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label htmlFor="monto">Monto:</label>
        <input
          id="monto"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Formulario;