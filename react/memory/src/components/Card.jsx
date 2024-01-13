export default function Card({title, f}) {
  return <div onClick={f} className="ring ring-white rounded-xl w-auto aspect-square p-2">Card {title}</div>
}
