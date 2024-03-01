// El objetivo de este componente es ofrecer a los usuarios una visión rápida de la situación
// financiera actual de su presupuesto.

import React from "react";

//  Función que representa el componente principal encargado de mostrar 
//  la información de gastos e ingresos en la interfaz.

const Lista = ({ movimientos, onDeleteMovimiento }) => {
  const gastos = movimientos.filter((movimiento) => movimiento.tipo === "gasto");
  const ingresos = movimientos.filter((movimiento) => movimiento.tipo === "ingreso");

  const totalIngresos = ingresos.reduce((sum, movimiento) => sum + parseFloat(movimiento.monto), 0);
  const totalGastos = gastos.reduce((sum, movimiento) => sum + parseFloat(movimiento.monto), 0);

  return (
    <div className="container">
      <h1>Presupuesto Mensual</h1>
      <div className="formLista">
        <div className="cuadro cuadro-gastos">
          <h4>Gastos</h4>
          <TablaMovimientos movimientos={gastos} titulo="Gastos" total={totalGastos} onDeleteMovimiento={onDeleteMovimiento} />
          <table className="center-table">
            <tbody>
              <tr>
                <td colSpan="3"><strong>$</strong></td>
                <td><strong>{totalGastos.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cuadro cuadro-ingresos">
          <h4>Ingresos</h4>
          <TablaMovimientos movimientos={ingresos} titulo="Ingresos" total={totalIngresos} onDeleteMovimiento={onDeleteMovimiento} />
          <table className="center-table">
                        <tbody>
              <tr>
                <td colSpan="3"><strong>$</strong></td>
                <td><strong>{totalIngresos.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// Función que representa un componente secundario utilizado 
// por Lista para renderizar las tablas de movimientos.

const TablaMovimientos = ({ movimientos, titulo, total, onDeleteMovimiento }) => {
  return (
    <table
      style={{
        width: "100%",
        border: "1px solid  rgba(122, 49, 83, 0.568)",
        borderRadius: '10px',
        borderCollapse: "collapse",
        textAlign: 'center',
      }}
    >
      <thead>
        <tr>
          <th>{titulo}</th>
          <th>Descripción</th>
           <th>Fecha</th>
          <th>Monto</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movimientos.map((movimiento) => (
          <tr key={movimiento.id}>
            <td>{movimiento.categoria}</td>
            <td>{movimiento.descripcion}</td>
            <td>{movimiento.fecha}</td>
            <td>${movimiento.monto}</td>
            <td>
              <button className="eliminar-btn icon-close" onClick={() => onDeleteMovimiento(movimiento.id)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4734/4734087.png"
                  alt="Eliminar"
                />
              </button>
            </td>
          </tr>
        ))}
      
      </tbody>
    </table>
  );
};

export default Lista;
