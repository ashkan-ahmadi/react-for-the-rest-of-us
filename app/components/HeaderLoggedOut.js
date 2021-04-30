import React, { useState } from 'react'

import axios from 'axios'

const HeaderLoggedOut = (props) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        '/login',
        {
          username: username,
          password: password
        })
      if (response.data) {
        localStorage.setItem('complexappToken', response.data.token)
        localStorage.setItem('complexappUsername', response.data.username)
        localStorage.setItem('complexappAvatar', response.data.avatar)
        props.setLoggedIn(true)
      } else {
        console.log('Incorrect username/password;');
      }
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="mb-0 pt-2 pt-md-0"
      onSubmit={handleSubmit}>
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
