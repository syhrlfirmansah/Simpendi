const CACHE_NAME = 'simpendi-v1';
const assetsToCache = [
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate & Clean Old Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy: Cache with Network Fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request).catch(() => {
          // Fallback if offline
        });
      })
  );
});

window.prosesLogin = async function() {
      const email = document.getElementById("emailLogin").value;
      const pass = document.getElementById("passwordLogin").value;
      const btn = document.getElementById("btnLogin");
      
      btn.disabled = true;
      btn.innerText = "Memproses...";
      
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        showToast("Berhasil masuk!", "success");
      } catch(err) {
        console.error("Error detail:", err.code, err.message);
        // Menampilkan pesan error asli dari Firebase ke layar
        document.getElementById("pesanLogin").innerText = `Gagal: ${err.code}`;
        showToast(`Error: ${err.message}`, "error");
        btn.disabled = false;
        btn.innerText = "Masuk";
      }
    }
