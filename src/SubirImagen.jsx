import { useState } from "react";

function SubirImagen() {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar que sea imagen
    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen (jpg, png, gif, etc.)");
      setImageSrc(null);
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    reader.readAsDataURL(file); // Convierte a base64 para mostrar en <img>
  };

  return (
    <div>
      <h2>Subir Imagen</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageSrc && <img src={imageSrc} alt="preview" width="300" />}
    </div>
  );
}

export default SubirImagen;
