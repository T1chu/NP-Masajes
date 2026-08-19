// ===== NP MASAJES - admin.js =====
// Panel simple para que Noelia edite los precios. Pensado para uso local /
// de confianza: la validación de usuario y contraseña se hace en el
// navegador, no es un sistema de seguridad robusto para publicar en internet.

const USUARIO_ADMIN = "Noelia";
const CLAVE_ADMIN = "Narita123";

const PRECIOS_DEFAULT = {
  holistico: 15000,
  descontracturante: 16000,
  relajante: 14000,
  circulatorio: 18000,
  exfoliacion: 12000,
};

const SERVICIOS = [
  { clave: "holistico", nombre: "Holístico" },
  { clave: "descontracturante", nombre: "Descontracturante" },
  { clave: "relajante", nombre: "Relajante" },
  { clave: "circulatorio", nombre: "Circulatorio y drenaje linfático manual" },
  { clave: "exfoliacion", nombre: "Exfoliación", nota: "Próximamente" },
];

const pantallaLogin = document.getElementById("pantalla-login");
const panelPrecios = document.getElementById("panel-precios");
const formLogin = document.getElementById("form-login");
const errorMsg = document.getElementById("error-msg");
const listaPrecios = document.getElementById("lista-precios");
const btnGuardar = document.getElementById("btn-guardar");
const btnLogout = document.getElementById("btn-logout");
const guardarMsg = document.getElementById("guardar-msg");

function obtenerPrecios() {
  try {
    const guardados = localStorage.getItem("npMasajesPrecios");
    if (guardados) return { ...PRECIOS_DEFAULT, ...JSON.parse(guardados) };
  } catch (e) {
    console.warn("No se pudieron leer los precios guardados.", e);
  }
  return { ...PRECIOS_DEFAULT };
}

function renderizarLista() {
  const precios = obtenerPrecios();
  listaPrecios.innerHTML = "";
  SERVICIOS.forEach((servicio) => {
    const fila = document.createElement("div");
    fila.className = "precio-fila";
    fila.innerHTML = `
      <div class="nombre">${servicio.nombre}${servicio.nota ? `<small>${servicio.nota}</small>` : ""}</div>
      <div class="input-precio">
        <span>$</span>
        <input type="number" min="0" step="500" data-clave="${servicio.clave}" value="${precios[servicio.clave]}" />
      </div>
    `;
    listaPrecios.appendChild(fila);
  });
}

function mostrarPanel() {
  pantallaLogin.style.display = "none";
  panelPrecios.style.display = "block";
  renderizarLista();
}

function mostrarLogin() {
  panelPrecios.style.display = "none";
  pantallaLogin.style.display = "flex";
}

// Login
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value;

  if (usuario === USUARIO_ADMIN && clave === CLAVE_ADMIN) {
    errorMsg.style.display = "none";
    sessionStorage.setItem("npMasajesAdminSesion", "activa");
    mostrarPanel();
  } else {
    errorMsg.style.display = "block";
  }
});

// Guardar precios
btnGuardar.addEventListener("click", () => {
  const precios = {};
  listaPrecios.querySelectorAll("input[data-clave]").forEach((input) => {
    precios[input.getAttribute("data-clave")] = Number(input.value) || 0;
  });
  localStorage.setItem("npMasajesPrecios", JSON.stringify(precios));
  guardarMsg.style.display = "block";
  setTimeout(() => (guardarMsg.style.display = "none"), 2500);
});

// Logout
btnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("npMasajesAdminSesion");
  mostrarLogin();
});

// Si ya había una sesión activa (misma pestaña/navegador), saltea el login
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("npMasajesAdminSesion") === "activa") {
    mostrarPanel();
  }
});
