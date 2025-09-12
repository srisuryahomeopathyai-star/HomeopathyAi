// import React, { useState, useEffect } from "react";
// import FollowUpForm from "./FollowUpForm";
// import FollowUps from "./FollowUps";
// import "./followuppage.css";
// const FollowUpPage = () => {
//   const [followUps, setFollowUps] = useState([]);
//   const [cases, setCases] = useState([]);
//   const [autoExpectedFollowUps, setAutoExpectedFollowUps] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [casesRes, followRes] = await Promise.all([
//         fetch(`${API_URL}/api/cases`),
//         fetch(`${API_URL}/api/followups`)
//       ]);
//       const [casesData, followData] = await Promise.all([
//         casesRes.json(),
//         followRes.json()
//       ]);

//       setCases(casesData);
//       setFollowUps(followData);

//       const autoFollowUps = casesData
//         .filter((c) => c.dateOfVisit)
//         .map((c) => {
//           const expected = new Date(c.dateOfVisit);
//           expected.setDate(expected.getDate() + 15);
//           return {
//             ...c,
//             expectedFollowUpDate: expected.toISOString().split("T")[0],
//             patientName: c.name,
//             phoneNumber: c.phone
//           };
//         });

//       setAutoExpectedFollowUps(autoFollowUps);
//     } catch (err) {
//       console.error("Failed to fetch data:", err);
//     }
//   };

//   const handleAddFollowUp = async (data) => {
//     try {
//       const res = await fetch(`${API_URL}/api/followups`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//       });
//       const saved = await res.json();
//       setFollowUps((prev) => [...prev, saved]);
//     } catch (err) {
//       alert("Failed to add follow-up.");
//     }
//   };

//   const todays = followUps.filter((f) => f.date === selectedDate);
//   const existingTodayIds = todays.map((f) => f.casesId || f.patientId);
//   const autoExpectedFiltered = autoExpectedFollowUps.filter(f => !existingTodayIds.includes(f._id));
//   const autos = autoExpectedFollowUps.filter((a) => a.expectedFollowUpDate === selectedDate);

//   return (
//     <div className="followup-container">
//       <FollowUpForm onSubmit={handleAddFollowUp} cases={cases} />

//       <div className="max-w-3xl mx-auto mt-6">
//         <label className="font-semibold">Select Date:</label>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="block border p-2 rounded my-2"
//         />

//         <h3 className="text-xl font-bold mt-4 text-green-700">
//           Follow-ups on {selectedDate}
//         </h3>
//         {todays.length === 0 ? (
//           <p className="text-gray-500">No follow-ups.</p>
//         ) : (
//           <ul className="space-y-3">
//             {todays.map((item) => (
//               <li key={item._id} className="bg-green-100 p-3 rounded shadow">
//                 <strong>{item.patientName}</strong> ({item.phoneNumber})<br />
//                 Complaint: {item.complaint || item.complaints}<br />
//                 Prescription: {item.prescription}<br />
//                 Remarks: {item.remarks}
//               </li>
//             ))}
//           </ul>
//         )}

//         <h3 className="text-xl font-bold mt-8 text-blue-700">
//           Auto-Expected Follow-ups for {selectedDate} (15 days after visit)
//         </h3>
//         {autos.length === 0 ? (
//           <p className="text-gray-500">No auto follow-ups.</p>
//         ) : (
//           <ul className="space-y-3">
//             {autos.map((item) => (
//               <li key={item._id} className="bg-blue-100 p-3 rounded shadow">
//                 <strong>{item.patientName}</strong> ({item.phoneNumber})<br />
//                 Visit Date: {item.dateOfVisit ? item.dateOfVisit.slice(0, 10) : "N/A"}<br />
//                 Expected Complaint: {item.chiefComplaints?.[0]?.complaint || "N/A"}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FollowUpPage;
import React, { useState, useEffect } from "react";
import FollowUpForm from "./FollowUpForm";
import FollowUps from "./FollowUps";
import "./followuppage.css";

const FollowUpPage = () => {
  const [followUps, setFollowUps] = useState([]);
  const [cases, setCases] = useState([]);
  const [autoExpectedFollowUps, setAutoExpectedFollowUps] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [casesRes, followRes] = await Promise.all([
        fetch(`${API_URL}/api/cases`),
        fetch(`${API_URL}/api/followups`)
      ]);
      const [casesData, followData] = await Promise.all([
        casesRes.json(),
        followRes.json()
      ]);

      setCases(casesData);
      setFollowUps(followData);

      const autoFollowUps = casesData
        .filter((c) => c.dateOfVisit)
        .map((c) => {
          const expected = new Date(c.dateOfVisit);
          expected.setDate(expected.getDate() + 15);
          return {
            ...c,
            expectedFollowUpDate: expected.toISOString().split("T")[0],
            patientName: c.name,
            phoneNumber: c.phone
          };
        });

      setAutoExpectedFollowUps(autoFollowUps);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const handleAddFollowUp = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/followups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const saved = await res.json();
      setFollowUps((prev) => [...prev, saved]);
    } catch (err) {
      alert("Failed to add follow-up.");
    }
  };

  const todays = followUps.filter((f) => f.date === selectedDate);
  const existingTodayIds = todays.map((f) => f.casesId || f.patientId);
  const autos = autoExpectedFollowUps.filter(
    (a) => a.expectedFollowUpDate === selectedDate && !existingTodayIds.includes(a._id)
  );

  return (
    <div className="followup-container">
      <FollowUpForm onSubmit={handleAddFollowUp} cases={cases} />

      <div className="date-selector">
        <label className="font-semibold">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <h3>Follow-ups on {selectedDate}</h3>
      {todays.length === 0 ? (
        <p className="text-muted">No follow-ups.</p>
      ) : (
        <ul className="followup-list">
          {todays.map((item) => (
            <li key={item._id} className="followup-card">
              <strong>{item.patientName}</strong>
              <span className="text-muted">{item.phoneNumber}</span>
              <div><strong>Complaint:</strong> {item.complaint || item.complaints}</div>
              <div><strong>Prescription:</strong> {item.prescription}</div>
              <div><strong>Remarks:</strong> {item.remarks}</div>
            </li>
          ))}
        </ul>
      )}

      <h3>Auto-Expected Follow-ups for {selectedDate}</h3>
      {autos.length === 0 ? (
        <p className="text-muted">No auto follow-ups.</p>
      ) : (
        <ul className="followup-list">
          {autos.map((item) => (
            <li key={item._id} className="followup-card auto-card">
              <strong>{item.patientName}</strong>
              <span className="text-muted">{item.phoneNumber}</span>
              <div><strong>Visit Date:</strong> {item.dateOfVisit?.slice(0, 10) || "N/A"}</div>
              <div><strong>Expected Complaint:</strong> {item.chiefComplaints?.[0]?.complaint || "N/A"}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowUpPage;
