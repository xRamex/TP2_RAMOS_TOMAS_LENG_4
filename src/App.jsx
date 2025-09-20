// App: estructura general de la página (header, sección principal y tarjeta de subida)
import SubirImagen from "./SubirImagen";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="badge">TP2</span>
          <h1 className="title">Lenguajes 4 — Trabajo Práctico 2</h1>
        </div>
        <p className="subtitle">Ramos Tomás</p>
      </header>

      <main className="content">
        <section className="section">
          <h2 className="section-title">Subí tu imagen</h2>
          <p className="section-desc">
            Arrastrá y soltá una imagen o hacé clic en el recuadro para elegir un archivo.
          </p>
          <div className="card upload-card">
            <SubirImagen />
          </div>
        </section>
      </main>

      
    </div>
  );
}

export default App;
