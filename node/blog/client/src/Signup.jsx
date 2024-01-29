export default function Signup() {
  return(
    <form method='post' className='flex flex-col'>
      <input name='username' placeholder='username' required />
      <input name='password' placeholder='password' type='password' required />
      <input name='confirmation' placeholder='confirm password' type='password' required />
      <input type='submit' value='log in' />
    </form>
  )
}

