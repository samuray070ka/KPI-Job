import { useEffect, useState, useMemo } from "react";
import "./Admin.css";

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
  }, [sections]);

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div className="admin-tables">
      {sections.map((sec) => (
        <div key={sec}>
          <h2 className="section-stitle">{sectionLabels[sec]}</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Number</th>
                  <th>Year</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(allData[sec] || []).map((item, i) => (
                  <tr key={item._id || i}>
                    <td>{i + 1}</td>
                    <td>{item.label?.uz || item.title?.uz || item.department || '-'}</td>
                    <td>{item.number || '-'}</td>
                    <td>{item.year || '-'}</td>
                    <td>{item.type || '-'}</td>
                    <td>{item.location || '-'}</td>
                    <td>{item.description?.uz || '-'}</td>
                    <td>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt="preview" style={{ width: "60px", height: "auto" }} />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <button className="edit">Tahrirlash</button>
                      <button className="delete">O'chirish</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllDataViewer;