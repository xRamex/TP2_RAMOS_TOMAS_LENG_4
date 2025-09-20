// SubirImagen: componente de subida con drag & drop
// - Valida que el archivo sea una imagen
// - Muestra vista previa DENTRO del recuadro
// - Permite cambiar o quitar la imagen
import { useState, useRef, useCallback } from "react";


function SubirImagen() {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  /**
   * Lee y valida el archivo recibido. Si es una imagen, actualiza `imageSrc` con base64.
   * @param {File | undefined} file
   */
  const processFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen (jpg, png, gif, etc.)");
      setImageSrc(null);
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  /** Maneja el cambio del input de archivos. */
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  /** Maneja el drop de archivos en la zona. */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  /** Resalta la zona cuando se arrastra un archivo por encima. */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  /** Quita el resaltado cuando el archivo sale de la zona. */
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /** Limpia la imagen y resetea el input. */
  const clearImage = () => {
    setImageSrc(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="uploader">
      <div
        className={`dropzone ${isDragging ? "dragging" : ""} ${imageSrc ? "has-image" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
        {imageSrc ? (
          <div className="preview-inline" role="figure" aria-label="Vista previa de la imagen">
            <img src={imageSrc} alt="Vista previa" className="preview-img" />
            <div className="preview-actions">
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                Cambiar imagen
              </button>
              <button
                className="btn btn-ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
              >
                Quitar
              </button>
            </div>
          </div>
        ) : (
          <div className="dropzone-content">
            <div className="dropzone-icon" aria-hidden>🖼️</div>
            <p className="dropzone-title">Arrastrá una imagen aquí</p>
            <p className="dropzone-sub">o hacé clic para seleccionar</p>
          </div>
        )}
      </div>

      {error && <p className="error-text" role="alert">{error}</p>}
    </div>
  );
}

export default SubirImagen;
