import { useEffect, useState, useMemo } from "react";
import "./Admin.css";

function AllDataViewer({ lang = 'uz', t }) {
  const sectionLabels = t.sections;
  const sections = useMemo(() => Object.keys(sectionLabels || {}), [sectionLabels]);
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
        } catch {
          temp[section] = [];
        }
      }
      setAllData(temp);
      setLoading(false);
    }

    fetchAll();
  }, [sections]);

  if (loading) return <p>{t?.loading || "Yuklanmoqda..."}</p>;

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
                  <th>{t?.title || "Title"}</th>
                  <th>{t?.number || "Number"}</th>
                  <th>{t?.year || "Year"}</th>
                  <th>{t?.type || "Type"}</th>
                  <th>{t?.location || "Location"}</th>
                  <th>{t?.description || "Description"}</th>
                  <th>{t?.image || "Image"}</th>
                  <th>{t?.actions || "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {(allData[sec] || []).map((item, i) => (
                  <tr key={item._id || i}>
                    <td>{i + 1}</td>
                    <td>{item.label?.[lang] || item.title?.[lang] || item.department || '-'}</td>
                    <td>{item.number || '-'}</td>
                    <td>{item.year || '-'}</td>
                    <td>{item.type || '-'}</td>
                    <td>{item.location || '-'}</td>
                    <td>{item.description?.[lang] || '-'}</td>
                    <td>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt="preview" style={{ width: "60px" }} />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <button className="edit">{t?.edit || "Edit"}</button>
                      <button className="delete">{t?.delete || "Delete"}</button>
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