import { useEffect, useState } from 'react';
import { data, useParams } from 'react-router-dom';
import { useLang } from '../../LanguageContext.jsx';
import './Home.css';
import { BiSolidBuildingHouse } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";

function UniquePage() {
  const { slug } = useParams();
  const { lang } = useLang();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return <div className="container"><p>Yuklanmoqda...</p></div>;
  }

  if (error || !job) {
    return <div className="container"><p>{error}</p></div>;
  }
  console.log(job);
  

  return (
    <>
      <div className="container image">
        <div className='job-detail-page'>
          <h1>{job.title || "Noma'lum sarlavha"}</h1>
          <div className='image_box'>
            <p>
              <strong><BiSolidBuildingHouse className='color f'/></strong> {job.type || "Noma'lum joylashuv"}
            </p>
            <p className='image_box_p'>
              <strong><MdLocationPin className='color f'/></strong> {job.location || "Noma'lum tur"}
            </p>
          </div>
        </div>
      </div>

      <div className="div container">
        <h3>Job details</h3>
        <button className='div_btn'>Apply</button>
      </div>

      <hr className='div_hr' />

      <div
        className="container job-description"
        dangerouslySetInnerHTML={{
          __html: job.description?.[lang] || "<p>❌ Tavsif mavjud emas</p>",
        }}
      />
    </>
  );
}

export default UniquePage;