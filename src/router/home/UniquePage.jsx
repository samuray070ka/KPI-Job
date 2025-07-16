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
    const hasBullets = lines.every(line => /^(\*|\-|\d+\.)\s+/.test(line));

    if (hasBullets) {
      return (
        <ul key={index}>
          {lines.map((li, i) => (
            <li key={i}>{li.replace(/^(\*|\-|\d+\.)\s+/, '')}</li>
          ))}
        </ul>
      );
    }

    return <p key={index}>{trimmed}</p>;
  });
}

function UniquePage() {
  const { slug } = useParams();
  const { lang } = useLang();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // Bu form ko‘rinish holatini boshqaradi

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   message: ''
  // });

  useEffect(() => {
    async function fetchJobData() {
      try {
        const res = await fetch(`http://localhost:5000/job/${slug}`);
        if (!res.ok) {
          throw new Error('Job topilmadi');
        }
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form yuborildi:", formData);
  //   setShowForm(false);
  // };

  if (loading) {
    return <div className="container"><p>Yuklanmoqda...</p></div>;
  }

  if (error || !job) {
    return <div className="container"><p>{error}</p></div>;
  }

  return (
    <>
      <div className="container image">
        <div className='job-detail-page'>
          <h1>{job.title || "Noma'lum sarlavha"}</h1>
          <div className='image_box'>
            <p>
              <strong><BiSolidBuildingHouse className='color f' /></strong> {job.type || "Noma'lum joylashuv"}
            </p>
            <p className='image_box_p'>
              <strong><MdLocationPin className='color f' /></strong> {job.location || "Noma'lum tur"}
            </p>
          </div>
        </div>
      </div>

      <div className="div container">
        <h3
          onClick={() => setShowForm(false)}
          style={{ cursor: 'pointer',borderBottom: "0px" }}
        >
          Job details
        </h3>
        <button
          className={`div_btn ${showForm ? 'active' : ''}`}
          onClick={() => setShowForm(true)}
        >
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
            <label htmlFor="">Full name</label>
            <br />
            <input type="text" placeholder='Full name' className='unique_text'/>
            <br />
            <label htmlFor="">Email address</label>
            <br />
            <input type="text" placeholder='Your email address' className='unique_text'/>
            <br />
            <label htmlFor="">Phone number</label>
            <br />  
            <input type="text" className='unique_number' />
            <input type="number"  className='unique_number ml'/>
            <br />
            <label htmlFor="">Photo</label>
            <br />
            <input type="file" className='unique_file' />
            <div className='unique_hr'></div>
            <label htmlFor="">CV or resume</label>
            <p>Upload your CV or resume file</p>
            <input type="file" className='unique_file' />
            <div className='unique_hr'></div>
            <label htmlFor="">Cover letter</label>
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