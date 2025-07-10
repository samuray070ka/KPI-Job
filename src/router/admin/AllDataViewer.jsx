import { useEffect, useState, useMemo } from "react";
import "./Admin.css";

function AllDataViewer({ lang = 'uz', t }) {
  const sectionLabels = t.sections;
  const sections = useMemo(() => Object.keys(sectionLabels || {}), [sectionLabels]);
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);

  const [editingItem, setEditingItem] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

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

  const handleEdit = (item, section) => {
    setEditingItem({ ...item });
    setCurrentSection(section);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/home/${currentSection}/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Ma'lumot yangilandi");
        setModalVisible(false);
        setEditingItem(null);
        const updatedData = allData[currentSection].map((d) =>
          d._id === editingItem._id ? editingItem : d
        );
        setAllData({ ...allData, [currentSection]: updatedData });
      } else {
        alert(`❌ ${data.message || 'Xatolik'}`);
      }
    } catch (error) {
      alert("❌ Xatolik yuz berdi");
    }
  };

  const handleDelete = async (itemId, section) => {
  if (!window.confirm("O'chirishga ishonchingiz komilmi?")) return;

  try {
    const res = await fetch(`http://localhost:5000/home/${section}/${itemId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      alert("✅ O'chirildi");
      const updatedData = allData[section].filter((d) => d._id !== itemId);
      setAllData({ ...allData, [section]: updatedData });
    } else {
      alert(`❌ ${data.message || "Xatolik yuz berdi"}`);
    }
  } catch (err) {
    alert("❌ O'chirishda xatolik yuz berdi");
  }
};


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
                      <button className="edit" onClick={() => handleEdit(item, sec)}>{t?.edit || "Edit"}</button>
                      <button className="delete" onClick={() => handleDelete(item._id, sec)}>
                        {t?.delete || "Delete"}
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Modal */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit {sectionLabels[currentSection]}</h3>
            <table className="admin-table">
              <tbody>
                {Object.entries(editingItem)
                  .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt', 'icon'].includes(key))
                  .map(([key, val]) => {
                    if (typeof val === 'object' && val !== null) {
                      return Object.entries(val).map(([langKey, subVal]) => (
                        <tr key={`${key}-${langKey}`}>
                          <td>{key}</td>
                          <td>{langKey.toUpperCase()}</td>
                          <td>
                            <input
                              value={subVal || ''}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  [key]: {
                                    ...editingItem[key],
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
                            value={val || ''}
                            onChange={(e) =>
                              setEditingItem({ ...editingItem, [key]: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="modal-actions">
              <button onClick={handleSave} className="save">{t?.submit || "Save"}</button>
              <button onClick={() => setModalVisible(false)} className="cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllDataViewer;