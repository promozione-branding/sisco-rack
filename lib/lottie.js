const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1]
}

const ease = { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } }

const layer = (ind, size, color, width, rotate, pulse) => ({
  ddd: 0,
  ind,
  ty: 4,
  nm: "layer" + ind,
  sr: 1,
  ks: {
    o: { a: 0, k: 100 },
    r: rotate
      ? { a: 1, k: [{ t: 0, s: [0], ...ease }, { t: 90, s: [rotate] }] }
      : { a: 0, k: 0 },
    p: { a: 0, k: [50, 50, 0] },
    a: { a: 0, k: [0, 0, 0] },
    s: pulse
      ? {
          a: 1,
          k: [
            { t: 0, s: [70, 70, 100], ...{ i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] } } },
            { t: 45, s: [100, 100, 100], i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] } },
            { t: 90, s: [70, 70, 100] }
          ]
        }
      : { a: 0, k: [100, 100, 100] }
  },
  ao: 0,
  shapes: [
    {
      ty: "gr",
      nm: "group",
      it: [
        { ty: "rc", d: 1, s: { a: 0, k: [size, size] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 5 } },
        { ty: "st", c: { a: 0, k: rgb(color) }, o: { a: 0, k: 100 }, w: { a: 0, k: width }, lc: 2, lj: 2 },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]
    }
  ],
  ip: 0,
  op: 90,
  st: 0,
  bm: 0
})

export const rackAnimation = (outer, inner) => ({
  v: "5.7.0",
  fr: 30,
  ip: 0,
  op: 90,
  w: 100,
  h: 100,
  nm: "rack",
  ddd: 0,
  assets: [],
  layers: [layer(1, 56, outer, 6, 90, false), layer(2, 26, inner, 6, 0, true)]
})
