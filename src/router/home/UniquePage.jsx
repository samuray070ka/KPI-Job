import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLang } from '../../LanguageContext.jsx';
import './Home.css'
import { BiSolidBuildingHouse } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";

function UniquePage() {
  const { slug } = useParams();
  const { lang } = useLang();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function fetchJobData() {
    try {
      const res = await fetch(`http://localhost:5000/job/${slug}`);
      const data = await res.json();

      setJob(data);
    } catch (err) {
      console.error("Ma'lumotni olishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchJobData();
}, [slug]);


  if (loading) return <div className="container"><p>Yuklanmoqda...</p></div>;
  if (!job) return <div className="container"><p>❌ Bunday ish topilmadi</p></div>;

  return (
    <>
    <div className="container image">
        <div className='job-detail-page'>
            <h1>{job.title?.[lang]}</h1>
            <div className='image_box'>
                <p><strong><BiSolidBuildingHouse /></strong> {job.location}</p>
                <p className='image_box_p'><strong><MdLocationPin /></strong> {job.type}</p>
            </div>
        </div>
    </div>
    <div className="div container">
        <h3>Job details</h3>
        <button className='div_btn'>Apply</button>
    </div>
    <hr  className='div_hr'/>
    <div
        className="container job-description"
        dangerouslySetInnerHTML={{ __html: job.description?.[lang] }}
    />
    </>
  );
}

export default UniquePage;