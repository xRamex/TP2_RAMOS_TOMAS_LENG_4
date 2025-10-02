import { useState } from "react";
import "./Servicios.css";

// Array local con datos de habitaciones de hotel
const habitaciones = [
  {
    id: 1,
    nombre: "Suite Presidencial",
    descripcion: "Elegante suite con vista panorámica de la ciudad. Incluye sala de estar, dormitorio principal y baño de lujo con jacuzzi.",
    precio: "$250 USD/noche",
    capacidad: "2-4 personas",
    servicios: ["WiFi gratuito", "Servicio a la habitación 24hs", "Jacuzzi", "Balcón privado", "Minibar"],
    imagen: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    nombre: "Habitación Ejecutiva",
    descripcion: "Habitación moderna y funcional, perfecta para viajeros de negocios. Cuenta con escritorio amplio y zona de trabajo.",
    precio: "$120 USD/noche",
    capacidad: "1-2 personas",
    servicios: ["WiFi gratuito", "Escritorio de trabajo", "TV LED 50\"", "Cafetera", "Caja fuerte"],
    imagen: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    nombre: "Habitación Familiar",
    descripcion: "Espaciosa habitación ideal para familias, con dos camas matrimoniales y zona de juegos para niños.",
    precio: "$180 USD/noche",
    capacidad: "4-6 personas",
    servicios: ["WiFi gratuito", "Zona de juegos", "Frigobar", "TV por cable", "Cunas disponibles"],
    imagen: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop"
  }
];

function Servicios() {
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);

  const openModal = (habitacion) => {
    setSelectedHabitacion(habitacion);
  };

  const closeModal = () => {
    setSelectedHabitacion(null);
  };

  return (
    <main className="content">
      <section className="section">
        <h2 className="section-title">Nuestros Servicios de Habitaciones</h2>
        <p className="section-desc">
          Descubre nuestras exclusivas habitaciones diseñadas para brindarte la máxima comodidad y lujo durante tu estadía.
        </p>
        
        <div className="habitaciones-grid">
          {habitaciones.map((habitacion) => (
            <div key={habitacion.id} className="habitacion-card">
              <div className="habitacion-image">
                <img 
                  src={habitacion.imagen} 
                  alt={habitacion.nombre}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Imagen+no+disponible';
                  }}
                />
              </div>
              <div className="habitacion-content">
                <h3 className="habitacion-nombre">{habitacion.nombre}</h3>
                <p className="habitacion-descripcion">{habitacion.descripcion}</p>
                <div className="habitacion-info">
                  <span className="habitacion-precio">{habitacion.precio}</span>
                  <span className="habitacion-capacidad">{habitacion.capacidad}</span>
                </div>
                <div className="habitacion-servicios">
                  <strong>Servicios incluidos:</strong>
                  <ul>
                    {habitacion.servicios.slice(0, 3).map((servicio, index) => (
                      <li key={index}>{servicio}</li>
                    ))}
                    {habitacion.servicios.length > 3 && (
                      <li>+ {habitacion.servicios.length - 3} más</li>
                    )}
                  </ul>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => openModal(habitacion)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para mostrar detalles completos */}
        {selectedHabitacion && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              <div className="modal-body">
                <div className="modal-image">
                  <img 
                    src={selectedHabitacion.imagen} 
                    alt={selectedHabitacion.nombre}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Imagen+no+disponible';
                    }}
                  />
                </div>
                <div className="modal-info">
                  <h3>{selectedHabitacion.nombre}</h3>
                  <p className="modal-descripcion">{selectedHabitacion.descripcion}</p>
                  <div className="modal-details">
                    <div className="detail-item">
                      <strong>Precio:</strong> {selectedHabitacion.precio}
                    </div>
                    <div className="detail-item">
                      <strong>Capacidad:</strong> {selectedHabitacion.capacidad}
                    </div>
                    <div className="detail-item">
                      <strong>Servicios incluidos:</strong>
                      <ul className="servicios-completos">
                        {selectedHabitacion.servicios.map((servicio, index) => (
                          <li key={index}>{servicio}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-primary">Reservar ahora</button>
                    <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Servicios;