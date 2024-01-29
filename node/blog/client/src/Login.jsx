export default function Login() {
  return(
    <form method='post' className='flex flex-col'>
      <input name='username' placeholder='username' required />
      <input name='password' placeholder='password' type='password' required />
      <input type='submit' value='log in' />
    </form>
  )
}
