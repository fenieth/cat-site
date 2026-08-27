# Мур

Static landing page packaged with Nginx and Docker. No database, build step, or application secrets are required. Form data and reminders are stored only in the visitor's browser (`localStorage`).

## Launch on a server

Prerequisites: Git and Docker with Docker Compose v2.

```bash
git clone <YOUR_REPOSITORY_URL> mur
cd mur
docker compose up -d --build
```

Open `http://SERVER_IP:8080`. To serve directly on port 80:

```bash
PORT=80 docker compose up -d --build
```

Alternatively, make the setting persistent:

```bash
cp .env.example .env
# Edit PORT in .env, then start:
docker compose up -d --build
```

Make sure the selected port is allowed by the server firewall. For a public domain, put the container behind a TLS-enabled reverse proxy and forward traffic to `127.0.0.1:8080` (bind the port to localhost in `compose.yaml` if it should not be public).

## Operations

```bash
# Check status and container health
docker compose ps

# Follow logs
docker compose logs -f web

# Deploy the latest commit
git pull --ff-only
docker compose up -d --build

# Stop the site
docker compose down
```

The health endpoint is available at `/health` and is also used by Docker's container health check.

## Local preview without Docker

Because the site is static, it can also be previewed with any local web server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Project layout

- `index.html`, `styles.css`, `script.js` — the site
- `assets/` — images
- `Dockerfile` — production Nginx image
- `nginx.conf` — routing, compression, caching, and health endpoint
- `compose.yaml` — one-command server launch
# cat-site
