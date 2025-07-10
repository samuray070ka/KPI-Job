import React, { useState } from 'react';
import "./components.css";
import logo from "../assets/image-removebg-preview.png";
import { FaLinkedin } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaYoutube } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";
import { useLang } from '../LanguageContext.jsx';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { lang, switchLang } = useLang();

  const t = {
    jobs: { uz: 'Ish o‘rinlari', ru: 'Работа', en: 'Jobs' },
    culture: { uz: 'Madaniyat', ru: 'Культура', en: 'Culture' },
    perks: { uz: 'Imtiyozlar', ru: 'Преимущества', en: 'Perks' },
    company: { uz: 'Kompaniya sayti', ru: 'Сайт компании', en: 'Company website' }
  };

  return (
    <div className='navbar'>
      <div className='container navbar_container'>
        <Link className='link' to={'/'}>
          <img className='navbar_logo' src={logo} alt="Logo" />
        </Link>
        <h1 className="flex"> </h1>
        <ul className={`navbar_collaction ${isOpen ? 'open' : ''}`}>
          <a className='navbar_item link one' onClick={() => setIsOpen(false)} href="#jobs">
            {t.jobs[lang]}
          </a>
          <a className='navbar_item link two' onClick={() => setIsOpen(false)} href="#culture">
            {t.culture[lang]}
          </a>
          <a className='navbar_item link flex three' onClick={() => setIsOpen(false)} href="#perks">
            {t.perks[lang]}
          </a>
          <li className='navbar_item navbar_icon four' onClick={() => setIsOpen(false)}><FaLinkedin /></li>
          <li className='navbar_item navbar_icon five' onClick={() => setIsOpen(false)}><PiInstagramLogoFill /></li>
          <li className='navbar_item navbar_icon six' onClick={() => setIsOpen(false)}><FaYoutube /></li>
          <a href='https://kpi.com/' onClick={() => setIsOpen(false)} className='navbar_btn'>
            {t.company[lang]}
          </a>
        </ul>

        <div className="lang-switcher">
          <select value={lang} onChange={(e) => switchLang(e.target.value)} className="lang-dropdown">
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>

        <button className='navbar_bars' onClick={toggleMenu}><HiMiniBars3 /></button>
      </div>
    </div>
  );
}

export default Navbar;