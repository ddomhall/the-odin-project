export default function Play() {
  function logXY(e) {
    console.log(Math.round((e.pageX/e.target.width)*100), Math.round(((e.pageY-48)/e.target.height)*100))
  }

  return (
    <img src='opwaldo.png' onClick={logXY}/>
  )
}
