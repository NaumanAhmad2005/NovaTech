import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "demo_db.json");

interface DemoDB {
  requests: any[];
  projects: any[];
}

function getDB(): DemoDB {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading demo db", e);
  }
  return { requests: [], projects: [] };
}

function saveDB(data: DemoDB) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error saving demo db", e);
  }
}

export function addDemoRequest(request: any) {
  const db = getDB();
  db.requests.unshift({ ...request, id: "req_" + Date.now().toString(), created_at: new Date().toISOString() });
  saveDB(db);
}

export function getDemoRequests() {
  return getDB().requests;
}

export function updateDemoRequest(id: string, updates: any) {
  const db = getDB();
  const index = db.requests.findIndex(r => r.id === id);
  if (index !== -1) {
    db.requests[index] = { ...db.requests[index], ...updates };
    saveDB(db);
  }
  return db.requests[index];
}

export function addDemoProject(project: any) {
  const db = getDB();
  db.projects = db.projects || [];
  db.projects.unshift({ ...project, id: "proj_" + Date.now().toString(), created_at: new Date().toISOString() });
  saveDB(db);
}

export function getDemoProjects() {
  const db = getDB();
  return db.projects || [];
}

export function updateDemoProject(id: string, updates: any) {
  const db = getDB();
  db.projects = db.projects || [];
  const index = db.projects.findIndex(r => r.id === id);
  if (index !== -1) {
    db.projects[index] = { ...db.projects[index], ...updates };
    saveDB(db);
  }
  return db.projects[index];
}
