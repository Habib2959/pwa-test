//service worker
const VERSION = "v6";
const CACHE_NAME = `pwa-${VERSION}`;
const APP_STATIC_RESOURCES = [
	"/pwa-test/",
	"/pwa-test/index.html",
	"/pwa-test/app.js",
	"/pwa-test/icon-512x512.png",
];
// cache static resources
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(APP_STATIC_RESOURCES);
		})
	);
});
// delete old caches on activate
self.addEventListener("activate", (event) => {
	event.waitUntil(
		(async () => {
			const names = await caches.keys();
			await Promise.all(
				names.map((name) => {
					if (name !== CACHE_NAME) {
						return caches.delete(name);
					}
				})
			);
			await clients.claim();
		})()
	);
});

// End of snippet
