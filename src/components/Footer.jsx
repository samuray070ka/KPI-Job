import React from 'react'
import "./components.css"
import footerLogo from '../assets/cropped-favicon-1.png'

function Footer() {
  return (
    <div className='footer'>
      <h3 className='footer_h3'>KPI-job</h3>
      <div className='hr'></div>
      <div className='footer_box'>
        <a href="https://kpi.com" className='link'>
        <h3>Hiring with</h3>
        </a>

        <a href="https://kpi.com">
        <img className='footer_img' src={footerLogo} alt="" />
        </a>
      </div>
    </div>
  )
}

export default Footer