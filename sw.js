const C='snk-v2',A=['./','index.html','manifest.webmanifest','assets/css/style.css','assets/js/app.js','firebase/config.js','firebase/data.js','assets/icons/icon.svg','assets/icons/icon-192.png','assets/icons/icon-512.png'];
addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>skipWaiting())));
addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET'||u.origin!=location.origin)return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
