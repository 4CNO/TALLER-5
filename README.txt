═══════════════════════════════════════════════════════
  TALLER 5 — Despliegue Microservicios con Jenkins + Docker
  API REST: División Política (ExpressJS + MongoDB)
═══════════════════════════════════════════════════════

REQUISITOS
──────────
  - Docker Desktop instalado y en ejecución
  - Node.js 20+ (solo para desarrollo local)
  - Jenkins 2.x con permisos para ejecutar Docker
  - Git instalado en la máquina Jenkins

PUERTOS
───────
  API:     http://localhost:8080  (host) → 3030 (contenedor)
  MongoDB: localhost:27018        (host) → 27017 (contenedor)
  Jenkins: http://localhost:9090  (por defecto)

VARIABLES DE ENTORNO
────────────────────
  PORT      = 3030   (puerto interno del contenedor)
  MONGO_URI = mongodb://dockerbddivisionpolitica:27017/divisionpolitica

══════════════════════════════════════════════════════
  OPCIÓN A — Docker Compose (desarrollo local rápido)
══════════════════════════════════════════════════════

  1. Levantar todo:
       docker compose up --build -d

  2. Poblar la base de datos:
       docker cp iniciarbddivisionpolitica.js dockerbddivisionpolitica:/seed.js
       docker exec dockerbddivisionpolitica mongosh localhost:27017 /seed.js

  3. Validar:
       curl http://localhost:8080/paises
       Abrir http://localhost:8080  (interfaz gráfica)

  4. Detener:
       docker compose down

══════════════════════════════════════════════════════
  OPCIÓN B — Comandos manuales (igual que Taller 4)
══════════════════════════════════════════════════════

  # 1. Red Docker
  docker network create reddivisionpolitica

  # 2. Contenedor MongoDB
  docker run --name dockerbddivisionpolitica \
    --network reddivisionpolitica \
    -p 27018:27017 -d mongo:latest

  # 3. Poblar BD
  docker cp iniciarbddivisionpolitica.js dockerbddivisionpolitica:/seed.js
  docker exec dockerbddivisionpolitica mongosh localhost:27017 /seed.js

  # 4. Build imagen API
  docker build -t apidivisionpolitica:latest .

  # 5. Contenedor API
  docker container run \
    --network reddivisionpolitica \
    --name dockerapidivisionpolitica \
    -p 8080:3030 -d apidivisionpolitica:latest

  # 6. Verificar
  docker ps
  curl http://localhost:8080/paises

══════════════════════════════════════════════════════
  OPCIÓN C — Pipeline Jenkins (Taller 5)
══════════════════════════════════════════════════════

  CONFIGURACIÓN PREVIA EN JENKINS
  ─────────────────────────────────
  1. Administrar Jenkins → Tools → Git installations
     Name: Default  |  Path: C:\Program Files\Git\bin\git.exe

  2. Administrar Jenkins → System → Línea de comandos
     Shell: C:\Program Files\Git\bin\bash.exe

  3. Administrar Jenkins → Credentials → System → Global → Add Credentials
     Kind: SSH Username with private key  |  ID: 100  |  Username: <tu_usuario_github>

  CREAR PIPELINE
  ──────────────
  1. Nueva Tarea → nombre: "Pipeline API DivisionPolitica" → tipo: Pipeline → OK
  2. En la sección Pipeline:
     Definition: Pipeline script from SCM  -O-  Pipeline script (pegar Jenkinsfile)
  3. Pegar el contenido de Jenkinsfile
  4. Guardar → Construir ahora

  TRIGGER AUTOMÁTICO (SCM Polling)
  ─────────────────────────────────
  Configure → Build Triggers → ✓ Consultar repositorio (SCM)
  Dejar el campo Programador vacío (se dispara por post-commit hook)

  PREREQUISITO: El contenedor de MongoDB debe estar corriendo antes
  de que el pipeline despliegue la API.

ENDPOINTS
─────────
  GET    http://localhost:8080/          → Interfaz gráfica
  GET    http://localhost:8080/api       → Health check JSON
  GET    http://localhost:8080/paises    → Listar todos
  GET    http://localhost:8080/paises/1  → Obtener por ID
  POST   http://localhost:8080/paises    → Crear  { id, nombre, continente, codigoAlfa2 }
  PUT    http://localhost:8080/paises/1  → Actualizar
  DELETE http://localhost:8080/paises/1  → Eliminar

ERRORES COMUNES
───────────────
  - Docker no tiene permisos en Jenkins:
      Agregar usuario jenkins al grupo docker: sudo usermod -aG docker jenkins

  - Red reddivisionpolitica no existe:
      docker network create reddivisionpolitica
      (El Jenkinsfile la crea automáticamente si no existe)

  - Credenciales GitHub incorrectas (ID 100):
      Verificar en Jenkins → Credentials → ID coincide con credentialsId en Jenkinsfile

  - MongoDB no responde:
      docker logs dockerbddivisionpolitica
      Verificar que el contenedor está en la red reddivisionpolitica
