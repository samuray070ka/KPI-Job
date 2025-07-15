import { useState, useEffect } from 'react';
import "./Home.css";
import homeImageFirst from '../../assets/CEbZrJcVt13J.webp';
import homeImageSecond from '../../assets/MSuhC8ollm9F.webp';
import { useLang } from '../../LanguageContext.jsx'; 
import { Link } from 'react-router-dom';
import { BiSolidBuildingHouse } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import {
  FaStar, FaHeart, FaFlag, FaUsers, FaPen, FaMagic, FaCheck
} from "react-icons/fa";


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
  const iconMap = {
  star: <FaStar className="value_icon" />,
  heart: <FaHeart className="value_icon" />,
  flag: <FaFlag className="value_icon" />,
  users: <FaUsers className="value_icon" />,
  pen: <FaPen className="value_icon" />,
  magic: <FaMagic className="value_icon" />
};

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
      const normalizedDept = job.department.charAt(0).toUpperCase() + job.department.slice(1).toLowerCase();
      if (!deptGrouped[normalizedDept]) {
        deptGrouped[normalizedDept] = [];
      }
      deptGrouped[normalizedDept].push(job);
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

  const { lang } = useLang();
  const t = {
    banner: { uz: 'Sizning sayohatingiz shu erda boshlanadi.', ru: 'Ваше путешествие начинается здесь.', en: 'Your journey starts here' },

    banner_btn: { uz: 'Ochiq pozitsiyalar', ru: 'Открытые позиции', en: 'Open positions' },

    join: { uz: "Jamoaga qo'shiling, ta'sir o'tkazing.", ru: 'Присоединяйтесь к команде, внесите свой вклад.', en: 'Join the team, make an impact.' },

    join_text: { uz: "Holded kompaniyasida biz kundalik administrator hech qachon ajoyib g'oyani muvaffaqiyatga erishishdan to'xtatmasligi kerakligiga ishonamiz. Shuning uchun biz o'z biznesini boshlashga jur'at etgan har bir kishini kuchaytirish uchun intuitiv dasturiy ta'minot yaratamiz.Sektor ehtiyojlariga javob beradigan zamonaviy mahsulotlarni yaratish uchun iste'dod kerak. Biz ishtiyoq, ijodkorlik va sadoqatni qidiramiz.Hisobga mos deb o'ylaysizmi? Sizdan eshitishni istardik!", ru: 'В Holded мы убеждены, что ежедневные административные задачи не должны мешать достижению успеха отличной идеи. Именно поэтому мы создаём интуитивно понятное программное обеспечение, которое поможет каждому, кто осмеливается начать свой бизнес.Для создания передовых продуктов, отвечающих потребностям отрасли, необходим талант. Мы ищем увлечённых, креативных и преданных своему делу людей. Думаете, вы нам подходите? Будем рады узнать ваше мнение!', en: "At Holded, we believe that daily admin should never stop a great idea from becoming a success. That's why we create intuitive software to empower anyone who dares to start their own business.In order to create cutting-edge products that meet the needs of the sector, talent is essential. We are looking for passion, creativity and commitment. Think you fit the bill? We'd love to hear from you!" },

    result: { uz: 'Raqamlarda saqlanadi', ru: 'Удерживаемые в цифрах', en: 'Holded in numbers' },

    story: { uz: 'Bizning hikoyamiz ...', ru: 'Наша история...', en: 'Our story...' },

    video_first: { uz: "Uzluksiz o'rganish", ru: 'Непрерывное обучение', en: 'Continuous learning' },

    video_first_text: { uz: "Bizda gorizontal tizim mavjud, haqiqiy. Holded-da siz o'z fikringizni bildirishingiz, bahslashishingiz, rozi bo'lmaysiz, taklif qilishingiz, taklif qilishingiz... va eng muhimi, o'rganishingiz mumkin. Eng yaxshi tomoni shundaki, siz jamoangiz bilan birgalikda ajoyib g'oyalarni shakllantirasiz.", ru: 'У нас настоящая горизонтальная система. В Holded вы сможете высказывать своё мнение, спорить, не соглашаться, предлагать, предлагать... и, самое главное, учиться. Самое приятное — вы будете воплощать отличные идеи в жизнь рука об руку со своей командой.', en: 'We have a horizontal system, a real one. At Holded you will be able to give your opinion, debate, disagree, suggest, propose... and, above all, learn. The best part is that you will shape great ideas hand in hand with your team.' },

    value: { uz: 'Bizning qadriyatlarimiz', ru: 'Наши ценности', en: 'Our values' },

    video_second: { uz: "Karyera yo'lingizni chizing", ru: 'Нарисуйте свой карьерный путь', en: 'Draw your career path' },

    video_second_text: { uz: `Biz ko'p malakali profillarni qadrlaymiz...Biz ko'p malakali profillarni qadrlaymiz. Jamoaga qo'shilganingizdan so'ng, hech narsa sizning ijodingizni yoki innovatsiyaga bo'lgan xohishingizni to'xtata olmaydi. Misol uchun, aqliy hujum mashg'ulotlarimizdan birida biz shaharga "Sizning orzuingiz nima?"Holded-da biz siz bilan birga rivojlanamiz va siz bo'lishni xohlagan joyingizga erishishingizga yordam berish uchun qo'limizdan kelgan hamma narsani beramiz.`, ru: 'Мы ценим многопрофильные навыки... Мы ценим многопрофильные навыки. Как только вы присоединитесь к команде, ничто не сможет остановить вашу креативность и стремление к инновациям. Например, в ходе одного из наших мозговых штурмов мы предложили спросить у города: «О чём вы мечтаете?» В Holded мы растем вместе с вами и сделаем всё возможное, чтобы помочь вам достичь желаемого.', en: 'We value multi-skilled profiles...We value multi-skilled profiles. Once you join the team, nothing will stop your creativity or your desire to innovate. For example, in one of our brainstorming sessions, we came up with the idea of asking the city What is your dream?At Holded, we grow with you and we will give you everything we can to help you get where you want to be.' },

    job: { uz: 'Ochiq pozitsiyalar', ru: 'Открытые позиции', en: 'Open positions' },

    business: { uz: 'Biznesni yollash jarayoni', ru: 'Процесс подбора персонала для бизнеса', en: 'Business recruitment process' },

    video_third: { uz: 'Ishonch va tajriba', ru: 'Доверие и опыт', en: 'Trust and experience' },
    video_third_text: { uz: `Holdedning eng yaxshi jihatlaridan biri shundaki, boshidan beri u erda bo'lgan odamlar hali ham biz bilan - va kattaroq rollarda. Kalit? Muloqot va har bir jamoaning maqsadlari haqida aniq bo'lish. Shunday qilib, mahsulot ajoyib va ​​mijozlar mamnun. Oxir oqibat, yaxshi bajarilgan ishdan qoniqish bilan hech narsa taqqoslanmaydi.`, ru: 'Одно из лучших преимуществ Holded — это то, что люди, работавшие с самого начала, до сих пор с нами, причём на более высоких должностях. Ключ к успеху — коммуникация и чёткое понимание целей каждой команды. Благодаря этому продукт получается превосходным, а клиенты довольны. В конце концов, ничто не сравнится с удовлетворением от хорошо выполненной работы.', en: 'One of the best things about Holded is that the people who have been there since the beginning are still with us - and in more senior roles. The key? Communication and being clear about the objectives of each team. This way, the product is excellent and the customers are happy. At the end of the day, nothing compares to the satisfaction of a job well done.' },

    business_second: { uz: 'Muhandislarni ishga olish jarayoni', ru: 'Процесс подбора инженерных кадров', en: 'Engineering recruitment process' },

    perks: { uz: 'Imtiyozlar va imtiyozlar', ru: 'Преимущества и выгоды', en: 'Perks and benefits' },

    video_four: { uz: `Barselona, ​​uyga qo'ng'iroq qilish uchun shahar.`, ru: 'Барселона — город, который можно назвать домом.', en: 'Barcelona, a city to call home.' },

    video_four_text: {uz: "Xoldning iste'dodi 20 dan ortiq turli mamlakatlardan keladi. Biz buni yaxshi tebranishlar, ajoyib imtiyozlar va ofis manzaralari tufayli deb o'ylashni yaxshi ko'ramiz, lekin biz bilamizki, bu gazaklarning katta tanlovi tufayli. Hazillarni bir chetga surib qo‘ysak, ko‘p madaniyatli jamoaga ega bo‘lish kundalik hayotimizning barcha jabhalarini boyitadi va bugungi kunga yetishimizga yordam beradi. Qayerdan kelganingizdan qat'iy nazar, siz qolishni xohlayotganingiz farq qiladi.", ru: "В Holded работают специалисты из более чем 20 стран. Нам нравится думать, что это благодаря приятной атмосфере, отличным бонусам и видам из офиса, но мы знаем, что на самом деле это благодаря большому выбору закусок. Шутки в сторону, многонациональная команда обогащает все аспекты нашей повседневной жизни и помогла нам достичь того, что мы имеем сегодня. Неважно, откуда вы родом, важно то, что вы хотите остаться.", en: "Holded's talent comes from over 20 different countries. We like to think it's because of the good vibes, the great perks, and the views from the office, but we know it's actually because of the large selection of snacks. Jokes aside, having a multicultural team enriches all aspects of our day-to-day life and has helped us get to where we are today. No matter where you come from, what makes a difference is that you want to stay."},

    why: { uz: `Nega bizga qo'shiling`, ru: 'Почему стоит присоединиться к нам?', en: 'Why join us' },

    why_text: { uz: `Qo'shiling, chunki siz doimo o'rganyapsiz...  `, ru: 'Присоединяйтесь, потому что вы постоянно учитесь... ', en: 'Join because you’re constantly learning...  ' },

    first: {uz: " Qo'shiling, chunki sizga ishonadigan jamoa bilan ishlashni xohlaysiz...", ru: " Присоединяйтесь, потому что вы хотите работать в команде, которая вам доверяет... ", en: "Join because you want to work with a team that trusts you..."},

    second: {uz: " Qo'shiling, chunki professional sifatida o'sishni xohlaysiz...", ru: "Присоединяйтесь, потому что вы хотите расти как профессионал...", en: "Join because you want to grow as a professional..."},

    third: {uz: "Qo'shiling, chunki sizga madaniyatimiz yoqadi...", ru: "Присоединяйтесь, потому что вам нравится наша культура... ", en: " Join because you like our culture..."},

    four: {uz: "Qo'shiling, chunki uch yildan keyin...", ru: "Присоединяйтесь, потому что через три года...", en: "Join because in three years time..."},

    work: { uz: 'Ishingizni seving', ru: 'Люблю свою работу', en: 'Love your work' },

    work_text: { uz: 'Va qaerda ishlaysiz', ru: 'И где ты работаешь', en: 'And where you work' },

    footer: { uz: `Ishga qabul qilingan / Karyera`, ru: 'Holded / Карьера', en: 'holded / Careers' }
  };
  console.log(values);

  return (
    <div className='home'>
      <div className="banner_first">
        <div className='box'>
          <h1 className='first_h1'>{t.banner[lang]}</h1>
          <button className='first_btn'>
            <a className='link' href="#jobs">{t.banner_btn[lang]}</a>
          </button>
        </div>
      </div>

      <div className="text_first">
        <h1 className='t_first_h1'>{t.join[lang]}</h1>
        <br />
        <h4 className='t_first_h4'>
          {t.join_text[lang]}
        </h4>
      </div>

      <div className="results">
        <div className="container results_container">
          <h1 className='results_h1'>{t.result[lang]}</h1>
          <div className='result_cards'>
            {results.map((item, i) => (
              <div className="result_card" key={i}>
                <h2>{item.number}</h2>
                <p>{item.label[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="story">
        <div className='container story_container'>
          <div className="story_right">
            <h1>{t.story[lang]}</h1>
          </div>
          <div className="story_left">
            {stories.map((item, i) => (
              <div className='story_box' key={i}>
                <button><FaCheck/></button>
                <h5>{item.description[lang]}</h5>
                <p>{item.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="learning">
        <div className="container learning_container first_vide">
          <div className='learn_left media_box_first'>
            <h1>{t.video_first[lang]}</h1>
            <br />
            <p>{t.video_first_text[lang]}</p>
          </div>
          <iframe className='first_video' title="vimeo-player" frameBorder="0" src="https://player.vimeo.com/video/760237911?h=25f8830e62" width="640" height="360"></iframe>
        </div>
      </div>

       <div id='culture' className="value">
      <div className="container value_container">
        <h1 className='value_h1'>{t.value[lang]}</h1>
        <div className="value_box">
          {values.map((item, i) => (
            <div className="value_card" key={i}>
              {iconMap[item.icon?.toLowerCase()] || <FaCheck className="value_icon" />}
              <h3>{item.title[lang]}</h3>
              <p>{item.description[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

      <div className="learning second media">
        <div className="container learning_container media_box">
          <iframe className='second_video media_video_first' title="vimeo-player" frameBorder="0" src="https://player.vimeo.com/video/760228363?h=ef125459cb" width="640" height="360"></iframe>
          <div className='learn_left media_text media_box_first'>
            <h1>{t.video_second[lang]}</h1>
            <p>{t.video_second_text[lang]}</p>
          </div>
        </div>
      </div>

      <div id='jobs' className="container jobs-wrapper">
        <h1>{t.job[lang]}</h1>
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
         {selectedJobs.map((job, index) => {
            return (
              <Link className='link' to={`/job/${job.slug}`} key={index}>
                <div className="job-card">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-details">
                    <span><BiSolidBuildingHouse className='color'/> {job.type}</span>
                    <span><MdLocationPin className='color'/> {job.location}</span>
                  </div>
                  <button className="view-job-btn">View job</button>
                </div>
              </Link>
            );
          })}

        </div>
      </div>

      <div className="business">
        <div className="container business_container">
          <h1>{t.business[lang]}</h1>
          <img className='img_home' src={homeImageFirst} alt="" />
        </div>
      </div>

      <div className="learning second ">
        <div className="container learning_container ">
          <div className='learn_left media_box_first '>
            <h1>{t.video_third[lang]}</h1>
            <p>{t.video_third_text[lang]}</p>
          </div>
          <iframe className='first_video' title="vimeo-player" frameBorder="0" src="https://player.vimeo.com/video/757891971?h=6c7efb5a7c" width="640" height="360"></iframe>
        </div>
      </div>

      <div className="business">
        <div className="container business_container">
          <h1>{t.business_second[lang]}</h1>
          <img className='img_home_second' src={homeImageSecond} alt="" />
        </div>
      </div>

      <div id='perks' className="perks">
        <div className="container perks_container">
          <div className="perks_left">{t.perks[lang]}</div>
          <div className="perks_right">
            {perks.map((item, i) => (
              <div className='perks_box' key={i}>
                <button><FaCheck /></button>
                <p>{item.label[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="learning third fixed">
        <div className="container learning_container vles">
          <iframe className='first_video' title="vimeo-player" frameBorder="0" src="https://player.vimeo.com/video/757908715?h=52b05de5d9" width="640" height="360"></iframe>
          <div className='learn_left h1 medi'>
            <h1>{t.video_four[lang]}</h1>
            <p>{t.video_four_text[lang]}</p>
          </div>
        </div>
      </div>

      <div className="join">
        <div className="container join_container">
          <h1>{t.why[lang]}</h1>
          <ul className='join_collaction'>
            <li className='join_item'>{t.why_text[lang]}</li>
            <li className='join_item'>{t.first[lang]}</li>
            <li className='join_item'>{t.second[lang]}</li>
            <li className='join_item'>{t.third[lang]}</li>
            <li className='join_item'>{t.four[lang]}</li>
          </ul>
        </div>
      </div>

     <div className='work'>
        <h1>{t.work[lang]}</h1>
        <p>{t.work_text[lang]}</p>
        <div className="container work_container">
          {workImages.map((img, i) => (
            <img key={i} className="work_img" src={img.imageUrl} alt={`Work ${i}`} />
          ))}
        </div>
      </div>

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
              <h1>{locationData.title[lang]}</h1>
              <p>{locationData.description[lang]}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;