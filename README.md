# Sample React – Server Run Guide (Frontend Only)

This document describes how to run the **React frontend** on an Ubuntu server using **nohup** or **PM2**.

---

## Prerequisites

- Node.js (LTS) installed  
- npm installed  
- Git installed  

Verify:
```bash
node -v
npm -v
git --version
```

---

## Run Using `nohup`

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/test-frontend.git
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
export REACT_APP_API_URL=http://localhost:8080
nohup npm run build >> frontend.log 2>&1 &
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
git clone https://github.com/<your-username>/test-frontend.git
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
  --env REACT_APP_API_URL=http://localhost:8080 \
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

## Notes

- `npm start` runs React in **development mode**
- For production, prefer:
  ```bash
  npm run build
  ```
  and serve via **Nginx**
- Environment variables must be set **before** starting React

---

End of document.
