const C = {
  blue: "#3E5C76",
  navy: "#2C4458",
  orange: "#E8A317",
  box: "#C89B63",
  box2: "#A9794A",
  grey: "#5B6873",
  pale: "#DDE4E9",
  floor: "#CBD3D9",
  sky: "#EAEFF3"
}

function Bays({ upright, beam, fills, levels, bays }) {
  const step = 92 / levels
  const bw = 156 / bays
  const parts = []
  for (let b = 0; b <= bays; b++) {
    parts.push(<rect key={"u" + b} x={22 + b * bw - 3} y="12" width="6" height="100" fill={upright} />)
  }
  for (let l = 0; l < levels; l++) {
    const y = 106 - l * step
    parts.push(<rect key={"b" + l} x="20" y={y} width="160" height="5" rx="1" fill={beam} />)
    for (let b = 0; b < bays; b++) {
      const h = step - 12 - ((l + b) % 2) * 4
      const f = fills[(l * bays + b) % fills.length]
      parts.push(<rect key={`x${l}-${b}`} x={22 + b * bw + 6} y={y - h} width={bw - 12} height={h} rx="2" fill={f} />)
    }
  }
  return parts
}

function Cantilever() {
  const parts = [<rect key="col" x="96" y="12" width="8" height="100" fill={C.blue} />]
  for (let l = 0; l < 3; l++) {
    const y = 96 - l * 30
    parts.push(<rect key={"l" + l} x="30" y={y} width="66" height="4" fill={C.orange} />)
    parts.push(<rect key={"r" + l} x="104" y={y} width="66" height="4" fill={C.orange} />)
    parts.push(<rect key={"pl" + l} x="34" y={y - 9} width="58" height="9" rx="4" fill={C.grey} />)
    parts.push(<rect key={"pr" + l} x="108" y={y - 9} width="58" height="9" rx="4" fill={l % 2 ? C.box2 : C.pale} />)
  }
  return parts
}

function Mezzanine() {
  return [
    <rect key="p" x="18" y="52" width="164" height="6" fill={C.blue} />,
    <rect key="l1" x="22" y="58" width="5" height="54" fill={C.blue} />,
    <rect key="l2" x="98" y="58" width="5" height="54" fill={C.blue} />,
    <rect key="l3" x="176" y="58" width="5" height="54" fill={C.blue} />,
    <rect key="rail" x="18" y="38" width="164" height="3" fill={C.orange} />,
    <rect key="r1" x="18" y="38" width="3" height="14" fill={C.orange} />,
    <rect key="r2" x="100" y="38" width="3" height="14" fill={C.orange} />,
    <rect key="r3" x="179" y="38" width="3" height="14" fill={C.orange} />,
    <polygon key="st" points="112,112 146,112 176,58 168,58" fill={C.pale} stroke={C.grey} strokeWidth="1.5" />,
    <rect key="b1" x="34" y="38" width="26" height="14" rx="2" fill={C.box} />,
    <rect key="b2" x="64" y="30" width="22" height="22" rx="2" fill={C.box2} />,
    <rect key="b3" x="34" y="88" width="30" height="24" rx="2" fill={C.box} />,
    <rect key="b4" x="66" y="96" width="26" height="16" rx="2" fill={C.box2} />
  ]
}

function Mobile() {
  const parts = [<rect key="rail" x="12" y="110" width="176" height="3" fill={C.grey} />]
  for (let i = 0; i < 5; i++) {
    const x = 16 + i * 34
    parts.push(<rect key={"c" + i} x={x} y="26" width="30" height="84" rx="3" fill={C.pale} stroke={C.grey} strokeWidth="1.5" />)
    parts.push(<rect key={"t" + i} x={x} y="26" width="30" height="8" rx="3" fill={C.grey} />)
    parts.push(<circle key={"h" + i} cx={x + 15} cy="72" r="6" fill="none" stroke={C.grey} strokeWidth="2" />)
  }
  return parts
}

function Mesh() {
  const parts = [<rect key="f" x="30" y="16" width="140" height="96" fill="none" stroke={C.grey} strokeWidth="2.5" />]
  for (let i = 1; i < 10; i++) {
    parts.push(<line key={"v" + i} x1={30 + i * 14} y1="16" x2={30 + i * 14} y2="112" stroke={C.grey} strokeWidth="0.8" />)
  }
  for (let i = 1; i < 7; i++) {
    parts.push(<line key={"h" + i} x1="30" y1={16 + i * 14} x2="170" y2={16 + i * 14} stroke={C.grey} strokeWidth="0.8" />)
  }
  parts.push(<rect key="s1" x="30" y="58" width="140" height="4" fill={C.grey} />)
  parts.push(<rect key="s2" x="30" y="86" width="140" height="4" fill={C.grey} />)
  parts.push(<rect key="b1" x="42" y="40" width="34" height="18" rx="2" fill={C.box} />)
  parts.push(<rect key="b2" x="110" y="68" width="40" height="18" rx="2" fill={C.box2} />)
  parts.push(<rect key="b3" x="46" y="94" width="30" height="18" rx="2" fill={C.box} />)
  return parts
}

const arts = {
  pallet: () => <Bays upright={C.blue} beam={C.orange} fills={[C.box, C.box2]} levels={3} bays={3} />,
  storage: () => <Bays upright={C.grey} beam={C.blue} fills={[C.box, C.pale, C.box2]} levels={3} bays={2} />,
  heavy: () => <Bays upright={C.navy} beam={C.orange} fills={[C.box2, C.box]} levels={2} bays={2} />,
  display: () => <Bays upright={C.grey} beam={C.pale} fills={["#E35D4F", "#4FA36B", C.orange, "#3E7CB1"]} levels={4} bays={3} />,
  cantilever: Cantilever,
  mezzanine: Mezzanine,
  mobile: Mobile,
  mesh: Mesh
}

export default function RackArt({ type }) {
  const Art = arts[type]
  return (
    <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="200" height="130" fill={C.sky} />
      <rect y="112" width="200" height="18" fill={C.floor} />
      <Art />
    </svg>
  )
}