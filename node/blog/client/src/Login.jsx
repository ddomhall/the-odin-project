import {useEffect, useContext} from 'react'

export default function Login() {
  async function loginApi(e) {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      })
    }).then(res => res.json()).then(res => console.log(res))
  }

  return(
    <form onSubmit={loginApi} className='flex flex-col'>
      <input name='username' placeholder='username' required />
      <input name='password' placeholder='password' type='password' required />
      <input type='submit' value='log in' />
    </form>
  )
}
