import React from 'react'
import './Login.css'
import logo from "../../assets/image-removebg-preview.png"

function Login() {
  return (
    <div className='login'>
        <div className="login_left">
            <img src={logo} alt="" />
        </div>
        <div className="login_right">
            <h1>Log in</h1>
            <form className='login_form' action="">
                <label htmlFor="">Email kiriting</label>
                <input className='login_text' type="email" />
                <label htmlFor="">Parol kiriting</label>
                <input className='login_email' type="password" />
                <button className='login_btn'>Jo'natish</button>
            </form>
        </div>
    </div>
  )
}

export default Login