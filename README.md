# Sample React – Server Run Guide (Frontend Only)

This document describes how to run the **React frontend** on an Ubuntu server using **nohup**, **PM2**, **Docker**, or **Docker Compose**.

---

## Prerequisites

- Node.js (LTS) installed  
- npm installed  
- Git installed  
- Docker installed  

Verify:
```bash
node -v
npm -v
git --version
docker --version
```

---

## Run Using `nohup`

### 1. Clone Repository

```bash
git clone https://github.com/meetgori-techanek/test-frontend.git
cd test-frontend
```

---

### 2. Stop Existing Frontend (If Any)

```bash
pkill -f react-scripts || true
```

Verify port is free:
```bash
lsof -i :3000
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start Frontend Using `nohup`

```bash
export REACT_APP_API_URL=http://<SERVER_PUBLIC_IP>:8080
nohup npm start >> frontend.log 2>&1 &
```

---

### 5. Verify Frontend

```bash
lsof -i :3000
```

Open in browser:
```
http://<SERVER_PUBLIC_IP>:3000
```

---

### 6. View Logs

```bash
tail -f frontend.log
```

---

### 7. Stop Frontend

```bash
pkill -f react-scripts
```

---

## Run Using PM2

### 1. Install PM2

```bash
sudo npm install -g pm2
```

Verify:
```bash
pm2 -v
```

---

### 2. Clone Repository

```bash
git clone https://github.com/meetgori-techanek/test-frontend.git
cd test-frontend
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Run Frontend Using PM2

```bash
pm2 start npm \
  --name react-sample-frontend-app \
  --cwd "$(pwd)" \
  --env REACT_APP_API_URL=http://<SERVER_PUBLIC_IP>:8080 \
  -- start
```

---

### 5. Verify Status

```bash
pm2 list
```

Verify port:
```bash
lsof -i :3000
```

---

### 6. View Logs

```bash
pm2 logs react-sample-frontend-app
```

---

### 7. Stop or Remove Frontend

Stop:
```bash
pm2 stop react-sample-frontend-app
```

Remove:
```bash
pm2 delete react-sample-frontend-app
```

---

## Run Using Docker

### 1. Clone Repository

```bash
git clone https://github.com/meetgori-techanek/test-frontend.git
cd test-frontend
```

---

### 2. Build Docker Image

```bash
docker build \
  --build-arg REACT_APP_API_URL=http://<SERVER_PUBLIC_IP>:8080 \
  -t meetgori1/react-sample-frontend-app:latest \
  .
```

---

### 3. Stop Existing Container (If Any)

```bash
docker rm -f react-sample-frontend-app || true
```

---

### 4. Run Frontend Container

```bash
docker run -d \
  --name react-sample-frontend-app \
  -p 3000:80 \
  meetgori1/react-sample-frontend-app:latest
```

---

### 5. Verify Frontend

```bash
docker ps | grep react-sample-frontend-app
```

Open in browser:
```
http://<SERVER_PUBLIC_IP>:3000
```

---

### 6. View Logs

```bash
docker logs react-sample-frontend-app
```

---

### 7. Stop & Remove Container

```bash
docker stop react-sample-frontend-app
docker rm react-sample-frontend-app
```

---

## Docker Login & Push Image to Docker Hub

### 1. Login to Docker Hub

```bash
docker login -u meetgori1
```

Enter your Docker Hub password or access token when prompted.

Verify login:
```bash
docker info | grep Username
```

---

### 2. (Optional) Tag Image with Version

```bash
docker tag meetgori1/react-sample-frontend-app:latest \
  meetgori1/react-sample-frontend-app:v1.0.0
```

---

### 3. Push Image to Docker Hub

Push `latest`:
```bash
docker push meetgori1/react-sample-frontend-app:latest
```

Push versioned tag:
```bash
docker push meetgori1/react-sample-frontend-app:v1.0.0
```

---

### 4. Pull Image on Another Server (Validation)

```bash
docker pull meetgori1/react-sample-frontend-app:latest
```

---

## Run Using Docker Compose

### 1. Create `docker-compose.yml`

```yaml
version: "3.9"

services:
  frontend:
    image: meetgori1/react-sample-frontend-app:latest
    container_name: react-sample-frontend-app
    ports:
      - "3000:80"
```

---

### 2. Start Frontend Using Docker Compose

```bash
docker compose up -d
```

---

### 3. Verify Status

```bash
docker compose ps
```

Open in browser:
```
http://<SERVER_PUBLIC_IP>:3000
```

---

### 4. View Logs

```bash
docker compose logs -f frontend
```

---

### 5. Stop & Remove Containers

```bash
docker compose down
```

---

## Notes

- `npm start` runs React in **development mode**
- Docker uses **production build served by Nginx**
- `REACT_APP_API_URL` must be provided **before build/start**
- Same codebase supports:
  - manual run
  - PM2
  - Docker
  - Docker Compose
- Docker Hub images can be reused across environments

---

End of document.
