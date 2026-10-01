"use client"

import { useEffect, useRef, useState } from "react"


const T = 18
const E = 0.02

const NAVY = "#1B2733"
const AMBER = "#E8A317"
const BLUE = "#3E5C76"
const SLEEVE = "#3A5A78"
const SLEEVE_FAR = "#2C465C"
const VEST = "#F2A900"
const REFLECT = "#EEF2F4"
const PANTS = "#1F2A33"
const PANTS_FAR = "#2B3A47"
const BOOT = "#12171B"
const BOOT_FAR = "#1D252B"
const SKIN = "#E7AE80"
const SKIN_SH = "#CF9367"
const GLOVE = "#D9B26F"
const CARD = "#C9975B"
const TAPE = "#A5773F"

const H = 190

/* ---------- timeline helpers ---------- */

const f = (n) => Number(n.toFixed(4))

const track = (pts) => {
  const p = [...pts]
  if (p[0][0] > 0) p.unshift([0, p[0][1]])
  if (p[p.length - 1][0] < T) p.push([T, p[p.length - 1][1]])
  return { keyTimes: p.map((q) => f(q[0] / T)).join(";"), values: p.map((q) => q[1]).join(";") }
}

const Fade = ({ pts }) => <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite" {...track(pts)} />

const Move = ({ pts }) => (
  <animateTransform
    attributeName="transform"
    type="translate"
    dur={`${T}s`}
    repeatCount="indefinite"
    {...track(pts.map(([t, x, y = 0]) => [t, `${f(x)} ${f(y)}`]))}
  />
)

const gate = (ints) => {
  const pts = ints[0][0] === 0 ? [] : [[0, 0]]
  ints.forEach(([a, b]) => {
    if (a > 0) pts.push([a - E, 0])
    pts.push([a, 1], [b, 1])
    if (b < T) pts.push([b + E, 0])
  })
  return pts
}

const not = (ints) => {
  const out = []
  let c = 0
  ints.forEach(([a, b]) => {
    if (a > c) out.push([c, a])
    c = b
  })
  if (c < T) out.push([c, T])
  return out
}

const Gate = ({ ints, children }) => (
  <g opacity="0">
    <Fade pts={gate(ints)} />
    {children}
  </g>
)


function plan(W) {
  const x0 = 56
  const RL = Math.max(520, W - 330) 
  const WP = RL - 45 
  const WF = RL - 140 
  const SX = RL - 195 
  const rackStart = x0 + 45
  const P0 = 0.6
  const P1 = 9.1

  const cyc = [0, 1, 2].map((k) => {
    const s = P1 + k * 2.4
    return { s, pick: s + 0.8, place: s + 1.9, done: s + 2.4 }
  })

  const tA = Math.min(P1 - 0.5, Math.max(P0 + 0.3, P0 + (P1 - P0) * ((SX + 60 - rackStart) / (RL - rackStart))))

  const R_VIS = [[0, P1], ...cyc.map((c, i) => [c.pick, i === 2 ? T : c.done])]
  const PUSH = [[0, P1]]
  const ARMS = cyc.map((c) => [c.pick, c.place + 0.45])
  const BOXC = cyc.map((c) => [c.pick, c.place])
  const WALK = [[P0, cyc[0].s + 1.6], ...cyc.slice(1).map((c) => [c.s, c.s + 1.6])]

  return {
    W, RL, SX, tA, cyc, P0, P1,
    R_VIS,
    L_VIS: not(R_VIS),
    PUSH,
    ARMS,
    BOXC,
    IDLE: not([...PUSH, ...ARMS]),
    WALK,
    STAND: not(WALK),
    MOVING: [[P0, P1]],
    workerPts: [
      [0, x0, 0], [P0, x0, 0], [P1, WP, 0],
      ...cyc.flatMap((c) => [[c.pick, WF, 0], [c.s + 1.6, WP, 0], [c.done, WP, 0]]),
    ],
    rackPts: [[0, rackStart, 0], [P0, rackStart, 0], [P1, RL, 0]],
  }
}

/* ---------- boxes ---------- */

