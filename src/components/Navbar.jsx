import React, {useState} from 'react'
import "./components.css"
import logo from "../assets/image-removebg-preview.png"
import { FaLinkedin } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaYoutube } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='navbar'>
        <div className='container navbar_container'>
            <img className='navbar_logo' src={logo} alt="" />
            <h1 className='flex'> </h1>
            <ul className={`navbar_collaction ${isOpen ? 'open' : ''}`}>
                <a className='navbar_item link one'  onClick={() => setIsOpen(false)} href="#jobs">Jobs</a>
                <a className='navbar_item link two'  onClick={() => setIsOpen(false)} href='#culture'>Culture</a>
                <a className='navbar_item link flex three'  onClick={() => setIsOpen(false)} href='#perks'>Perks</a>
                <li className='navbar_item navbar_icon four'  onClick={() => setIsOpen(false)}><FaLinkedin /></li>
                <li className='navbar_item navbar_icon five'  onClick={() => setIsOpen(false)}><PiInstagramLogoFill /></li>
                <li className='navbar_item navbar_icon six'  onClick={() => setIsOpen(false)}><FaYoutube /></li>
                <a href='https://kpi.com/'  onClick={() => setIsOpen(false)} className='navbar_btn'>Company website</a>
            </ul>
            <button className='navbar_bars' onClick={toggleMenu}><HiMiniBars3 /></button>
        </div>
    </div>
  )
}

export default Navbar