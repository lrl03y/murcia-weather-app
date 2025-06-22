import React, { useEffect, useState } from 'react';
import './App.css';

function formateaFecha(fechaISO) {
  if (!fechaISO) return '';
  const fecha = new Date(fechaISO);
  if (isNaN(fecha)) return fechaISO;
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

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
      <h1 style={{ textAlign: 'center', marginBottom: '1.5em' }}>Predicción Meteorológica - Murcia</h1>
      {prediccion.map((dia, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '400px',
            background: '#f9f9f9',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            margin: '24px auto'
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '1em' }}>
            {formateaFecha(dia.fecha)}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {dia.estadoCielo?.map((ec, i) => (
              <li
                key={i}
                style={{
                  background: '#e3eafc',
                  marginBottom: '8px',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
                  {ec.periodo ? `Periodo - ${ec.periodo}` : 'General'}:
                </span>
                <span>{ec.descripcion || 'Sin datos'}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;