const Box = () => (
  <g>
    <rect width="40" height="26" rx="1.5" fill={CARD} stroke={NAVY} strokeWidth="1.2" />
    <rect x="1" y="1" width="38" height="4" fill="#DDB37B" />
    <rect x="34" y="1" width="5" height="24" fill="#B98449" opacity=".55" />
    <rect x="16" y="0.6" width="8" height="24.8" fill={TAPE} opacity=".65" />
    <rect x="4" y="12" width="9" height="9" rx="1" fill="#fff" opacity=".92" />
    <path d="M6 15h5M6 18h3" stroke={NAVY} strokeWidth=".8" />
  </g>
)

/* ---------- the worker ---------- */

const SPLINE = { calcMode: "spline", keySplines: ".45 0 .55 1;.45 0 .55 1", keyTimes: "0;.5;1" }

const Leg = ({ far, begin, walking }) => {
  const c = far ? PANTS_FAR : PANTS
  const b = far ? BOOT_FAR : BOOT
  return (
    <g>
      {walking && (
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-24 0 -52;24 0 -52;-24 0 -52"
          dur="0.8s"
          begin={begin}
          repeatCount="indefinite"
          {...SPLINE}
        />
      )}
      <path d="M0 -52L0 -28" stroke={c} strokeWidth="11" strokeLinecap="round" />
      <g>
        {walking && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="6 0 -28;10 0 -28;52 0 -28;6 0 -28"
            keyTimes="0;.5;.75;1"
            dur="0.8s"
            begin={begin}
            repeatCount="indefinite"
          />
        )}
        <path d="M0 -28L0 -9" stroke={c} strokeWidth="9" strokeLinecap="round" />
        <path d="M-4.5 -11H4.5V-5L11 -4Q14.5 -3.5 14.5 0H-5Q-5.5 0 -5.5 -2Z" fill={b} />
        <path d="M-5 -0.6H14.4" stroke="#5B6770" strokeWidth="1.2" />
      </g>
    </g>
  )
}

const Legs = ({ walking }) =>
  walking ? (
    <g>
      <Leg far begin="0s" walking />
      <Leg begin="-0.4s" walking />
    </g>
  ) : (
    <g>
      <g transform="rotate(-5 0 -52)"><Leg far /></g>
      <g transform="rotate(5 0 -52)"><Leg /></g>
    </g>
  )

const Bob = ({ children }) => (
  <g>
    <animateTransform
      attributeName="transform"
      type="translate"
      values="0 0;0 -2.2;0 0"
      keyTimes="0;.5;1"
      dur="0.4s"
      repeatCount="indefinite"
    />
    {children}
  </g>
)

const Arm = ({ s, e, h, far, swing, begin = "0s" }) => (
  <g>
    {swing && (
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={`-20 ${s[0]} ${s[1]};20 ${s[0]} ${s[1]};-20 ${s[0]} ${s[1]}`}
        dur="0.8s"
        begin={begin}
        repeatCount="indefinite"
        {...SPLINE}
      />
    )}
    <path
      d={`M${s[0]} ${s[1]}L${e[0]} ${e[1]}L${h[0]} ${h[1]}`}
      stroke={far ? SLEEVE_FAR : SLEEVE}
      strokeWidth="7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx={h[0]} cy={h[1]} r="4.2" fill={far ? "#B99658" : GLOVE} />
  </g>
)

const Torso = () => (
  <g>
    <path d="M-10.5 -52L10.5 -52L11.5 -88Q11.5 -94 5 -94H-5Q-11.5 -94 -11.5 -88Z" fill={SLEEVE} />
    <path d="M-9.5 -52L9.5 -52L10.5 -88L4 -93H-4L-10.5 -88Z" fill={VEST} />
    <rect x="-10" y="-79" width="20" height="3.2" fill={REFLECT} />
    <rect x="-10" y="-66" width="20" height="3.2" fill={REFLECT} />
    <path d="M0 -93V-57" stroke="#B87C00" strokeWidth="1" />
    <rect x="-10.5" y="-57" width="21" height="5" fill="#111A20" />
    <rect x="-2" y="-56" width="4" height="3" fill="#9FB0BD" />
  </g>
)

