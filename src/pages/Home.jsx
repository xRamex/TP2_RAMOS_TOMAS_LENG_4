import SubirImagen from "../SubirImagen";

function Home() {
  return (
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
  );
}

export default Home;
