import React from 'react'
import "./components.css"
import logo from "../assets/image-removebg-preview.png"
import { FaLinkedin } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaYoutube } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";

function Navbar() {
  return (
    <div className='navbar'>
        <div className='container navbar_container'>
            <img className='navbar_logo' src={logo} alt="" />
            <h1 className='flex'> </h1>
            <ul className='navbar_collaction'>
                <a className='navbar_item link' href="#jobs">Jobs</a>
                <a className='navbar_item link' href='#culture'>Culture</a>
                <a className='navbar_item link' href='#perks'>Perks</a>
                <li className='navbar_item navbar_icon'><FaLinkedin /></li>
                <li className='navbar_item navbar_icon'><PiInstagramLogoFill /></li>
                <li className='navbar_item navbar_icon'><FaYoutube /></li>
            </ul>
            <a href='https://kpi.com/' className='navbar_btn'>Company website</a>
            <button className='navbar_bars'><HiMiniBars3 /></button>
        </div>
    </div>
  )
}

export default Navbar