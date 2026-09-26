/**
 * Twinkling light points behind the home hero. Four groups of points in
 * different places; each group lights up for ~1.5 s, and the next group
 * starts 2 s later, so a new cluster appears every 2 seconds in a new spot
 * (8 s loop). Pure CSS (opacity/transform only), decorative, and hidden for
 * visitors who prefer reduced motion.
 */
type Light = { x: number; y: number; s: number; c: "teal" | "orange" | "white"; d: number };

const GROUP_GAP_S = 2;

// Positions in % of the hero; `d` is a small jitter inside the group (seconds).
const groups: Light[][] = [
  [
    { x: 8, y: 22, s: 4, c: "teal", d: 0 },
    { x: 15, y: 64, s: 3, c: "white", d: 0.2 },
    { x: 24, y: 36, s: 5, c: "orange", d: 0.35 },
    { x: 6, y: 82, s: 3, c: "teal", d: 0.5 },
    { x: 19, y: 12, s: 2, c: "white", d: 0.15 },
  ],
  [
    { x: 78, y: 18, s: 5, c: "teal", d: 0 },
    { x: 90, y: 44, s: 3, c: "white", d: 0.25 },
    { x: 84, y: 72, s: 4, c: "orange", d: 0.4 },
    { x: 95, y: 16, s: 2, c: "white", d: 0.1 },
    { x: 72, y: 86, s: 3, c: "teal", d: 0.55 },
  ],
  [
    { x: 36, y: 10, s: 3, c: "white", d: 0 },
    { x: 58, y: 8, s: 4, c: "teal", d: 0.3 },
    { x: 47, y: 90, s: 3, c: "orange", d: 0.15 },
    { x: 30, y: 78, s: 4, c: "teal", d: 0.45 },
    { x: 66, y: 88, s: 2, c: "white", d: 0.2 },
  ],
  [
    { x: 3, y: 48, s: 3, c: "orange", d: 0 },
    { x: 97, y: 58, s: 4, c: "teal", d: 0.2 },
    { x: 12, y: 40, s: 2, c: "white", d: 0.4 },
    { x: 88, y: 30, s: 3, c: "orange", d: 0.1 },
    { x: 54, y: 96, s: 3, c: "teal", d: 0.5 },
  ],
];

export function HeroLights() {
  return (
    <div className="hero-lights pointer-events-none absolute inset-0" aria-hidden>
      {groups.flatMap((g, gi) =>
        g.map((l, li) => (
          <span
            key={`${gi}-${li}`}
            className={`hero-light hero-light--${l.c}`}
            style={{
              left: `${l.x}%`,
              top: `${l.y}%`,
              width: Math.round(l.s * 1.6),
              height: Math.round(l.s * 1.6),
              animationDelay: `${gi * GROUP_GAP_S + l.d}s`,
            }}
          />
        )),
      )}
    </div>
  );
}
