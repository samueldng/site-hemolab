"use client";

/**
 * Stylized SVG map of the central Maranhão region.
 * Positions based on real Google Maps geography.
 * Coordinate system: 0-100 percentages matching pin placement.
 *
 * Reference layout (north ↑):
 *   Pio XII ---- Satubinha --- C. do Lago Açu
 *     \                          |
 *   Lago Verde   Olho d'Água -- BACABAL ---- São Mateus
 *                   \                \--- Alto Alegre
 *                 Bom Lugar
 *                    |
 *                Lago da Pedra -- L. dos Rodrigues
 *                                      |
 *                               Esperantinópolis
 *                              /
 *                    Lagoa Grande
 *                         \
 *                      Barra do Corda
 */

type CityLabel = {
  x: number;
  y: number;
  name: string;
  isMain?: boolean;
  isOwned?: boolean;
  labelDx: number;
  labelDy: number;
  anchor: "start" | "middle" | "end";
};

const CITIES: CityLabel[] = [
  // ─── Hub principal ───
  { x: 50, y: 35, name: "Bacabal", isMain: true, labelDx: 0, labelDy: -3.5, anchor: "middle" },

  // ─── Norte ───
  { x: 47.8, y: 27.2, name: "C. do Lago Açu", labelDx: 1.8, labelDy: -1.2, anchor: "start" },

  // ─── Noroeste (Pio XII / Satubinha / Lago Verde) ───
  { x: 33.4, y: 29.8, name: "Pio XII", isOwned: false, labelDx: -1.8, labelDy: -1.5, anchor: "end" },
  { x: 34.5, y: 31.5, name: "Lago Verde", labelDx: -1.8, labelDy: 0.4, anchor: "end" },
  { x: 37.4, y: 31.7, name: "Satubinha", isOwned: true, labelDx: 0, labelDy: -2, anchor: "middle" },

  // ─── Leste ───
  { x: 68.9, y: 30.4, name: "São Mateus", labelDx: 1.8, labelDy: -1, anchor: "start" },
  { x: 68, y: 35.6, name: "Alto Alegre", labelDx: 1.8, labelDy: 0.4, anchor: "start" },

  // ─── Oeste-central ───
  { x: 41, y: 33, name: "Olho d'Água", labelDx: 0, labelDy: -2, anchor: "middle" },
  { x: 36, y: 38.9, name: "Bom Lugar", labelDx: -1.8, labelDy: 0.4, anchor: "end" },

  // ─── Centro-sul ───
  { x: 36.5, y: 45.1, name: "Lago da Pedra", labelDx: -1.8, labelDy: -1, anchor: "end" },
  { x: 47.3, y: 45.4, name: "L. dos Rodrigues", labelDx: 1.8, labelDy: -0.8, anchor: "start" },
  { x: 48.7, y: 52.6, name: "Esperantinópolis", labelDx: 1.8, labelDy: 0.4, anchor: "start" },

  // ─── Sul / Southwest ───
  { x: 24.8, y: 57.2, name: "Lagoa Grande", labelDx: -1.8, labelDy: 0.4, anchor: "end" },
  { x: 41.4, y: 70.8, name: "Barra do Corda", labelDx: 0, labelDy: 2.8, anchor: "middle" },
];

// ═══════════════════════════════════════════════════
// ROAD NETWORK — based on Google Maps reference
// ═══════════════════════════════════════════════════

// BR-135: NE → São Mateus → Bacabal → continues south
const BR135 = "M 78,25 L 68.9,30.4 L 50,35 L 48,42 L 46,50";

// BR-316: W → Pio XII → extends east
const BR316 = "M 22,28 L 33.4,29.8 L 42,32";

// MA-226 south corridor: Esperantinópolis area → Barra do Corda → exit south
const MA226 = "M 48.7,52.6 L 45,60 L 41.4,70.8 L 40,80";

// Secondary roads (from/to as [x1, y1, x2, y2])
const SECONDARY_ROADS: [number, number, number, number][] = [
  // Bacabal → Conceição do Lago Açu (north)
  [50, 35, 47.8, 27.2],
  // Bacabal → Olho d'Água (northwest)
  [50, 35, 41, 33],
  // Olho d'Água → Satubinha (northwest)
  [41, 33, 37.4, 31.7],
  // Satubinha → Pio XII (northwest)
  [37.4, 31.7, 33.4, 29.8],
  // Pio XII → Lago Verde (nearby, south)
  [33.4, 29.8, 34.5, 31.5],
  // Bacabal → Alto Alegre (east)
  [50, 35, 68, 35.6],
  // Olho d'Água → Bom Lugar (southwest) — key direction fix!
  [41, 33, 36, 38.9],
  // Bom Lugar → Lago da Pedra (south)
  [36, 38.9, 36.5, 45.1],
  // Lago da Pedra → Lago dos Rodrigues (east)
  [36.5, 45.1, 47.3, 45.4],
  // Lago dos Rodrigues → Esperantinópolis (south)
  [47.3, 45.4, 48.7, 52.6],
  // Esperantinópolis → Lagoa Grande (southwest)
  [48.7, 52.6, 24.8, 57.2],
  // Lagoa Grande → Barra do Corda (southeast)
  [24.8, 57.2, 41.4, 70.8],
];

