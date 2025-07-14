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
  const [langOpen, setLangOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLang = () => setLangOpen(!langOpen);

  const { lang, switchLang } = useLang();

  const t = {
    jobs: { uz: 'Ish o‘rinlari', ru: 'Работа', en: 'Jobs' },
    culture: { uz: 'Madaniyat', ru: 'Культура', en: 'Culture' },
    perks: { uz: 'Imtiyozlar', ru: 'Преимущества', en: 'Perks' },
    company: { uz: 'Kompaniya sayti', ru: 'Сайт компании', en: 'Company website' }
  };

  const flags = {
    uz: 'https://flagcdn.com/w40/uz.png',
    ru: 'https://flagcdn.com/w40/ru.png',
    en: 'https://flagcdn.com/w40/gb.png',
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

        <div className="lang-switcher" onClick={toggleLang} style={{ position: 'relative', cursor: 'pointer' }}>
          <div className="lang-selected" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <img src={flags[lang]} alt={lang} width="24" height="18" />
            <span>{lang.toUpperCase()}</span>
          </div>
          {langOpen && (
            <div className="lang-dropdown" style={{
              position: 'absolute',
              top: '100%',
              right: "-50px",
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '5px',
              zIndex: 999,
              width: '100px',
            }}>
              {['uz', 'ru', 'en'].map((code) => (
                <div key={code} onClick={() => { switchLang(code); setLangOpen(false); }} style={{ display: 'flex', alignItems: 'center', padding: '5px', gap: '5px', cursor: 'pointer' }}>
                  <img src={flags[code]} alt={code} width="24" height="18" />
                  <span>{code.toUpperCase()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className='navbar_bars' onClick={toggleMenu}><HiMiniBars3 /></button>
      </div>
    </div>
  );
}

export default Navbar;