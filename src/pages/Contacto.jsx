import { useState } from "react";
import { send } from "@emailjs/browser";

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

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

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Faltan variables de entorno de EmailJS");
      }

      await send(
        serviceId,
        templateId,
        { from_name: form.nombre, from_email: form.email, message: form.mensaje },
        { publicKey }
      );
      setSent(true);
      setForm({ nombre: "", email: "", mensaje: "" });
    } catch {
      setSendError("No se pudo enviar el correo. Intente nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="content">
      <section className="section">
        <h2 className="section-title">Contacto</h2>
        <p className="section-desc">Completá el formulario y te responderé a la brevedad.</p>
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

        {sent && (
          <div className="modal-backdrop" onClick={() => setSent(false)}>
            <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <h3>¡Mensaje enviado!</h3>
              <p>Gracias por contactarte. Te responderé pronto.</p>
              <div className="form-actions">
                <button className="btn" onClick={() => setSent(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Contacto;
