const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/AudioGuide.html",
  "/audiosPage.html",
  "/audiosPageStyle.css",
  "/Campus_Image.JPG",
  "/China.jpg",
  "/Dundee.jpg",
  "/dundeeDock.jpg",
  "/dundeeStreet.jpg",
  "/DundeeUncovered.html",
  "/Form.html",
  "/GreggsGreatGander.html",
  "/JedsQMBGuide.html",
  "/JuteMill.jpg",
  "/Logo.png",
  "/Logo192.png",
  "/Our Mission.jpg",
  "/OurMission.html",
  "/Play.html",
  "/river-tay.jpg",
  "/Sarà perché ti amo.mp3",
  "/Statue.jpg",
  "/theTayTales.html",
  "/Ti amo.jpg",
  "/TraysTrodd.html"
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
