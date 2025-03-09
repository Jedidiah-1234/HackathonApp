const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/HackathonApp/AudioGuide.html",
  "/HackathonApp/audiosPage.html",
  "/HackathonApp/audiosPageStyle.css",
  "/HackathonApp/Campus_Image.JPG",
  "/HackathonApp/China.jpg",
  "/HackathonApp/Dundee.jpg",
  "/HackathonApp/dundeeDock.jpg",
  "/HackathonApp/dundeeStreet.jpg",
  "/HackathonApp/DundeeUncovered.html",
  "/HackathonApp/Form.html",
  "/HackathonApp/GreggsGreatGander.html",
  "/HackathonApp/JedsQMBGuide.html",
  "/HackathonApp/JuteMill.jpg",
  "/HackathonApp/Logo.png",
  "/HackathonApp/Logo192.png",
  "/HackathonApp/Our Mission.jpg",
  "/HackathonApp/OurMission.html",
  "/HackathonApp/Play.html",
  "/HackathonApp/river-tay.jpg",
  "/HackathonApp/Sarà perché ti amo.mp3",
  "/HackathonApp/Statue.jpg",
  "/HackathonApp/theTayTales.html",
  "/HackathonApp/Ti amo.jpg",
  "/HackathonApp/TraysTrodd.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) => {
          return fetch(url).then((response) => {
            if (response.ok) {
              console.log(`Caching: ${url}`);
              return cache.put(url, response);
            } else {
              console.error(`Failed to fetch: ${url}`);
              return Promise.reject(`Failed to cache: ${url}`);
            }
          });
        })
      ).catch((error) => {
        console.error("Error during service worker installation:", error);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
