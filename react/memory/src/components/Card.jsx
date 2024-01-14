export default function Card({i, f}) {
  return <img src={i} alt="img" onClick={f} draggable="false" className="ring ring-white rounded-xl p-2"/>
}
