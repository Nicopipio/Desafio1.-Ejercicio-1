"use client";

import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import Presupuesto from "./components/Presupuesto";

const App = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [saldo, setSaldo] = useState(0);

  // "Función asincrónica para guardar movimientos en un archivo JSON"
  const saveMovimientosToFile = async () => {
    try {
      const response = await fetch("data.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movimientos),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los movimientos");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Función que maneja la eliminación de un movimiento
  const handleAddMovimiento = (movimiento) => {
    setMovimientos([...movimientos, movimiento]);

    // Actualiza el saldo según el tipo de movimiento
    if (movimiento.tipo === "ingreso") {
      setSaldo(saldo + parseFloat(movimiento.monto));
    } else if (movimiento.tipo === "gasto") {
      setSaldo(saldo - parseFloat(movimiento.monto));
    }

    // Guarda los movimientos en el archivo JSON
    saveMovimientosToFile();
  };

  const handleDeleteMovimiento = (id) => {
    const movimientoToDelete = movimientos.find((movimiento) => movimiento.id === id);

    if (movimientoToDelete) {
      setMovimientos(movimientos.filter((movimiento) => movimiento.id !== id));

      if (movimientoToDelete.tipo === "ingreso") {
        setSaldo(saldo - parseFloat(movimientoToDelete.monto));
      } else if (movimientoToDelete.tipo === "gasto") {
        setSaldo(saldo + parseFloat(movimientoToDelete.monto));
      }

      // Guarda los movimientos en el archivo JSON después de eliminar uno
      saveMovimientosToFile();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json");
        const data = await response.json();
        setMovimientos(data);
      } catch (error) {
        console.error("Error al cargar los movimientos desde el archivo JSON", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Formulario onAddMovimiento={handleAddMovimiento} />
      <Lista
        movimientos={movimientos} 
        onDeleteMovimiento={handleDeleteMovimiento} 
      />
      <Presupuesto movimientos={movimientos} />
    </div>
  );
};

export default App;
