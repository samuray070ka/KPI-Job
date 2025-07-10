import { useState, useEffect } from 'react';
import './Admin.css';
import AllDataViewer from './AllDataViewer';
import translations from './i18n';

function AdminPage() {
  const [section, setSection] = useState('results');
  const [lang, setLang] = useState(localStorage.getItem('adminLang') || 'uz');
  const t = translations[lang] || translations.uz;
  const sectionLabels = t.sections;

  useEffect(() => {
    localStorage.setItem('adminLang', lang);
  }, [lang]);

  const [result, setResult] = useState({ number: '', label: { uz: '', ru: '', en: '' } });
  const [story, setStory] = useState({ description: { uz: '', ru: '', en: '' }, year: '' });
  const [value, setValue] = useState({ title: { uz: '', ru: '', en: '' }, description: { uz: '', ru: '', en: '' } });
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

    const hasEmptyFields = (obj) => {
      for (let key in obj) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          for (let subKey in value) {
            if (value[subKey] === '') return true;
          }
        } else {
          if (value === '' || value === null) return true;
        }
      }
      return false;
    };

    if (hasEmptyFields(current.data)) {
      alert(`❌ ${t.fillAll}`);
      return;
    }

    const res = await fetch(`http://localhost:5000/home${current.url}`, {
      method: 'POST',
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
      alert(`❌ ${t.error}: ${resultData.message}`);
      return;
    }

    alert(`✅ ${sectionLabels[section]} ${t.success}`);

    // Reset form
    const resetObj = {};
    for (let key in current.data) {
      if (key === 'imageFile') resetObj[key] = null;
      else if (typeof current.data[key] === 'object') {
        const sub = {};
        for (let subKey in current.data[key]) sub[subKey] = '';
        resetObj[key] = sub;
      } else resetObj[key] = '';
    }
    current.setData(resetObj);
  };

  const renderSection = () => {
    if (section === 'view-all') {
      return <AllDataViewer lang={lang} t={t} sectionLabels={sectionLabels} />;
    }

    const currentData = endpoints[section].data;
    const setCurrentData = endpoints[section].setData;

    return (
      <div className="admin">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{sectionLabels[section]} {t.add}</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t.field}</th>
                  <th>{t.language}</th>
                  <th>{t.value}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(currentData).map(([key, value]) => {
                  if (key === 'imageFile') {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>-</td>
                        <td>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setCurrentData({ ...currentData, imageFile: e.target.files[0] })
                            }
                          />
                        </td>
                      </tr>
                    );
                  }

                  if (typeof value === 'object') {
                    return Object.entries(value).map(([langKey, val]) => (
                      <tr key={`${key}-${langKey}`}>
                        <td>{key}</td>
                        <td>{langKey.toUpperCase()}</td>
                        <td>
                          <input
                            className="sa"
                            type="text"
                            value={val}
                            onChange={(e) =>
                              setCurrentData({
                                ...currentData,
                                [key]: {
                                  ...currentData[key],
                                  [langKey]: e.target.value,
                                },
                              })
                            }
                          />
                        </td>
                      </tr>
                    ));
                  }

                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>-</td>
                      <td>
                        <input
                          className="sa"
                          type={key.toLowerCase().includes('number') ? 'number' : 'text'}
                          value={value}
                          onChange={(e) =>
                            setCurrentData({ ...currentData, [key]: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button type="submit" className="btn_send">{t.submit}</button>
        </form>
      </div>
    );
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Admin</h2>
        <div style={{ marginBottom: "20px" }}>
          <select
            id="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="lang-dropdown"
          >
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

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