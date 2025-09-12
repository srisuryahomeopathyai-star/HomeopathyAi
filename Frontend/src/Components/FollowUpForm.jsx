// import React, { useState, useEffect } from "react";
// const FollowUpForm = ({ onSubmit, cases = [], initialData }) => {
//   const [formData, setFormData] = useState({
//     casesId: "",
//     patientName: "",
//     phoneNumber: "",
//     complaint: "",
//     prescription: "",
//     remarks: "",
//     date: new Date().toISOString().slice(0, 10),
//   });
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (initialData) {
//       setFormData({ ...initialData });
//     }
//   }, [initialData]);

//   const handleCaseChange = (e) => {
//     const selected = cases.find((c) => c._id === e.target.value);
//     if (selected) {
//       setFormData((prev) => ({
//         ...prev,
//         casesId: selected._id,
//         patientName: selected.name || "",
//         phoneNumber: selected.phone || "",
//       }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     await onSubmit(formData);
//     setSaving(false);
//     setFormData({
//       casesId: "",
//       patientName: "",
//       phoneNumber: "",
//       complaint: "",
//       prescription: "",
//       remarks: "",
//       date: new Date().toISOString().slice(0, 10),
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">
//         {initialData ? "Edit Follow-Up" : "Add Follow-Up"}
//       </h2>

//       <label>Patient Case:</label>
//       <select name="casesId" onChange={handleCaseChange} value={formData.casesId} required>
//         <option value="">-- Select a Case --</option>
//         {cases.map((c) => (
//           <option key={c._id} value={c._id}>
//             {c.name} ({c.phone})
//           </option>
//         ))}
//       </select>

//       <label>Patient Name:</label>
//       <input name="patientName" value={formData.patientName} onChange={handleChange} required />

//       <label>Phone Number:</label>
//       <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

//       <label>Complaint:</label>
//       <input name="complaint" value={formData.complaint} onChange={handleChange} />

//       <label>Prescription:</label>
//       <textarea name="prescription" value={formData.prescription} onChange={handleChange} />

//       <label>Remarks:</label>
//       <textarea name="remarks" value={formData.remarks} onChange={handleChange} />

//       <label>Date:</label>
//       <input type="date" name="date" value={formData.date} onChange={handleChange} required />

//       <button type="submit" disabled={saving} className="bg-blue-600 text-white p-2 rounded mt-3">
//         {saving ? "Saving..." : initialData ? "Update" : "Save"}
//       </button>
//     </form>
//   );
// };

// export default FollowUpForm;
import React, { useState, useEffect } from "react";
import "./followuppage.css";

const FollowUpForm = ({ onSubmit, onCancel, cases = [], initialData }) => {
  const [formData, setFormData] = useState({
    casesId: "",
    patientName: "",
    phoneNumber: "",
    complaint: "",
    prescription: "",
    remarks: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleCaseChange = (e) => {
    const selected = cases.find((c) => c._id === e.target.value);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        casesId: selected._id,
        patientName: selected.name || "",
        phoneNumber: selected.phone || "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit(formData);
    setSaving(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      casesId: "",
      patientName: "",
      phoneNumber: "",
      complaint: "",
      prescription: "",
      remarks: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel(); // notify parent if provided
  };

  return (
    <form onSubmit={handleSubmit} className="followup-form">
      <h2>{initialData ? "Edit Follow-Up" : "Add Follow-Up"}</h2>

      <div className="form-group">
        <label>Patient Case:</label>
        <select name="casesId" onChange={handleCaseChange} value={formData.casesId} required>
          <option value="">-- Select a Case --</option>
          {cases.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.phone})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Patient Name:</label>
        <input name="patientName" value={formData.patientName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Phone Number:</label>
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Complaint:</label>
        <input name="complaint" value={formData.complaint} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Prescription:</label>
        <textarea name="prescription" value={formData.prescription} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Remarks:</label>
        <textarea name="remarks" value={formData.remarks} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : initialData ? "Update" : "Save"}
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FollowUpForm;
