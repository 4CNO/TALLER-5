// iniciarbddivisionpolitica.js
// Uso: mongosh localhost:27017 iniciarbddivisionpolitica.js

use("divisionpolitica");

db.paises.drop();

db.paises.insertMany([
  // América
  { id: 1,  nombre: "Colombia",       continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "CO", codigoAlfa3: "COL" },
  { id: 2,  nombre: "México",         continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "MX", codigoAlfa3: "MEX" },
  { id: 3,  nombre: "Argentina",      continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "AR", codigoAlfa3: "ARG" },
  { id: 4,  nombre: "Brasil",         continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "BR", codigoAlfa3: "BRA" },
  { id: 5,  nombre: "Chile",          continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "CL", codigoAlfa3: "CHL" },
  { id: 6,  nombre: "Perú",           continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "PE", codigoAlfa3: "PER" },
  { id: 7,  nombre: "Venezuela",      continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "VE", codigoAlfa3: "VEN" },
  { id: 8,  nombre: "Ecuador",        continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "EC", codigoAlfa3: "ECU" },
  { id: 9,  nombre: "Bolivia",        continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "BO", codigoAlfa3: "BOL" },
  { id: 10, nombre: "Paraguay",       continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "PY", codigoAlfa3: "PRY" },
  { id: 11, nombre: "Uruguay",        continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "UY", codigoAlfa3: "URY" },
  { id: 12, nombre: "Estados Unidos", continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "US", codigoAlfa3: "USA" },
  { id: 13, nombre: "Canadá",         continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "CA", codigoAlfa3: "CAN" },
  { id: 14, nombre: "Cuba",           continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "CU", codigoAlfa3: "CUB" },
  { id: 15, nombre: "Panamá",         continente: "América", tipoRegion: "ESTADO", codigoAlfa2: "PA", codigoAlfa3: "PAN" },
  // Europa
  { id: 16, nombre: "España",         continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "ES", codigoAlfa3: "ESP" },
  { id: 17, nombre: "Francia",        continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "FR", codigoAlfa3: "FRA" },
  { id: 18, nombre: "Alemania",       continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "DE", codigoAlfa3: "DEU" },
  { id: 19, nombre: "Italia",         continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "IT", codigoAlfa3: "ITA" },
  { id: 20, nombre: "Portugal",       continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "PT", codigoAlfa3: "PRT" },
  { id: 21, nombre: "Reino Unido",    continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "GB", codigoAlfa3: "GBR" },
  { id: 22, nombre: "Países Bajos",  continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "NL", codigoAlfa3: "NLD" },
  { id: 23, nombre: "Bélgica",       continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "BE", codigoAlfa3: "BEL" },
  { id: 24, nombre: "Suiza",          continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "CH", codigoAlfa3: "CHE" },
  { id: 25, nombre: "Suecia",         continente: "Europa",  tipoRegion: "ESTADO", codigoAlfa2: "SE", codigoAlfa3: "SWE" },
  // Asia
  { id: 26, nombre: "Japón",          continente: "Asia",    tipoRegion: "ESTADO", codigoAlfa2: "JP", codigoAlfa3: "JPN" },
  { id: 27, nombre: "China",          continente: "Asia",    tipoRegion: "ESTADO", codigoAlfa2: "CN", codigoAlfa3: "CHN" },
  { id: 28, nombre: "India",          continente: "Asia",    tipoRegion: "ESTADO", codigoAlfa2: "IN", codigoAlfa3: "IND" },
  { id: 29, nombre: "Corea del Sur",  continente: "Asia",    tipoRegion: "ESTADO", codigoAlfa2: "KR", codigoAlfa3: "KOR" },
  { id: 30, nombre: "Turquía",        continente: "Asia",    tipoRegion: "ESTADO", codigoAlfa2: "TR", codigoAlfa3: "TUR" },
  // África
  { id: 31, nombre: "Sudáfrica",      continente: "África",  tipoRegion: "ESTADO", codigoAlfa2: "ZA", codigoAlfa3: "ZAF" },
  { id: 32, nombre: "Nigeria",        continente: "África",  tipoRegion: "ESTADO", codigoAlfa2: "NG", codigoAlfa3: "NGA" },
  { id: 33, nombre: "Egipto",         continente: "África",  tipoRegion: "ESTADO", codigoAlfa2: "EG", codigoAlfa3: "EGY" },
  // Oceanía
  { id: 34, nombre: "Australia",      continente: "Oceanía", tipoRegion: "ESTADO", codigoAlfa2: "AU", codigoAlfa3: "AUS" },
  { id: 35, nombre: "Nueva Zelanda",  continente: "Oceanía", tipoRegion: "ESTADO", codigoAlfa2: "NZ", codigoAlfa3: "NZL" }
]);

print("✅ BD 'divisionpolitica' inicializada correctamente.");
print("📊 Total países: " + db.paises.countDocuments());
db.paises.find().sort({ id: 1 }).forEach(p => {
  print(`  [${String(p.id).padStart(2,'0')}] ${p.nombre} (${p.codigoAlfa2}) — ${p.continente}`);
});
