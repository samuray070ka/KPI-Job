import React from 'react'
import "./components.css"
import footerLogo from '../assets/image-removebg-preview (1).png'

function Footer() {
  return (
    <div className='footer'>
      <h3 className='footer_h3'>holded \ <span>Careers</span></h3>
      <div className='hr'></div>
      <img src={footerLogo} alt="" />
    </div>
  )
}

export default Footer