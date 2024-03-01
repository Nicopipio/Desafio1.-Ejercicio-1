// Componente Presupuesto calcula y muestra el saldo final basado en los ingresos
// y gastos de la lista de movimientos, proporcionando un resumen financiero en la interfaz
//  de la aplicación.

import React from "react";

// Función que representa el componente Presupuesto.

const Presupuesto = ({ movimientos }) => {
  const totalIngresos = movimientos
    .filter((movimiento) => movimiento.tipo === "ingreso")
    .reduce((sum, movimiento) => sum + parseFloat(movimiento.monto), 0);

  const totalGastos = movimientos
    .filter((movimiento) => movimiento.tipo === "gasto")
    .reduce((sum, movimiento) => sum + parseFloat(movimiento.monto), 0);

  const saldoFinal = totalIngresos - totalGastos;

  return (
    <div className="presupuesto-container">
      <ul>
        <h4>${saldoFinal.toLocaleString()}</h4>
      </ul>
    </div>
  );
};

export default Presupuesto;