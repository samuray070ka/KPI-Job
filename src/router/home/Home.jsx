import { useState, useEffect } from 'react'
import "./Home.css"
import { HiUsers } from "react-icons/hi2";
import { HiCurrencyDollar } from "react-icons/hi2";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { FaBuilding } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { GoStar } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { IoFlagOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { SlPencil } from "react-icons/sl";
import { PiStarFourBold } from "react-icons/pi";
import homeImageFirst from '../../assets/CEbZrJcVt13J.webp'
import homeImageSecond from '../../assets/MSuhC8ollm9F.webp'
import { FaCheck } from "react-icons/fa6";

const staticData = [
  {
    department: "Customer Success",
    jobs: [
      {
        title: "Call Center Support Team Lead",
        type: "Hybrid",
        location: "Barcelona, Catalunya [Cataluña], Spain",
      },
      {
        title: "Customer Support Specialist",
        type: "Hybrid",
        location: "Barcelona, Catalunya [Cataluña], Spain",
      },
    ],
  },
  {
    department: "Finance",
    jobs: [
      {
        title: "Billing Analyst",
        type: "Hybrid",
        location: "Barcelona, Catalunya [Cataluña], Spain",
      },
    ],
  },
  {
    department: "Marketing",
    jobs: [
      {
        title: "Content Creator & Video Editor",
        type: "Hybrid",
        location: "Barcelona, Catalunya [Cataluña], Spain",
      },
    ],
  },
];

function Home() {
  const metrics = [
  {
    label: "Recommend to a friend",
    percent: 93
  },
  {
    label: "CEO Approval",
    percent: 94
  },
  {
    label: "Positive Business Outlook",
    percent: 92
  }
];

 const [jobsData, setJobsData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    setJobsData(staticData);
    const deptNames = staticData.map((item) => item.department);
    setDepartments(deptNames);
    setSelectedDepartment(deptNames[0]);
  }, []);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const selectedJobs =
    jobsData.find((item) => item.department === selectedDepartment)?.jobs || [];

  return (
    <div className='home'>
      <div className="banner_first">
       <div className='box'>
        <h1 className='first_h1'>Your journey starts here</h1>
        <button className='first_btn'>Open positions</button>
       </div>
      </div>
      <div className="text_first">
        <h1 className='t_first_h1'>Join the team, make an impact.</h1>
        <br />
        <h4 className='t_first_h4'>At Holded, we believe that daily admin should never stop a great idea from becoming a success. That's why we create intuitive software to empower anyone who dares to start their own business. Long story short: we want to make business simple. <br /> <br /> In order to create cutting-edge products that meet the needs of the sector, talent is essential. <strong> We are looking for passion, creativity and commitment.</strong> In return, we offer the same. <br /> <br /> Think you fit the bill? We'd love to hear from you!</h4>
      </div>
      <div className="results">
       <div className="container results_container">
         <h1 className='results_h1'>Holded in numbers</h1>
        <div className='result_cards'>
          <div className="result_card">
            <h2>+80K</h2>
            <p>Users</p>
          </div>
          <div className="result_card">
            <h2>+126</h2>
            <p>Partners</p>
          </div>
          <div className="result_card">
            <h2>+140</h2>
            <p>Employees</p>
          </div>
          <div className="result_card">
            <h2>+19</h2>
            <p>Nationalities</p>
          </div>
        </div>
       </div>
      </div>
      <div className="story">
       <div className='container story_container'>
         <div className="story_right">
          <h1>Our story...</h1>
        </div>
        <div className="story_left">
          <div className='story_box'>
            <button><HiUsers /></button>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, fuga.</h5>
            <p>2015</p>
          </div>
          <div className='story_box'>
            <button><HiCurrencyDollar /></button>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, fuga.</h5>
            <p>2015</p>
          </div>
          <div className='story_box'>
            <button><HiCurrencyDollar /></button>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, fuga.</h5>
            <p>2015</p>
          </div>
          <div className='story_box'>
            <button><LuChartNoAxesCombined /></button>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, fuga.</h5>
            <p>2015</p>
          </div>
          <div className='story_box'>
            <button><FaBuilding /></button>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, fuga.</h5>
            <p>2015</p>
          </div>
          <div className='story_box'>
            <button><IoHome /></button>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, fuga.</h5>
            <p>2015</p>
          </div>
        </div>
       </div>
      </div>
      <div className="learning">
        <div className="container learning_container">
          <div className='learn_left'>
            <h1>Continuous learning</h1>
            <br />
            <p>We have a horizontal system, a real one. At Holded you will be able to give your opinion, debate, disagree, suggest, propose... and, above all, learn. The best part is that you will shape great ideas hand in hand with your team.</p>
          </div>
           <iframe className='first_video' title="vimeo-player" src="https://player.vimeo.com/video/760237911?h=25f8830e62" width="640" height="360" frameborder="0"    allowfullscreen></iframe>
        </div>
      </div>
      <div className="value">
        <div className="container value_container">
          <h1 className='value_h1'>Our values</h1>
          <div className="value_box">
            <div className="value_card">
            <GoStar className='value_icon'/>
            <h3>Excellence</h3>
            <p>High standards are a way of life. Each of us strive to be the best version of ourselves and be part of a team with the same objectives.</p>
          </div>
          <div className="value_card">
            <FaRegHeart className='value_icon'/>
            <h3>Passion</h3>
            <p>It is what gives meaning to our work and what makes us go for more. And we use it to energize, engage and inspire others.</p>
          </div>
          <div className="value_card">
            <IoFlagOutline className='value_icon'/>
            <h3>Ambition</h3>
            <p>We are eager to become the best company of our kind and to help our customers become the best in their industries, too.</p>
          </div>
          <div className="value_card">
            <PiUsersThree className='value_icon'/>
            <h3>Commitment</h3>
            <p>Lasting relationships are the lifeblood of our business. Sharing a common goal within the company and clients is of paramount importance.</p>
          </div>
          <div className="value_card">
            <SlPencil className='value_icon'/>
            <h3>Innovation</h3>
            <p>For us, experimenting, inventing and innovating is the norm. We want to evolve with our customers, and that's what keeps us going forward.</p>
          </div>
          <div className="value_card">
            <PiStarFourBold className='value_icon'/>
            <h3>Transparency</h3>
            <p>We aim to make information accessible to everyone. Every employee has access to a Wiki with all essential information about Holded.</p>
          </div>
          </div>
        </div>
      </div>
       <div className="learning second">
        <div className="container learning_container">
          <iframe  className='second_video' title="vimeo-player" src="https://player.vimeo.com/video/760228363?h=ef125459cb" width="640" height="360" frameborder="0"    allowfullscreen></iframe>
            <div className='learn_left'>
            <h1>Draw your career path</h1>
            <br />
            <p>We value multi-skilled profiles. Once you join the team, nothing will stop your creativity or your desire to innovate. For example, in one of our brainstorming sessions, we came up with the idea of asking the city What is your dream?
              <br /> <br /> At Holded, we grow with you and we will give you everything we can to help you get where you want to be.</p>
          </div>
        </div>
      </div>
       <div className="container jobs-wrapper">
        <div className="dropdown-container">
          <label htmlFor="department">Select Department:</label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
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
      <div className="business">
        <div className="container business_container">
          <h1>Business recruitment process</h1>
          <img className='img_home' src={homeImageFirst} alt="" />
        </div>
      </div>
      <div className="learning second">
        <div className="container learning_container">
          <div className='learn_left'>
            <h1>Trust and experience</h1>
            <br />
            <p>One of the best things about Holded is that the people who have been there since the beginning are still with us - and in more senior roles. The key? Communication and being clear about the objectives of each team. This way, the product is excellent and the customers are happy. At the end of the day, nothing compares to the satisfaction of a job well done.</p>
          </div>
           <iframe className='first_video' title="vimeo-player" src="https://player.vimeo.com/video/757891971?h=6c7efb5a7c" width="640" height="360" frameborder="0"    allowfullscreen></iframe>
        </div>
      </div>
       <div className="business">
        <div className="container business_container">
          <h1>Engineering recruitment process:</h1>
          <img className='img_home_second' src={homeImageSecond} alt="" />
        </div>
      </div>
      <div className="perks">
       <div className="container perks_container">
         <div className="perks_left">
          Perks and benefits
        </div>
        <div className="perks_right">
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>Flexible working hours</p>
          </div>
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>26 paid days-off</p>
          </div>
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>Short work day on Fridays</p>
          </div>
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>Team Building Events</p>
          </div>
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>Yearly budget for individual training</p>
          </div>
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>Free English and Spanish lessons</p>
          </div>
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>Fully equipped kitchen with snacks, drinks and fresh fruit</p>
          </div>
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>Top-notch work equipment</p>
          </div>
          <div className='perks_box'>
            <button><FaCheck /></button>
            <p>Ping pong, pool table and gaming zone</p>
          </div>
        </div>
       </div>
      </div>
       <div className="learning third">
        <div className="container learning_container">
             <iframe className='first_video' title="vimeo-player" src="https://player.vimeo.com/video/757908715?h=52b05de5d9" width="640" height="360" frameborder="0"    allowfullscreen></iframe>
          <div className='learn_left h1'>
            <h1>Barcelona, a city to call home.</h1>
            <br />
            <p>Holded's talent comes from over 20 different countries. We like to think it's because of the good vibes, the great perks, and the views from the office, but we know it's actually because of the large selection of snacks. Jokes aside, having a multicultural team enriches all aspects of our day-to-day life and has helped us get to where we are today. No matter where you come from, what makes a difference is that you want to stay.</p>
          </div>
          
        </div>
      </div>
       <div className="glassdoor-container">
    <div className="header">
      <span className="logo">glassdoor</span>
      <span className="score">4,7</span>
      <span className="stars">★★★★★</span>
    </div>
    <div className="metrics">
      {metrics.map((item, index) => (
        <div className="metric" key={index}>
          <div className="circle">
            <svg viewBox="0 0 36 36">
              <path
                className="bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="progress"
                strokeDasharray={`${item.percent}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {item.percent}%
              </text>
            </svg>
          </div>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
      </div>
      <div className="join">
        <div className="container join_container">
          <h1>Why join us</h1>
          <ul className='join_collaction'>
            <li className='join_item'>Join because you’re constantly learning and want to improve. We think you will.</li>
            <li className='join_item'>Join because you want to work with a team that trusts you and rewards your achievements.</li>
            <li className='join_item'>Join because you want to grow as a professional, not chase your next paycheck.</li>
            <li className='join_item'>Join because you like our culture and share our values.</li>
            <li className='join_item'>Join because in three years time, when you look at this job on your CV, you want to be proud.</li>
          </ul>
        </div>
      </div>
      <div className='work'>
        <h1>Love your work</h1>
        <p>And where you work</p>
        <div className="container work_container">
          <img className='work_img' src="https://careers.recruiteecdn.com/image/upload/q_auto,f_auto,w_1920,c_limit/production/images/ARwe/po5E8m7GajyQ.jpeg" alt="" />
          <img className='work_img_old' src="https://careers.recruiteecdn.com/image/upload/q_auto,f_auto,w_1920,c_limit/production/images/9QI/Ue-mJpiDKz9s.jpeg" alt="" />
          <img className='work_img end' src="https://careers.recruiteecdn.com/image/upload/q_auto,f_auto,w_1920,c_limit/production/images/ARwf/RckyYr2szgHP.jpeg" alt="" />
        </div>
      </div>
      <div className="map">
          <div className='container map_container'>
            <div className='map_left'>
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.9365089867135!2d69.238373315428!3d41.31108137927115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b5e6b748d7f%3A0x4f62d43620c9a1c7!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1625235655560!5m2!1sen!2s"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
            <div className='map_right'>
              <h1>Location</h1>
              <p>Stunning sea views at our offices in sunny Barcelona. Next to the seaport of la Barceloneta close to the central area of the city. <br /><br /> Address <br /> Paseo Juan de Borbón 101, planta 6, 08039 Barcelona</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home