import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PERMISOS_PATH = path.join(process.cwd(), "data", "permisos.json");

function leer() {
  try {
    const raw = fs.readFileSync(PERMISOS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { admins: ["rygcontenidos"], sinRespuestas: [] };
  }
}

function guardar(data: object) {
  fs.writeFileSync(PERMISOS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(leer());
}

export async function POST(req: Request) {
  const body = await req.json();
  const actual = leer();

  if (body.toggle) {
    const idx = actual.sinRespuestas.indexOf(body.toggle);
    if (idx >= 0) {
      actual.sinRespuestas.splice(idx, 1);
    } else {
      actual.sinRespuestas.push(body.toggle);
    }
  }

  if (body.admins) actual.admins = body.admins;

  guardar(actual);
  return NextResponse.json(actual);
}
