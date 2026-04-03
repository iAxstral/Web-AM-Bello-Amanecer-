import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
const dataFile = path.join(__dirname, "data", "leads.json");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  })
);
app.use(express.json());

async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

async function readLeads() {
  await ensureDataFile();
  const content = await fs.readFile(dataFile, "utf8");
  return JSON.parse(content);
}

async function saveLead(lead) {
  const leads = await readLeads();
  leads.push(lead);
  await fs.writeFile(dataFile, JSON.stringify(leads, null, 2), "utf8");
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/leads", async (_request, response) => {
  try {
    const leads = await readLeads();
    response.json(leads);
  } catch (error) {
    response.status(500).json({
      message: "No fue posible consultar los registros.",
      detail: error.message
    });
  }
});

app.post("/api/leads", async (request, response) => {
  const { nombre, telefono, email, servicioInteres, mensaje } = request.body;
  if (!nombre || !telefono || !email || !servicioInteres || !mensaje) {
    return response.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  const lead = {
    id: randomUUID(),
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    email: email.trim().toLowerCase(),
    servicioInteres: servicioInteres.trim(),
    mensaje: mensaje.trim(),
    createdAt: new Date().toISOString()
  };

  try {
    await saveLead(lead);
    return response.status(201).json({
      message: "Solicitud registrada con exito.",
      lead
    });
  } catch (error) {
    return response.status(500).json({
      message: "No fue posible guardar la solicitud.",
      detail: error.message
    });
  }
});

ensureDataFile()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend disponible en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo iniciar el backend:", error);
  });
