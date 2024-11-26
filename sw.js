//service worker
const VERSION = "v1";
const CACHE_NAME = `pwa-${VERSION}`;
const APP_STATIC_RESOURCES = [
	"/",
	"/index.html",
	"/app.js",
	"/icon-512x512.png",
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

// On fetch, intercept server requests
// and respond with cached responses instead of going to network
self.addEventListener("fetch", (event) => {
	// As a single page app, direct app to always go to cached home page.
	if (event.request.mode === "navigate") {
		event.respondWith(caches.match("/"));
		return;
	}

	// For all other requests, go to the cache first, and then the network.
	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			const cachedResponse = await cache.match(event.request.url);
			if (cachedResponse) {
				// Return the cached response if it's available.
				return cachedResponse;
			}
			// If resource isn't in the cache, return a 404.
			return new Response(null, { status: 404 });
		})()
	);
});
// End of snippet
