import { useState, useEffect } from "react";
import "./Conversiones.css";

// Monedas disponibles en DolarAPI - usando flag-icons CSS
const monedasDisponibles = [
  { codigo: "USD", nombre: "Dólar Estadounidense", flagClass: "fi fi-us", moneda: "USD", imagenBillete: "/TP2_RAMOS_TOMAS_LENG_4/billetes/usd.jpg" },
  { codigo: "EUR", nombre: "Euro", flagClass: "fi fi-eu", moneda: "EUR", imagenBillete: "/TP2_RAMOS_TOMAS_LENG_4/billetes/eur.jpg" },
  { codigo: "BRL", nombre: "Real Brasileño", flagClass: "fi fi-br", moneda: "BRL", imagenBillete: "/TP2_RAMOS_TOMAS_LENG_4/billetes/brl.jpg" },
  { codigo: "CLP", nombre: "Peso Chileno", flagClass: "fi fi-cl", moneda: "CLP", imagenBillete: "/TP2_RAMOS_TOMAS_LENG_4/billetes/clp.jpg" },
  { codigo: "UYU", nombre: "Peso Uruguayo", flagClass: "fi fi-uy", moneda: "UYU", imagenBillete: "/TP2_RAMOS_TOMAS_LENG_4/billetes/uyu.jpg" }
];

// Función para renderizar bandera usando flag-icons
const renderizarBandera = (moneda) => {
  return (
    <div className="currency-flag" title={moneda.nombre}>
      <span className={moneda.flagClass}></span>
    </div>
  );
};

