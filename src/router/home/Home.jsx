import { useState, useEffect } from 'react';
import "./Home.css";
import homeImageFirst from '../../assets/CEbZrJcVt13J.webp';
import homeImageSecond from '../../assets/MSuhC8ollm9F.webp';
import { FaCheck } from "react-icons/fa6";

function Home() {
  const [results, setResults] = useState([]);
  const [stories, setStories] = useState([]);
  const [values, setValues] = useState([]);
  const [jobsRawData, setJobsRawData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [perks, setPerks] = useState([]);
  const [workImages, setWorkImages] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    async function fetchData() {
      const endpoints = [
        'results', 'story', 'values', 'jobs', 'perks', 'work', 'location'
      ];

      try {
        const dataObj = {};
        for (let endpoint of endpoints) {
          const res = await fetch(`http://localhost:5000/home/${endpoint}`);
          const data = await res.json();
          dataObj[endpoint] = data;
        }

        setResults(dataObj.results || []);
        setStories(dataObj.story || []);
        setValues(dataObj.values || []);
        setJobsRawData(dataObj.jobs || []);
        setPerks(dataObj.perks || []);
        setWorkImages(dataObj.work || []);
        

        const locationFetched = dataObj.location;
        setLocationData(Array.isArray(locationFetched) ? locationFetched[0] : locationFetched);

      } catch (err) {
        console.error("Ma’lumotlarni olishda xatolik:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const deptGrouped = {};
    jobsRawData.forEach(job => {
      if (!deptGrouped[job.department]) {
        deptGrouped[job.department] = [];
      }
      deptGrouped[job.department].push(job);
    });

    const groupedJobs = Object.keys(deptGrouped).map(dept => ({
      department: dept,
      jobs: deptGrouped[dept],
    }));

    setDepartments(Object.keys(deptGrouped));
    setSelectedDepartment(Object.keys(deptGrouped)[0] || "");
    setJobsData(groupedJobs);
  }, [jobsRawData]);

  const selectedJobs = selectedDepartment
    ? jobsData.find((item) => item.department === selectedDepartment)?.jobs || []
    : jobsData.flatMap((item) => item.jobs) || [];
  return (
    <div className='home'>

      {/* Banner */}
      <div className="banner_first">
        <div className='box'>
          <h1 className='first_h1'>Your journey starts here</h1>
          <button className='first_btn'>
            <a className='link' href="#jobs">Open positions</a>
          </button>
        </div>
      </div>

      {/* Intro Text */}
      <div className="text_first">
        <h1 className='t_first_h1'>Join the team, make an impact.</h1>
        <br />
        <h4 className='t_first_h4'>
          At Holded, we believe that daily admin should never stop a great idea from becoming a success. That's why we create intuitive software to empower anyone who dares to start their own business.
          <br /><br />
          In order to create cutting-edge products that meet the needs of the sector, talent is essential.
          <strong> We are looking for passion, creativity and commitment.</strong>
          <br /><br />
          Think you fit the bill? We'd love to hear from you!
        </h4>
      </div>

      {/* Results */}
      <div className="results">
        <div className="container results_container">
          <h1 className='results_h1'>Holded in numbers</h1>
          <div className='result_cards'>
            {results.map((item, i) => (
              <div className="result_card" key={i}>
                <h2>{item.number}</h2>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="story">
        <div className='container story_container'>
          <div className="story_right">
            <h1>Our story...</h1>
          </div>
          <div className="story_left">
            {stories.map((item, i) => (
              <div className='story_box' key={i}>
                <button><FaCheck/></button>
                <h5>{item.description}</h5>
                <p>{item.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Section 1 */}
      <div className="learning">
        <div className="container learning_container">
          <div className='learn_left'>
            <h1>Continuous learning</h1>
            <br />
            <p>We have a horizontal system... and, above all, learn.</p>
          </div>
          <iframe className='first_video' title="vimeo-player" frameBorder="0" src="https://player.vimeo.com/video/760237911?h=25f8830e62" width="640" height="360"></iframe>
        </div>
      </div>

      {/* Our values */}
      <div id='culture' className="value">
        <div className="container value_container">
          <h1 className='value_h1'>Our values</h1>
          <div className="value_box">
            {values.map((item, i) => (
              <div className="value_card" key={i}>
                <div className='value_icon' />
                <FaCheck/>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Section 2 */}
      <div className="learning second">
        <div className="container learning_container">
          <iframe className='second_video' title="vimeo-player" frameBorder="0" src="https://player.vimeo.com/video/760228363?h=ef125459cb" width="640" height="360"></iframe>
          <div className='learn_left'>
            <h1>Draw your career path</h1>
            <p>We value multi-skilled profiles...</p>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div id='jobs' className="container jobs-wrapper">
        <h1>Open positions</h1>
        <div className="departments-tabs">
          <button className={`tab-btn ${selectedDepartment === "" ? "active" : ""}`} onClick={() => setSelectedDepartment("")}>All departments</button>
          {departments.map((dept) => (
            <button key={dept} className={`tab-btn ${selectedDepartment === dept ? "active" : ""}`} onClick={() => setSelectedDepartment(dept)}>
              {dept}
              <span className="count">{jobsData.find((d) => d.department === dept)?.jobs.length || 0}</span>
            </button>
          ))}
        </div>
        <div className="jobs-grid">
          {selectedJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <div className="job-details">
                <span>🏠 {job.type}</span>
                <span>📍 {job.location}</span>
              </div>
              <button className="view-job-btn">View job</button>
            </div>
          ))}
        </div>
      </div>

      {/* Business Recruitment Process */}
      <div className="business">
        <div className="container business_container">
          <h1>Business recruitment process</h1>
          <img className='img_home' src={homeImageFirst} alt="" />
        </div>
      </div>

      {/* Trust & Experience */}
      <div className="learning second">
        <div className="container learning_container">
          <div className='learn_left'>
            <h1>Trust and experience</h1>
            <p>One of the best things about Holded...</p>
          </div>
          <iframe className='first_video' title="vimeo-player" frameBorder="0" src="https://player.vimeo.com/video/757891971?h=6c7efb5a7c" width="640" height="360"></iframe>
        </div>
      </div>

      {/* Engineering Recruitment Process */}
      <div className="business">
        <div className="container business_container">
          <h1>Engineering recruitment process</h1>
          <img className='img_home_second' src={homeImageSecond} alt="" />
        </div>
      </div>

      {/* Perks */}
      <div id='perks' className="perks">
        <div className="container perks_container">
          <div className="perks_left">Perks and benefits</div>
          <div className="perks_right">
            {perks.map((item, i) => (
              <div className='perks_box' key={i}>
                <button><FaCheck /></button>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barcelona section */}
      <div className="learning third fixed">
        <div className="container learning_container">
          <iframe className='first_video' title="vimeo-player" frameBorder="0" src="https://player.vimeo.com/video/757908715?h=52b05de5d9" width="640" height="360"></iframe>
          <div className='learn_left h1'>
            <h1>Barcelona, a city to call home.</h1>
            <p>Holded's talent comes from over 20 different countries...</p>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="join">
        <div className="container join_container">
          <h1>Why join us</h1>
          <ul className='join_collaction'>
            <li className='join_item'>Join because you’re constantly learning...</li>
            <li className='join_item'>Join because you want to work with a team that trusts you...</li>
            <li className='join_item'>Join because you want to grow as a professional...</li>
            <li className='join_item'>Join because you like our culture...</li>
            <li className='join_item'>Join because in three years time...</li>
          </ul>
        </div>
      </div>

      {/* Work Images (from backend) */}
     <div className='work'>
        <h1>Love your work</h1>
        <p>And where you work</p>
        <div className="container work_container">
          {workImages.map((img, i) => (
            <img key={i} className="work_img" src={img.imageUrl} alt={`Work ${i}`} />
          ))}
        </div>
      </div>

      {/* Google Map from backend */}
       {locationData && (
        <div className="map">
          <div className='container map_container'>
            <div className='map_left'>
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={locationData.mapEmbedUrl || ""}
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className='map_right'>
              <h1>{locationData.title}</h1>
              <p>{locationData.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;