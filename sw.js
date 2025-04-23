/* sw.js dosyası */
// Service Worker kodu (sw.js)
self.addEventListener('install', event => {
    self.skipWaiting();
  });
  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });
  self.addEventListener('periodicsync', event => {
    if (event.tag === 'fetch-earthquakes') {
      event.waitUntil(fetchAndNotify());
    }
  });
  async function fetchAndNotify() {
    try {
      const res = await fetch('https://api.orhanaydogdu.com.tr/deprem/live.php?limit=5');
      const data = await res.json();
      if (data.result && data.result.length) {
        const latest = data.result[0];
        self.registration.showNotification('Yeni Deprem', {
          body: `${latest.title}, Magnitude: ${latest.mag}`,
          icon: 'https://cdn-icons-png.flaticon.com/512/189/189678.png'
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
  
