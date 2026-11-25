// Garde une copie du Guide pratique réseau pour l'ouvrir sans connexion.
const CACHE="guide-reseau-v2";
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","./index.html","./Annexe-01-Charte-information-promotionnelle.pdf","./Annexe-02-Regles-de-deontologie.pdf","./Annexe-03-Formulaire-pharmacovigilance.pdf","./Annexe-04-Reclamation-qualite-produits.pdf","./Annexe-05-Demande-information-medicale.pdf","./Annexe-06-Politique-qualite.pdf","./Annexe-07-Visite-a-distance-telephone-Teams.pdf","./Annexe-08-Chevalet-etudiants.pdf","./Annexe-09-Demande-intervention-MSL.pdf","./Annexe-10-Retour-elements-destruction-tracee.pdf"])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
// Réseau d'abord (pour avoir toujours la dernière version), copie locale si pas de réseau.
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html"))));
});
