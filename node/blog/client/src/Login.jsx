import {useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import Cookies from 'js-cookie'
import { redirect } from "react-router-dom";

export default function Login() {
  const {session, setSession} = useContext(SessionContext)

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
    })
      .then(res => res.json())
      .then(res => {
        if (typeof(res) == 'string') {
          Cookies.set('session', res)
          window.location.replace('/')
        } else {
          return null
        }
      })
  }

  return(
    <form onSubmit={loginApi} className='flex flex-col w-96 m-auto'>
      <input name='username' placeholder='username' required />
      <input name='password' placeholder='password' type='password' required />
      <input type='submit' value='log in' />
    </form>
  )
}
