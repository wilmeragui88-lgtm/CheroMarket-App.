// 1. Nombre del cache (Cámbialo si haces cambios grandes en la web)
const CACHE_NAME = "cheromarket-cache-v1";

// 2. Archivos críticos para uso offline e instalación
// Es vital incluir el manifest y los iconos para que aparezcan al instalar
const assetsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./styles.css",     // Asegúrate de que el nombre coincida
  "./script.js",     // Asegúrate de que el nombre coincida
  "./icon-192.png",   // Requerido para el icono de Android/Chrome
  "./icon-512.png"    // Requerido para el banner de instalación
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  // Fuerza al SW a activarse sin esperar a que se cierre la pestaña
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("CheroMarket: Cacheando archivos críticos...");
      return cache.addAll(assetsToCache);
    })
  );
});

// Limpieza de caches antiguos (Vital para que tus clientes vean actualizaciones)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Responder desde el cache o ir a internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el archivo está en cache, lo devuelve; si no, lo busca en internet
      return response || fetch(event.request);
    })
  );
});
