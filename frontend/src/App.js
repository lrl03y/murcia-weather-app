import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Cargando...");

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setStatus(null);
      })
      .catch((err) => {
        console.error(err);
        setStatus("Error al cargar los datos");
      });
  }, []);

  if (status) return <div className="App"><h2>{status}</h2></div>;

  const prediccion = data[0]?.prediccion?.dia || [];

  return (
    <div className="App">
      <h1>Predicción Meteorológica - Murcia</h1>
      {prediccion.map((dia, index) => (
        <div key={index} style={{marginBottom: '1em'}}>
          <h3>{dia.fecha}</h3>
          <ul>
            {dia.estadoCielo?.map((ec, i) => (
              <li key={i}>
                <strong>{ec.periodo ? `Periodo ${ec.periodo}` : 'General'}:</strong> {ec.descripcion || 'Sin datos'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
