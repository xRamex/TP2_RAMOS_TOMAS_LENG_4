import { useState, useEffect } from "react";
import { send } from "@emailjs/browser";
import "./Contacto.css";

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  // Ocultar automáticamente el aviso de éxito luego de unos segundos
  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => setSent(false), 4000);
    return () => clearTimeout(t);
  }, [sent]);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.mensaje.trim()) e.mensaje = "El mensaje es obligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setSendError("");
    if (!validate()) return;
    setSending(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  // Si la plantilla tiene destinatario fijo, este valor es opcional
  const to = import.meta.env.VITE_EMAILJS_TO || import.meta.env.VITE_EMAILJS_TO_EMAIL;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Faltan variables de entorno de EmailJS");
      }

      const params = {
        from_name: form.nombre,
        from_email: form.email,
        message: form.mensaje,
        reply_to: form.email,
      };
      if (to) {
        params.to = to;
      }

      // Enviar con opciones (EmailJS v4)
      await send(serviceId, templateId, params, { publicKey });
      setSent(true);
      setForm({ nombre: "", email: "", mensaje: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError(err?.text || err?.message || "No se pudo enviar el correo. Intente nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="content">
      <section className="section">
        <h2 className="section-title">Contacto</h2>
        <p className="section-desc">Completá el formulario y te responderé a la brevedad.</p>
        
        <div className="contacto-container">
          <div className="form-container">
            <form className="card form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={onChange}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <span className="field-error">{errors.nombre}</span>}
              </div>

              <div className="form-row">
                <label htmlFor="email">Dirección de Correo</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="tu@correo.com"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-row">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={form.mensaje}
                  onChange={onChange}
                  placeholder="Escribí tu mensaje"
                />
                {errors.mensaje && <span className="field-error">{errors.mensaje}</span>}
              </div>

              {sendError && <div className="error-text" role="alert">{sendError}</div>}

              <div className="form-actions">
                <button className="btn" type="submit" disabled={sending}>
                  {sending ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>

          <div className="map-container">
            <div className="card">
              <h3 className="map-title">Nuestra Ubicación</h3>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14494.217898311139!2d-65.39258725!3d-24.74217125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc14f9aaaaaab%3A0x69dac60239564277!2sUniversidad%20Cat%C3%B3lica%20de%20Salta!5e0!3m2!1ses-419!2sar!4v1758828849498!5m2!1ses-419!2sar"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del hotel"
                ></iframe>
              </div>
              <div className="location-info">
                <h4>Hotel UCASAL</h4>
                <p>Campus Castañares, A4400 Salta, Argentina</p>
                <p>Teléfono: +54 387 123 4567</p>
                <p>Email: info@hotelucasal.com</p>
              </div>
            </div>
          </div>
        </div>

        {sent && (
          <div className="toast toast-success" role="status" aria-live="polite">
            <div className="toast-content">
              <strong>¡Mensaje enviado!</strong>
              <span>Gracias por contactarte. Te responderé pronto.</span>
            </div>
            <button
              className="toast-close"
              aria-label="Cerrar notificación"
              onClick={() => setSent(false)}
              title="Cerrar"
            >
              ×
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Contacto;