const Head = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="-3.2" y="5" width="6.4" height="8" fill={SKIN_SH} />
    <circle r="8.5" fill={SKIN} />
    <ellipse cx="-2.5" cy="1" rx="2" ry="2.8" fill={SKIN_SH} />
    <path d="M8 0L11.5 3.6L8 4.3Z" fill={SKIN} />
    <circle cx="4.6" cy="-0.6" r="1.1" fill={NAVY} />
    <path d="M3 6Q5.5 7.2 7.5 5.6" stroke={SKIN_SH} strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M-9.8 -3A9.8 9.8 0 0 1 9.8 -3Z" fill="#F7F8F9" stroke={NAVY} strokeWidth="1.3" />
    <path d="M-1.5 -12.6V-3" stroke="#C9D0D5" strokeWidth="2" />
    <path d="M-10.5 -3H15Q16.2 -3 16.2 -1.7Q16.2 -0.4 15 -0.4H-10.5Z" fill="#F7F8F9" stroke={NAVY} strokeWidth="1.2" />
  </g>
)

const PushUpper = () => (
  <g>
    <Arm far s={[7, -90]} e={[19, -77]} h={[32, -73.5]} />
    <g transform="rotate(12 0 -52)">
      <Torso />
      <Head x={1} y={-106} />
    </g>
    <Arm s={[9, -89]} e={[21, -75]} h={[32, -70.5]} />
  </g>
)

const CarryUpper = () => (
  <g>
    <Arm far s={[1, -90]} e={[10, -72]} h={[28, -60]} />
    <Torso />
    <Head x={1} y={-106} />
    <Arm s={[3, -89]} e={[12, -71]} h={[26, -58]} />
  </g>
)

const IdleUpper = ({ swing }) => (
  <g>
    <Arm far swing={swing} begin="-0.4s" s={[-1, -90]} e={[1, -72]} h={[3, -55]} />
    <Torso />
    <Head x={1} y={-106} />
    <Arm swing={swing} begin="0s" s={[1, -89]} e={[3, -71]} h={[5, -54]} />
  </g>
)

function Worker({ p }) {
  return (
    <g>
      <Move pts={p.workerPts} />
      <ellipse cx="4" cy="0.5" rx="26" ry="3" fill={NAVY} opacity=".2" />

      {/* facing right: pushes, carries, places */}
      <Gate ints={p.R_VIS}>
        <Gate ints={p.WALK}><Legs walking /></Gate>
        <Gate ints={p.STAND}><Legs /></Gate>
        <Gate ints={p.PUSH}><Bob><PushUpper /></Bob></Gate>
        <Gate ints={p.ARMS}><Bob><CarryUpper /></Bob></Gate>
        <Gate ints={p.IDLE}><IdleUpper /></Gate>
        <Gate ints={p.BOXC}>
          <g transform="translate(16 -84)"><Box /></g>
        </Gate>
        <Gate ints={p.ARMS}>
          <circle cx="26" cy="-57.5" r="4.2" fill={GLOVE} />
        </Gate>
      </Gate>

      {/* facing left: walking back to the stack */}
      <Gate ints={p.L_VIS}>
        <g transform="scale(-1 1)">
          <Legs walking />
          <Bob><IdleUpper swing /></Bob>
        </g>
      </Gate>
    </g>
  )
}

/* ---------- the rack ---------- */

const BEAMS = [-30, -63, -96, -129]

function Wheel({ x, p }) {
  return (
    <g>
      <rect x={x - 5} y="-18" width="10" height="4" rx="1" fill={NAVY} />
      <path d={`M${x - 5} -15V-9M${x + 5} -15V-9`} stroke={NAVY} strokeWidth="2" />
      <circle cx={x} cy="-7" r="7" fill="#1C2329" stroke="#0D1215" strokeWidth="1" />
      <circle cx={x} cy="-7" r="2.6" fill="#9FB0BD" />
      <Gate ints={p.MOVING}>
        <g stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity=".8">
          <path d={`M${x - 4.6} -7H${x + 4.6}M${x} -11.6V-2.4`} />
          <animateTransform attributeName="transform" type="rotate" values={`0 ${x} -7;360 ${x} -7`} dur="0.3s" repeatCount="indefinite" />
        </g>
      </Gate>
    </g>
  )
}

