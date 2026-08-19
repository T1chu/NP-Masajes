// ===== NP MASAJES - main.js =====
// Nota: la web pública no muestra precios (a pedido de Noelia). Los precios
// se manejan internamente desde /admin.html.

// ---- Menu mobile ----
function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("abierto");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("abierto"))
  );
}

// ---- Galeria ----
// Las primeras 6 fotos están escritas directamente en index.html (más
// confiable al abrir el archivo con doble clic: algunos navegadores
// bloquean imágenes cargadas dinámicamente por JavaScript en páginas
// file://). Esta función solo suma fotos NUEVAS que sigan la convención
// gallery-7.jpg, gallery-8.jpg, etc. Si no agregás ninguna, no hace nada.
function initGaleria() {
  const grid = document.querySelector(".galeria-grid");
  if (!grid) return;

  const DESDE = 7;
  const HASTA = 30;
  const extensiones = ["jpg", "jpeg", "png"];

  for (let i = DESDE; i <= HASTA; i++) {
    extensiones.forEach((ext) => {
      const img = new Image();
      img.src = `images/gallery-${i}.${ext}`;
      img.alt = "NP Masajes";
      img.loading = "lazy";
      img.onload = () => {
        const figure = document.createElement("figure");
        figure.appendChild(img);
        grid.appendChild(figure);
      };
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initGaleria();

  const anio = document.querySelector("#anio-actual");
  if (anio) anio.textContent = new Date().getFullYear();
});
