import { useEffect, useState, useMemo } from "react";
import "./Admin.css";

// Har bir bo'lim uchun ko'rsatiladigan nomlar
const sectionLabels = {
  results: "Holded in numbers",
  story: "Our story",
  values: "Our values",
  jobs: "Open positions",
  perks: "Perks and benefits",
  work: "Love your work",
  location: "Location",
};

function AllDataViewer() {
  // Memo orqali sections ni qayta hisoblanishini oldini olamiz
  const sections = useMemo(() => Object.keys(sectionLabels), []);
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const temp = {};
      for (let section of sections) {
        try {
          const res = await fetch(`http://localhost:5000/home/${section}`);
          const data = await res.json();
          temp[section] = data;
        } catch (err) {
          temp[section] = [];
        }
      }
      setAllData(temp);
      setLoading(false);
    }

    fetchAll();
  }, [sections]); // useMemo tufayli bu qiymat hech qachon o'zgarmaydi

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div className="card-grid">
      {sections.map((sec) => (
        <div key={sec}>
          <h2 className="section-stitle">{sectionLabels[sec]}</h2>
          {(allData[sec] || []).map((item, i) => (
            <div key={item._id || i} className="admin-card">
              <h3>
                Title:{" "}
                {item.label?.uz ||
                  item.title?.uz ||
                  item.department ||
                  `Item ${i + 1}`}
              </h3>

              {item.number && (
                <p>
                  <strong>Number:</strong> {item.number}
                </p>
              )}
              {item.year && (
                <p>
                  <strong>Year:</strong> {item.year}
                </p>
              )}
              {item.type && (
                <p>
                  <strong>Type:</strong> {item.type}
                </p>
              )}
              {item.location && (
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
              )}
              {item.description?.uz && (
                <p>
                  <strong>Description:</strong> {item.description.uz}
                </p>
              )}

              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={
                    item.label?.uz ||
                    item.title?.uz ||
                    item.department ||
                    `Item ${i + 1}`
                  }
                  style={{
                    width: "100%",
                    height: "auto",
                    marginTop: "10px",
                  }}
                  />
              )}

              <button className="edit">Tahrirlash</button>
              <button className="delete">O'chirish</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AllDataViewer;