function Conversiones() {
  const [cantidadARS, setCantidadARS] = useState("");
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  // Función para obtener las cotizaciones de la API
  const obtenerCotizaciones = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://dolarapi.com/v1/cotizaciones');
      
      if (!response.ok) {
        throw new Error('Error al obtener las cotizaciones');
      }

      const data = await response.json();
      console.log('Datos de la API:', data); // Para debug
      
      // Procesar los datos - mapear por moneda directamente
      const cotizacionesProcesadas = data.map(item => {
        // Buscar en nuestro array por moneda
        const monedaInfo = monedasDisponibles.find(m => m.moneda === item.moneda);
        if (monedaInfo) {
          return {
            ...monedaInfo,
            compra: item.compra,
            venta: item.venta,
            fechaActualizacion: item.fechaActualizacion
          };
        }
        return null;
      }).filter(Boolean);

      console.log('Cotizaciones procesadas:', cotizacionesProcesadas); // Para debug
      setCotizaciones(cotizacionesProcesadas);
      setUltimaActualizacion(new Date());

    } catch (error) {
      console.error('Error al obtener cotizaciones:', error);
      setError("Error al obtener las tasas de cambio. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar cotizaciones al montar el componente
  useEffect(() => {
    obtenerCotizaciones();
  }, []);

  // Función para calcular la conversión FROM ARS TO other currency
  const calcularConversion = (tasa, cantidad) => {
    if (!cantidad || cantidad <= 0 || !tasa) return 0;
    // Si es ARS a otra moneda, dividimos por la tasa de venta (cuántos ARS por 1 unidad de moneda extranjera)
    return cantidad / tasa;
  };

  // Función para manejar cambio en la cantidad
  const handleCantidadChange = (e) => {
    const valor = e.target.value;
    setCantidadARS(valor);
  };

  return (
    <main className="content">
      <section className="section">
        {/* Información adicional */}
        <div className="info-adicional">
          <div className="card">
            <h4>💡 Información sobre las Cotizaciones</h4>
            <ul>
              <li><strong>Datos en tiempo real:</strong> Cotizaciones actualizadas desde DolarAPI</li>
              <li><strong>Para huéspedes:</strong> Calcula precios de habitaciones en tu moneda local</li>
              <li><strong>Monedas disponibles:</strong> ARS, USD, EUR, BRL, CLP, UYU</li>
            </ul>
          </div>
        </div>
        <h2 className="section-title">Conversor de Pesos Argentinos</h2>
        <p className="section-desc">
          Convierte pesos argentinos a diferentes monedas con tasas de cambio en tiempo real. 
          Ingresa la cantidad en ARS y ve automáticamente la conversión a todas las monedas disponibles.
        </p>

        {/* Campo de entrada para cantidad en ARS */}
        <div className="input-section">
          <div className="input-container">
            <div className="card">
              <h3 className="input-title">
                <span className="fi fi-ar" style={{fontSize: '1.5rem', marginRight: '0.5rem'}}></span>
                Cantidad en Pesos Argentinos (ARS)
              </h3>
              <div className="input-wrapper">
                <span className="currency-symbol">
                  <span className="fi fi-ar" style={{fontSize: '1.2rem', marginRight: '0.25rem'}}></span>
                  $
                </span>
                <input
                  type="number"
                  value={cantidadARS}
                  onChange={handleCantidadChange}
                  placeholder="Ingresa la cantidad en ARS"
                  min="0"
                  step="0.01"
                  className="amount-input"
                />
                <button 
                  className="btn-refresh" 
                  onClick={obtenerCotizaciones}
                  disabled={loading}
                  title="Actualizar cotizaciones"
                >
                  {loading ? "⏳" : "🔄"}
                </button>
              </div>
              {error && <div className="error-text" role="alert">{error}</div>}
            </div>
          </div>

          {/* Información de actualización - movida aquí */}
          {ultimaActualizacion && (
            <div className="update-info-side">
              <div className="card">
                <div className="update-content">
                  <span className="update-icon">🕒</span>
                  <div className="update-text">
                    <span className="update-label">Última actualización:</span>
                    <span className="update-time">{ultimaActualizacion.toLocaleString()}</span>
                  </div>
                  <button 
                    className="btn btn-primary btn-small" 
                    onClick={obtenerCotizaciones}
                    disabled={loading}
                  >
                    {loading ? "Actualizando..." : "Actualizar datos"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid de conversiones */}
        <div className="conversiones-grid">
          {monedasDisponibles.filter(moneda => moneda.codigo !== "ARS").map((moneda) => {
            const cotizacion = cotizaciones.find(c => c.codigo === moneda.codigo);
            const cantidadConvertida = cantidadARS && cotizacion?.venta ? 
              calcularConversion(cotizacion.venta, parseFloat(cantidadARS)) : 0;

            return (
              <div key={moneda.codigo} className="conversion-card">
                <div 
                  className="card card-with-bg" 
                  style={{
                    backgroundImage: moneda.imagenBillete ? `url(${moneda.imagenBillete})` : 'none'
                  }}
                >
                  <div className="card-overlay"></div>
                  <div className="card-content">
                  <div className="card-header">
                    {renderizarBandera(moneda)}
                    <div className="currency-info">
                      <h4 className="currency-code">{moneda.codigo}</h4>
                      <p className="currency-name">{moneda.nombre}</p>
                    </div>
                  </div>

                  <div className="card-body">
                    {cotizacion ? (
                      <>
                        <div className="exchange-rates">
                          <div className="rate-item">
                            <span className="rate-label">Compra:</span>
                            <span className="rate-value">
                              ${typeof cotizacion.compra === 'number' ? 
                                cotizacion.compra.toFixed(2) : 'N/A'}
                            </span>
                          </div>
                          <div className="rate-item">
                            <span className="rate-label">Venta:</span>
                            <span className="rate-value">
                              ${typeof cotizacion.venta === 'number' ? 
                                cotizacion.venta.toFixed(2) : 'N/A'}
                            </span>
                          </div>
                        </div>

                        <div className="conversion-result">
                          <div className="result-label">Conversión:</div>
                          <div className="result-amount">
                            {cantidadARS && cantidadConvertida > 0 ? (
                              <>
                                <span className="converted-amount">
                                  {cantidadConvertida.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </span>
                                <span className="currency-code-small">{moneda.codigo}</span>
                              </>
                            ) : (
                              <span className="placeholder-text">Ingresa cantidad ARS</span>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="loading-state">
                        {loading ? (
                          <div className="loading-spinner">Cargando...</div>
                        ) : (
                          <div className="error-state">No disponible</div>
                        )}
                      </div>
                    )}
                  </div>

                  {cotizacion?.fechaActualizacion && (
                    <div className="card-footer">
                      <small className="last-update">
                        Actualizado: {new Date(cotizacion.fechaActualizacion).toLocaleString()}
                      </small>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
      </section>
    </main>
  );
}

export default Conversiones;