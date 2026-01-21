import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD-QOvro2aOC8GpPfnQWkBxZCWIR3lypdI",
  authDomain: "cheromarket.firebaseapp.com",
  projectId: "cheromarket",
  storageBucket: "cheromarket.firebasestorage.app",
  messagingSenderId: "777368646513",
  appId: "1:777368646513:web:42b49dad96c2dcf76b7cd0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Abrir / cerrar modal
window.abrirVender = () => {
  document.getElementById('modal-vender').style.display = 'block';
};

window.cerrarVender = () => {
  document.getElementById('modal-vender').style.display = 'none';
};

// Publicar producto
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('btn-subir').onclick = async () => {
    const tit = titulo.value;
    const pre = precio.value;
    const dep = depto.value;
    const des = desc.value;

    if (!tit || !pre) {
      alert("Falta el nombre o el precio");
      return;
    }

    await addDoc(collection(db, "productos"), {
      titulo: tit,
      precio: pre,
      departamento: dep,
      descripcion: des,
      fecha: new Date()
    });

    cerrarVender();
    location.reload();
  };

  cargarProductos();
});

// Cargar productos
async function cargarProductos() {
  const q = query(collection(db, "productos"), orderBy("fecha", "desc"));
  const snapshot = await getDocs(q);
  const feed = document.getElementById('main-feed');
  feed.innerHTML = "";

  if (snapshot.empty) {
    feed.innerHTML = "<p style='grid-column: span 2; text-align:center;'>Aún no hay ventas</p>";
    return;
  }

  snapshot.forEach(doc => {
    const p = doc.data();
    feed.innerHTML += `
      <div class="tarjeta">
        <div class="foto-placeholder">🛒</div>
        <div class="info">
          <p class="precio">$${p.precio}</p>
          <p class="titulo">${p.titulo}</p>
          <p class="lugar">📍 ${p.departamento}</p>
        </div>
      </div>`;
  });
}
