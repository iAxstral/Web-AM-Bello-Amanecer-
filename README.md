# Hogar Bello Amanecer

Proyecto reorganizado por capas:

- `frontend/`: aplicacion principal en React + Vite
- `backend/`: API en Node + Express para registrar contactos
- `legacy/`: material anterior preservado como referencia

## Estructura

```text
HogarBelloAmanecer/
|- frontend/
|- backend/
|- legacy/
|- README.md
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm run dev
```

El formulario del sitio envia solicitudes a `POST /api/leads` y las guarda en `backend/data/leads.json`.
