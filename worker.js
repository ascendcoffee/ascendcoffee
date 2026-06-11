const CACHE="ascend-v1";
const ASSETS=["./","./index.html","./manifest.json","https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.hostname.includes("supabase.co")||u.hostname.includes("googleapis.com")){e.respondWith(fetch(e.request));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(e.request.method==="GET"&&res.status===200){const cl=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cl))}return res}).catch(()=>caches.match("./index.html"))))
});
