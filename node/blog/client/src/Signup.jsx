import {useState} from 'react'
import Cookies from 'js-cookie'

export default function Signup() {
  const [errors, setErrors] = useState([])

  async function signupApi(e) {
    e.preventDefault()
    if (e.target.elements.username.value !== e.target.elements.confirmation.value) {
      setErrors([...errors, 'passwords must match'])
    } else {
      fetch('http://localhost:3000/users', {
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
          Cookies.set('session', res)
          window.location.replace('/')
        })
    }
  }

  return(
    <div className='w-96 m-auto'>
      <form onSubmit={signupApi} className='flex flex-col'>
        <input name='username' placeholder='username' required />
        <input name='password' placeholder='password' type='password' required />
        <input name='confirmation' placeholder='confirm password' type='password' required />
        <input type='submit' value='log in' />
      </form>
      {errors.map(e => <p className='text-red-50'>{e}</p>)}
    </div>
  )
}