// ─── Rio Mearim — north→south through Bacabal ───
const RIO_MEARIM =
  "M 46 15 C 47 20 48 24 49 27 C 49.5 29 50 32 50.5 35 " +
  "C 51 38 51.5 41 52 44 C 52.5 47 53 50 53.5 54 " +
  "C 54 57 54 60 53.5 65 C 53 68 52.5 72 52 78";

export default function MaranhaoRegionMap() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="map-terrain" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
          <circle cx="1.25" cy="1.25" r="0.12" fill="#004731" opacity="0.05" />
        </pattern>
      </defs>

      {/* ░░░ TERRAIN ░░░ */}
      <rect width="100" height="100" fill="url(#map-terrain)" />

      {/* ═══════════════════════════════════════════ */}
      {/* HIGHWAYS (thick, solid)                     */}
      {/* ═══════════════════════════════════════════ */}

      {/* BR-135: São Mateus → Bacabal → South */}
      <path d={BR135} fill="none" stroke="#004731" strokeWidth="0.35" strokeOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* BR-316: West → Pio XII → East */}
      <path d={BR316} fill="none" stroke="#004731" strokeWidth="0.35" strokeOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* MA-226: South corridor */}
      <path d={MA226} fill="none" stroke="#004731" strokeWidth="0.28" strokeOpacity="0.15" strokeLinecap="round" strokeLinejoin="round" />

      {/* Highway badges */}
      <g fontSize="1" fontFamily="system-ui" fontWeight="bold" fill="#004731" fillOpacity="0.18">
        <text x="28" y="28.5" textAnchor="middle">316</text>
        <text x="60" y="31.5" textAnchor="middle">135</text>
      </g>

      {/* ═══════════════════════════════════════════ */}
      {/* SECONDARY ROADS (thin, dashed)              */}
      {/* ═══════════════════════════════════════════ */}
      {SECONDARY_ROADS.map(([x1, y1, x2, y2], i) => (
        <line
          key={`road-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#004731"
          strokeWidth="0.15"
          strokeOpacity="0.12"
          strokeDasharray="0.8 0.5"
          strokeLinecap="round"
        />
      ))}

      {/* ═══════════════════════════════════════════ */}
      {/* RIO MEARIM                                  */}
      {/* ═══════════════════════════════════════════ */}
      <path d={RIO_MEARIM} fill="none" stroke="#5b9bd5" strokeWidth="0.7" strokeOpacity="0.15" strokeLinecap="round" />
      <path d={RIO_MEARIM} fill="none" stroke="#5b9bd5" strokeWidth="0.3" strokeOpacity="0.35" strokeLinecap="round" />

      {/* ═══════════════════════════════════════════ */}
      {/* CITIES                                      */}
      {/* ═══════════════════════════════════════════ */}
      {CITIES.map((city) => {
        const r = city.isMain ? 0.9 : city.isOwned ? 0.7 : 0.35;
        const dotColor = city.isMain || city.isOwned ? "#004731" : "#6b7280";
        const dotOpacity = city.isMain ? 0.3 : city.isOwned ? 0.25 : 0.2;
        const fontSize = city.isMain ? "2" : city.isOwned ? "1.4" : "1.15";
        const fontWeight = city.isMain ? 700 : city.isOwned ? 600 : 400;
        const textOpacity = city.isMain ? 0.4 : city.isOwned ? 0.35 : 0.22;

        return (
          <g key={city.name}>
            {/* City dot */}
            <circle cx={city.x} cy={city.y} r={r} fill={dotColor} fillOpacity={dotOpacity} />

            {/* Main city: dashed outer ring */}
            {city.isMain && (
              <circle cx={city.x} cy={city.y} r={2.2} fill="none" stroke="#004731" strokeWidth="0.12" strokeOpacity="0.12" strokeDasharray="0.4 0.3" />
            )}

            {/* Owned locations: solid outer ring */}
            {city.isOwned && (
              <circle cx={city.x} cy={city.y} r={1.5} fill="none" stroke="#004731" strokeWidth="0.1" strokeOpacity="0.15" />
            )}

            {/* Label */}
            <text
              x={city.x + city.labelDx}
              y={city.y + city.labelDy}
              textAnchor={city.anchor}
              fontSize={fontSize}
              fill="#004731"
              fillOpacity={textOpacity}
              fontWeight={fontWeight}
              fontFamily="system-ui, -apple-system, sans-serif"
              style={city.isMain ? { letterSpacing: "0.08em" } : undefined}
            >
              {city.name}
            </text>
          </g>
        );
      })}

      {/* ═══════════════════════════════════════════ */}
      {/* COMPASS ROSE                                */}
      {/* ═══════════════════════════════════════════ */}
      <g transform="translate(14, 78)" opacity="0.18">
        <circle r="2.8" fill="none" stroke="#004731" strokeWidth="0.15" />
        <line y1="-2.4" y2="2.4" stroke="#004731" strokeWidth="0.12" />
        <line x1="-2.4" x2="2.4" stroke="#004731" strokeWidth="0.12" />
        <polygon points="0,-2.4 -0.5,-1.5 0.5,-1.5" fill="#004731" opacity="0.6" />
        <text y="-3.4" textAnchor="middle" fontSize="1.4" fill="#004731" fontWeight="bold" fontFamily="system-ui">
          N
        </text>
      </g>
    </svg>
  );
}
