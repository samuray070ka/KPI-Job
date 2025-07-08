import { useState } from 'react';
import './Admin.css';

function AdminPage() {
  const [section, setSection] = useState('results'); // 'text' emas, 'results' ni default qildik

  const [result, setResult] = useState({ number: '', label: '' });
  const [story, setStory] = useState({ description: '', year: '', icon: '' });
  const [value, setValue] = useState({ title: '', description: '', icon: '' });
  const [job, setJob] = useState({ department: '', title: '', type: '', location: '' });
  const [perk, setPerk] = useState({ label: '' });
  const [work, setWork] = useState({ imageFile: null });
  const [location, setLocation] = useState({ title: '', description: '', mapEmbedUrl: '' });

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

    const isEmptyField = Object.entries(current.data).some(([key, value]) => {
      if (typeof value === 'boolean') return false;
      if (key === 'imageFile') return value === null;
      return value.trim() === '';
    });

    if (isEmptyField) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      let res;
      if (section === 'work' && current.data.imageFile) {
        const formData = new FormData();
        formData.append('image', current.data.imageFile);

        res = await fetch(`http://localhost:5000/home${current.url}`, {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await fetch(`http://localhost:5000/home${current.url}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(current.data),
        });
      }

      const resultData = await res.json();

      if (!res.ok) {
        alert(`❌ Xatolik: ${resultData.message}`);
        return;
      }

      alert(`✅ ${section} muvaffaqiyatli qo'shildi!`);

      // Reset form after submit
      const resetObj = {};
      for (let key in current.data) {
        resetObj[key] = typeof current.data[key] === 'boolean' ? false : (key === 'imageFile' ? null : '');
      }
      current.setData(resetObj);
    } catch (err) {
      console.error("Xatolik:", err);
      alert("❌ Serverga ulanishda xatolik yuz berdi.");
    }
  };

  const renderForm = () => {
    const current = endpoints[section];

    return (
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{section.toUpperCase()} qo'shish</h2>
        {Object.keys(current.data).map((key) => {
          if (key === 'imageFile') {
            return (
              <input
                key={key}
                type="file"
                accept="image/*"
                onChange={(e) => current.setData({ ...current.data, [key]: e.target.files[0] })}
              />
            );
          }

          const type = key.toLowerCase().includes('number') ? 'number' : 'text';

          return (
            <input
            className='sa'
              key={key}
              type={type}
              placeholder={key}
              value={current.data[key]}
              onChange={(e) => current.setData({ ...current.data, [key]: e.target.value })}
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
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <div className="admin-content">{renderForm()}</div>
    </div>
  );
}

export default AdminPage;