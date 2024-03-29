import {Link, Outlet} from 'react-router-dom'

export default function Root() {
  return (
  <>
      <nav className='h-10 flex justify-center'>
        <Link className='w-32 text-center leading-10' to={'leaderboard'}>Leaderboard</Link>
        <Link className='w-32 text-center leading-10' to={'/'}>Home</Link>
        <Link className='w-32 text-center leading-10' to={'play'}>Play</Link>
      </nav>
      <Outlet />
  </>
  )
}
