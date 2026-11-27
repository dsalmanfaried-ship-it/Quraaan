const V="tilawa-v3",CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;const u=new URL(q.url);if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com$/.test(u.host))return;
 if(q.mode==="navigate"){e.respondWith(fetch(q).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));return}
 e.respondWith(caches.match(q).then(h=>h||fetch(q).then(r=>{if(r&&(r.ok||r.type==="opaque")){const c=r.clone();caches.open(V).then(x=>x.put(q,c))}return r})))});
