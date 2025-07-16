import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLang } from '../../LanguageContext.jsx';
import './Home.css';
import { BiSolidBuildingHouse } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";

// Tavsifni formatlash
function formatDescription(rawText) {
  if (!rawText) return null;

  const sections = rawText.split(/\n\s*\n/);
  return sections.map((section, index) => {
    const trimmed = section.trim();
    const isBigHeading = /^(job description|about you|extra awesome|job requirements)$/i.test(trimmed);
    const isSubHeading = /^(the role|what's it like to work with us|bonus|benefits)$/i.test(trimmed);

    if (isBigHeading) return <h2 key={index}>{trimmed}</h2>;
    if (isSubHeading) return <h3 key={index}>{trimmed}</h3>;

    const lines = trimmed.split('\n');
    const hasBullets = lines.every(line => /^(\*|-|\d+\.)\s+/.test(line));

    if (hasBullets) {
      return (
        <ul key={index}>
          {lines.map((li, i) => (
            <li key={i}>{li.replace(/^(\*|-|\d+\.)\s+/, '')}</li>
          ))}
        </ul>
      );
    }

    return <p key={index}>{trimmed}</p>;
  });
}

function UniquePage() {
  const countries = [
    { code: "us", name: "United States", dialCode: "+1", flag: "https://flagcdn.com/w40/us.png" },
    { code: "gb", name: "United Kingdom", dialCode: "+44", flag: "https://flagcdn.com/w40/gb.png" },
    { code: "uz", name: "Uzbekistan", dialCode: "+998", flag: "https://flagcdn.com/w40/uz.png" },
    { code: "ru", name: "Russia", dialCode: "+7", flag: "https://flagcdn.com/w40/ru.png" },
    { code: "de", name: "Germany", dialCode: "+49", flag: "https://flagcdn.com/w40/de.png" },
    { code: "fr", name: "France", dialCode: "+33", flag: "https://flagcdn.com/w40/fr.png" },
    { code: "cn", name: "China", dialCode: "+86", flag: "https://flagcdn.com/w40/cn.png" },
    { code: "jp", name: "Japan", dialCode: "+81", flag: "https://flagcdn.com/w40/jp.png" },
    { code: "tr", name: "Turkey", dialCode: "+90", flag: "https://flagcdn.com/w40/tr.png" },
    { code: "it", name: "Italy", dialCode: "+39", flag: "https://flagcdn.com/w40/it.png" },
    { code: "in", name: "India", dialCode: "+91", flag: "https://flagcdn.com/w40/in.png" },
    { code: "es", name: "Spain", dialCode: "+34", flag: "https://flagcdn.com/w40/es.png" },
    { code: "kz", name: "Kazakhstan", dialCode: "+7", flag: "https://flagcdn.com/w40/kz.png" },
    { code: "kr", name: "South Korea", dialCode: "+82", flag: "https://flagcdn.com/w40/kr.png" },
    { code: "ae", name: "United Arab Emirates", dialCode: "+971", flag: "https://flagcdn.com/w40/ae.png" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState("");

  const handleCountryChange = (e) => {
    const found = countries.find(c => c.code === e.target.value);
    if (found) setSelectedCountry(found);
  };

  const { slug } = useParams();
  const { lang } = useLang();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchJobData() {
      try {
        const res = await fetch(`http://localhost:5000/job/${slug}`);
        if (!res.ok) throw new Error('Job topilmadi');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Xatolik:", err);
        setError("❌ Bunday ish topilmadi");
      } finally {
        setLoading(false);
      }
    }
    fetchJobData();
  }, [slug]);

  if (loading) return <div className="container"><p>Yuklanmoqda...</p></div>;
  if (error || !job) return <div className="container"><p>{error}</p></div>;

  return (
    <>
      <div className="container image">
        <div className='job-detail-page'>
          <h1>{job.title || "Noma'lum sarlavha"}</h1>
          <div className='image_box'>
            <p><strong><BiSolidBuildingHouse className='color f' /></strong> {job.type || "Noma'lum joylashuv"}</p>
            <p className='image_box_p'><strong><MdLocationPin className='color f' /></strong> {job.location || "Noma'lum tur"}</p>
          </div>
        </div>
      </div>

      <div className="div container">
        <h3 onClick={() => setShowForm(false)} style={{ cursor: 'pointer', borderBottom: "0px" }}>
          Job details
        </h3>
        <button className={`div_btn ${showForm ? 'active' : ''}`} onClick={() => setShowForm(true)}>
          Apply
        </button>
      </div>

      <hr className='div_hr' />

      <div className="container job-description">
        {showForm ? (
          <div className='container unique_container'>
            <h3>My information</h3>
            <span>Fill out the information below</span>
            <form action="">
              <label>Full name<strong>*</strong></label><br />
              <input type="text" placeholder='Full name' className='unique_text' /><br />
              <label>Email address<strong>*</strong></label><br />
              <input type="text" placeholder='Your email address' className='unique_text' /><br />

              <label>Phone number<strong>*</strong></label><br />
              <div className='number'>
                {/* Flag preview */}
                <img src={selectedCountry.flag} alt={selectedCountry.name} style={{ width: '24px', height: '18px' }} />

                {/* Select */}
                <select value={selectedCountry.code} onChange={handleCountryChange} className="unique_select">
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>

                {/* Phone input */}
                <div className="phone-input-wrapper">
                  <span className="phone-prefix">{selectedCountry.dialCode}</span>
                  <input
                    type="tel"
                    className="phone-input"
                    value={phone}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      setPhone(onlyDigits);
                    }}
                  />
                </div>
              </div>

              <label>Photo</label><br />
              <input type="file" className='unique_file' />
              <div className='unique_hr'></div>

              <label>CV or resume<strong>*</strong></label>
              <p>Upload your CV or resume file</p>
              <input type="file" className='unique_file' />
              <div className='unique_hr'></div>

              <label>Cover letter</label>
              <p>Upload your cover letter</p>
              <input type="file" className='unique_file' />
              <div className='unique_hr'></div>
            </form>
          </div>
        ) : (
          formatDescription(job.description?.[lang] || "❌ Tavsif mavjud emas")
        )}
      </div>
    </>
  );
}

export default UniquePage;