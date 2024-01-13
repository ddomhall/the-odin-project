export default function Card({i, f}) {
  return <img src={i} alt="img" onClick={f} className="ring ring-white rounded-xl w-auto aspect-square p-2"/>
}