function Rack({ p }) {
  return (
    <g>
      <Move pts={p.rackPts} />
      <ellipse cx="60" cy="0.5" rx="76" ry="3.4" fill={NAVY} opacity=".2" />

      {/* back frame and cross bracing */}
      <rect x="7" y="-141" width="6" height="124" fill="#7C97AE" />
      <rect x="119" y="-141" width="6" height="124" fill="#7C97AE" />
      <path d="M10 -40L122 -73L10 -106L122 -139" stroke="#8CA0B0" strokeWidth="1.8" fill="none" />

      {/* shelf decks in perspective */}
      {BEAMS.map((y) => (
        <polygon key={y} points={`0,${y - 3} 112,${y - 3} 122,${y - 10} 10,${y - 10}`} fill="#D5DDE3" stroke="#7A8B99" strokeWidth=".8" />
      ))}

      {/* front uprights, slotted */}
      {[0, 112].map((x) => (
        <g key={x}>
          <rect x={x - 3.5} y="-134" width="7" height="121" fill={BLUE} stroke={NAVY} strokeWidth="1" />
          <rect x={x + 1.5} y="-134" width="2" height="121" fill={NAVY} opacity=".25" />
          <path d={`M${x} -128V-19`} stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0.1 9" opacity=".85" />
        </g>
      ))}

      {/* front beams */}
      {BEAMS.map((y) => (
        <g key={y}>
          <rect x="-3.5" y={y - 3} width="119" height="6" fill={AMBER} stroke={NAVY} strokeWidth="1" />
          <rect x="-2.5" y={y - 2.2} width="117" height="1.5" fill="#F7CD6A" />
          <rect x="-2.5" y={y + 1.4} width="117" height="1.2" fill="#B57B05" />
        </g>
      ))}

      {/* casters */}
      <Wheel x={0} p={p} />
      <Wheel x={112} p={p} />

      {/* push handle */}
      <path d="M-3.5 -88H-13V-58H-3.5" stroke={NAVY} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M-13 -80V-64" stroke="#14181C" strokeWidth="5.4" strokeLinecap="round" />

      {/* boxes the worker loads */}
      {p.cyc.map((c, k) => {
        const top = BEAMS[k] - 29
        const fromY = -84 - top
        return (
          <g key={k} opacity="0">
            <Fade pts={gate([[c.place, T]])} />
            <Move pts={[[c.place, -34, fromY], [c.place + 0.45, 0, 0]]} />
            <g transform={`translate(14 ${top})`}><Box /></g>
          </g>
        )
      })}
    </g>
  )
}


const STACK_Y = [-84, -58, -32] 

function Stack({ p }) {
  return (
    <g transform={`translate(${p.SX} 0)`}>
      <g opacity="0">
        <Fade pts={[[0, 0], [p.tA, 0], [p.tA + 0.4, 1]]} />
        <rect x="-3" y="-6" width="46" height="6" fill="#9C7A4B" stroke={NAVY} strokeWidth="1" />
        <path d="M6 -6V0M20 -6V0M34 -6V0" stroke={NAVY} strokeWidth="1" />
      </g>
      {p.cyc.map((c, k) => (
        <g key={k} opacity="0">
          <Fade pts={[[0, 0], [p.tA, 0], [p.tA + 0.4, 1], [c.pick, 1], [c.pick + E, 0]]} />
          <g transform={`translate(0 ${STACK_Y[k]})`}><Box /></g>
        </g>
      ))}
    </g>
  )
}

/* ---------- scene ---------- */

export default function ShelfCrew() {
  const ref = useRef(null)
  const [w, setW] = useState(1400)

  useEffect(() => {
    const host = ref.current?.parentElement
    if (!host) return
    const measure = () => setW(Math.max(600, Math.round(host.clientWidth / 20) * 20))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    return () => ro.disconnect()
  }, [])

  const p = plan(w)

  return (
    <svg ref={ref} className="pd-crew" width={w} height={H} viewBox={`0 0 ${w} ${H}`} aria-hidden="true" focusable="false">
      <g transform={`translate(0 ${H - 8})`}>
        <g opacity="0">
          <Fade pts={[[0, 0], [0.5, 1], [T - 1.7, 1], [T - 0.9, 0]]} />
          <rect x="0" y="0" width={w} height="8" fill={NAVY} opacity=".06" />
          <line x1="0" y1="0.5" x2={w} y2="0.5" stroke={NAVY} strokeOpacity=".22" strokeWidth="2" />
          <line x1="0" y1="5" x2={w} y2="5" stroke={AMBER} strokeOpacity=".7" strokeWidth="2" strokeDasharray="16 12" />
          <Stack p={p} />
          <Rack p={p} />
          <Worker p={p} />
        </g>
      </g>
    </svg>
  )
}