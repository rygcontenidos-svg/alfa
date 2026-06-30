"use client";

import type { FiguraDef } from "@/lib/tipos";

type EtiquetaFigura = { fila: number; col: number; texto: string; pos?: string };
type MedidaFigura = { lado: string; desde: number; hasta: number; texto: string };

function FlechaMedida({
  lado,
  desde,
  hasta,
  texto,
  filas,
  columnas,
  celda,
}: MedidaFigura & { filas: number; columnas: number; celda: number }) {
  const MARGEN = 32;
  const totalW = columnas * celda;
  const totalH = filas * celda;

  const isH = lado === "arriba" || lado === "abajo";
  const yBase = lado === "arriba" ? -MARGEN : totalH + MARGEN;
  const x1 = desde * celda + celda / 2;
  const x2 = hasta * celda + celda / 2;
  const yLinea = lado === "arriba" ? yBase + 16 : yBase - 16;

  return (
    <g>
      <line x1={x1} y1={lado === "arriba" ? 0 : totalH} x2={x1} y2={yLinea} stroke="#888" strokeWidth={1} />
      <line x1={x2} y1={lado === "arriba" ? 0 : totalH} x2={x2} y2={yLinea} stroke="#888" strokeWidth={1} />
      <line x1={x1} y1={yLinea} x2={x2} y2={yLinea} stroke="#888" strokeWidth={1} />
      {isH ? (
        <>
          <polygon points={`${x1},${yLinea - 4} ${x1 + 6},${yLinea} ${x1},${yLinea + 4}`} fill="#888" />
          <polygon points={`${x2},${yLinea - 4} ${x2 - 6},${yLinea} ${x2},${yLinea + 4}`} fill="#888" />
        </>
      ) : null}
      <text
        x={(x1 + x2) / 2}
        y={lado === "arriba" ? yLinea - 8 : yLinea + 14}
        textAnchor="middle"
        fill="#333"
        fontSize={11}
        fontWeight={600}
      >
        {texto}
      </text>
    </g>
  );
}

export default function FiguraMatematica({ def }: { def: FiguraDef }) {
  if (def.tipo !== "cuadricula") return null;

  const { grilla, celda = 28, etiquetas = [], medidas = [] } = def;
  const filas = grilla.length;
  const columnas = Math.max(...grilla.map((f) => f.length));
  const MARGEN = medidas.length > 0 ? 36 : 4;
  const W = columnas * celda + MARGEN * 2;
  const H = filas * celda + MARGEN * 2;

  return (
    <div className="my-3 flex justify-center">
      <svg
        viewBox={`${-MARGEN} ${-MARGEN} ${W} ${H}`}
        width={W}
        height={H}
        style={{ maxWidth: "100%", height: "auto" }}
      >
        {grilla.map((fila, fi) =>
          fila.map((color, ci) => {
            if (color === null) return null;
            return (
              <rect
                key={`${fi}-${ci}`}
                x={ci * celda}
                y={fi * celda}
                width={celda}
                height={celda}
                fill={color}
                stroke="#999"
                strokeWidth={1}
              />
            );
          })
        )}

        {etiquetas.map((e, i) => {
          const cx = e.col * celda + celda / 2;
          const cy = e.fila * celda + celda / 2;
          let dx = 0,
            dy = 0;
          let anchor: "start" | "middle" | "end" = "middle";
          switch (e.pos ?? "centro") {
            case "arriba":
              dy = -celda / 2 - 4;
              break;
            case "abajo":
              dy = celda / 2 + 12;
              break;
            case "izquierda":
              dx = -celda / 2 - 4;
              anchor = "end";
              break;
            case "derecha":
              dx = celda / 2 + 4;
              anchor = "start";
              break;
            default:
              break;
          }
          return (
            <text
              key={`e-${i}`}
              x={cx + dx}
              y={cy + dy + 4}
              textAnchor={anchor}
              fill="#333"
              fontSize={10}
              fontWeight={600}
            >
              {e.texto}
            </text>
          );
        })}

        {medidas.map((m, i) => (
          <FlechaMedida key={`m-${i}`} {...m} filas={filas} columnas={columnas} celda={celda} />
        ))}
      </svg>
    </div>
  );
}
