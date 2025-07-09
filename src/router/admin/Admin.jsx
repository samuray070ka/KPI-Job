import { useState } from 'react';
import './Admin.css';
import AllDataViewer from './AllDataViewer';

function AdminPage() {
  const sectionLabels = {
  results: 'Holded in numbers',
  story: 'Our story',
  values: 'Our values',
  jobs: 'Open positions',
  perks: 'Perks and benefits',
  work: 'Love your work',
  location: 'Location',
  'view-all': "Previous information",
};

  const [section, setSection] = useState('results');

  const [result, setResult] = useState({ number: '', label: { uz: '', ru: '', en: '' } });
  const [story, setStory] = useState({ description: { uz: '', ru: '', en: '' }, year: '', icon: '' });
  const [value, setValue] = useState({ title: { uz: '', ru: '', en: '' }, description: { uz: '', ru: '', en: '' }, icon: '' });
  const [job, setJob] = useState({ department: '', title: '', type: '', location: '' });
  const [perk, setPerk] = useState({ label: { uz: '', ru: '', en: '' } });
  const [work, setWork] = useState({ imageFile: null });
  const [location, setLocation] = useState({
    title: { uz: '', ru: '', en: '' },
    description: { uz: '', ru: '', en: '' },
    mapEmbedUrl: ''
  });

  const endpoints = {
    results: { url: '/results', data: result, setData: setResult },
    story: { url: '/story', data: story, setData: setStory },
    values: { url: '/values', data: value, setData: setValue },
    jobs: { url: '/jobs', data: job, setData: setJob },
    perks: { url: '/perks', data: perk, setData: setPerk },
    work: { url: '/work', data: work, setData: setWork },
    location: { url: '/location', data: location, setData: setLocation },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const current = endpoints[section];

    const res = await fetch(`http://localhost:5000/home${current.url}`, {
      method: section === 'work' ? 'POST' : 'POST',
      headers: section === 'work' ? {} : { 'Content-Type': 'application/json' },
      body: section === 'work'
        ? (() => {
            const formData = new FormData();
            formData.append('image', current.data.imageFile);
            return formData;
          })()
        : JSON.stringify(current.data),
    });

    const resultData = await res.json();

    if (!res.ok) {
      alert(`❌ Xatolik: ${resultData.message}`);
      return;
    }

    alert(`✅ ${section} muvaffaqiyatli qo'shildi!`);

    // Reset
    const resetObj = {};
    for (let key in current.data) {
      if (key === 'imageFile') resetObj[key] = null;
      else if (typeof current.data[key] === 'object') {
        const sub = {};
        for (let subKey in current.data[key]) {
          sub[subKey] = '';
        }
        resetObj[key] = sub;
      } else {
        resetObj[key] = '';
      }
    }
    current.setData(resetObj);
  };

 const renderSection = () => {
  if (section === 'view-all') return <AllDataViewer />;
  else return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{sectionLabels[section]} qo'shish</h2>
      {Object.entries(endpoints[section].data).map(([key, value]) => {
        if (key === 'imageFile') {
          return (
            <input
              key={key}
              type="file"
              accept="image/*"
              onChange={(e) =>
                endpoints[section].setData({
                  ...endpoints[section].data,
                  imageFile: e.target.files[0],
                })
              }
            />
          );
        }

        if (typeof value === 'object') {
          return Object.keys(value).map((lang) => (
            <input
              className="sa"
              key={`${key}-${lang}`}
              type="text"
              placeholder={`${key} [${lang}]`}
              value={value[lang]}
              onChange={(e) =>
                endpoints[section].setData({
                  ...endpoints[section].data,
                  [key]: {
                    ...endpoints[section].data[key],
                    [lang]: e.target.value,
                  },
                })
              }
            />
          ));
        }

        const type = key.toLowerCase().includes('number') ? 'number' : 'text';

        return (
          <input
            className="sa"
            key={key}
            type={type}
            placeholder={key}
            value={value}
            onChange={(e) =>
              endpoints[section].setData({
                ...endpoints[section].data,
                [key]: e.target.value,
              })
            }
          />
        );
      })}

      <button type="submit">Yuborish</button>
    </form>
  );
};


  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Admin</h2>
        {Object.keys(endpoints).map((key) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className={section === key ? 'active' : ''}
          >
            {sectionLabels[key]}
          </button>
        ))}
        <button
          onClick={() => setSection('view-all')}
          className={section === 'view-all' ? 'active' : ''}
        >
          {sectionLabels['view-all']}
        </button>
      </div>

      <div className="admin-content">{renderSection()}</div>
    </div>
  );
}

export default AdminPage;