/** @format */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "./Modal";
import Loading from "../assets/loading.gif";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const CasesList = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewCase, setViewCase] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 5;
  const resetToNewComplaintOnly = () => {
    setSelectedCase((prev) => ({
      ...prev,
      chiefComplaints: [{ complaint: "", duration: "", description: "" }],
      aiRemedyGiven: "",
      main_remedy: {},
      next_best_remedies: [],
    }));
    setAiSummary("");
  };
  // AI summary state
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingCases, setLoadingCases] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cases`);
        setCases(res.data);
        setFilteredCases(res.data);
      } catch (err) {
        toast.error("Failed to load cases.");
      } finally {
        setLoadingCases(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = cases.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(term) ||
        (c.phone || "").includes(term)
    );
    setFilteredCases(filtered);
    setCurrentPage(1);
  }, [searchTerm, cases]);

  const indexOfLast = currentPage * casesPerPage;
  const indexOfFirst = indexOfLast - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);
  const addComplaint = () => {
    const updated = [
      ...(selectedCase.chiefComplaints || []),
      { complaint: "", duration: "", description: "" },
    ];
    setSelectedCase((prev) => ({ ...prev, chiefComplaints: updated }));
  };

  const updateComplaint = (index, key, value) => {
    const updated = [...selectedCase.chiefComplaints];
    updated[index][key] = value;
    setSelectedCase((prev) => ({ ...prev, chiefComplaints: updated }));
  };

  const removeComplaint = (index) => {
    const updated = [...selectedCase.chiefComplaints];
    updated.splice(index, 1);
    setSelectedCase((prev) => ({ ...prev, chiefComplaints: updated }));
  };

  const addPrescription = () => {
    const updated = [
      ...(selectedCase.prescription || []),
      { remedyName: "", potency: "", dose: "", instructions: "" },
    ];
    setSelectedCase((prev) => ({ ...prev, prescription: updated }));
  };

  const updatePrescription = (index, key, value) => {
    const updated = [...selectedCase.prescription];
    updated[index][key] = value;
    setSelectedCase((prev) => ({ ...prev, prescription: updated }));
  };

  const removePrescription = (index) => {
    const updated = [...selectedCase.prescription];
    updated.splice(index, 1);
    setSelectedCase((prev) => ({ ...prev, prescription: updated }));
  };

  const handleEditClick = (caseData) => {
    setSelectedCase(caseData);
    setAiSummary("");
    setIsModalOpen(true);
  };

  const handleViewClick = async (caseData) => {
    try {
      const res = await axios.get(`${API_URL}/api/cases/${caseData._id}`);
      setViewCase(res.data);
      setIsViewModalOpen(true);
    } catch (err) {
      toast.error("Failed to fetch full case details");
    }
  };

  const handleModalClose = () => {
    setSelectedCase(null);
    setIsModalOpen(false);
    setAiSummary("");
  };

  // const handleFieldChange = (e) => {
  //   const { name, value } = e.target;
  //   const objectFields = ["chiefComplaints", "pastHistory", "prescription"];

  //   try {
  //     const parsed = objectFields.includes(name) ? JSON.parse(value) : value;
  //     setSelectedCase((prev) => ({ ...prev, [name]: parsed }));
  //   } catch {
  //     setSelectedCase((prev) => ({ ...prev, [name]: value }));
  //   }
  // };
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const path = name.split(".");
    if (path.length === 2) {
      setSelectedCase((prev) => ({
        ...prev,
        [path[0]]: {
          ...prev[path[0]],
          [path[1]]: value,
        },
      }));
    } else {
      setSelectedCase((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSaveCase = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/api/cases/${selectedCase._id}`,
        selectedCase
      );
      setCases((prev) =>
        prev.map((c) => (c._id === res.data._id ? res.data : c))
      );
      toast.success("Case updated!");
      handleModalClose();
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  const handleDeleteCase = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/cases/${id}`);
      setCases((prev) => prev.filter((c) => c._id !== id));
      toast.success("Deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleAISuggestion = async () => {
    if (!selectedCase || !selectedCase.chiefComplaints?.length) return;

    setLoadingSummary(true);

    // Only use the latest complaint
    const latestComplaint = selectedCase.chiefComplaints.at(-1);
    const tempCase = {
      ...selectedCase,
      chiefComplaints: [latestComplaint],
      relief: selectedCase.relief || "none", // pass relief also
    };

    try {
      const res = await axios.post(`${API_URL}/api/generatesummary`, tempCase);

      setAiSummary(res.data.summary || "");
      setSelectedCase((prev) => ({
        ...prev,
        aiRemedyGiven: res.data?.geminiRemedy || "",
        main_remedy: res.data?.main_remedy || {},
        next_best_remedies: res.data?.next_best_remedies || [],
        intercurrent_remedies: res.data?.intercurrent_remedies || [],
      }));
    } catch (err) {
      toast.error("AI suggestion failed.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const AIDetails = () =>
    aiSummary && (
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>🧠 AI Generated Analysis</h3>

        <div style={{ marginBottom: "15px" }}>
          <strong>Summary:</strong>
          <p style={{ whiteSpace: "pre-wrap", marginTop: "5px" }}>
            {aiSummary}
          </p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Remedy Suggested:</strong>
          <ul>
            <li>
              <strong>
                {selectedCase.aiRemedyGiven ||
                  selectedCase.main_remedy?.remedyName ||
                  selectedCase.remedyGiven ||
                  "N/A"}
              </strong>
              {selectedCase.main_remedy?.reason && (
                <>: {selectedCase.main_remedy.reason}</>
              )}
            </li>
          </ul>
        </div>

        {(selectedCase.main_remedy?.name || selectedCase.remedyGiven) && (
          <div style={{ marginBottom: "15px" }}>
            <strong>old Remedy prescribed:</strong>
            <ul>
              <li>
                <strong>
                  {selectedCase.main_remedy?.name || selectedCase.remedyGiven}
                </strong>
                {selectedCase.main_remedy?.reason && (
                  <>: {selectedCase.main_remedy.reason}</>
                )}
              </li>
            </ul>
          </div>
        )}
        {selectedCase.main_remedy?.key_symptoms?.length > 0 && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Key Symptoms:</strong>
            <ul>
              {selectedCase.main_remedy.key_symptoms.map((symptom, i) => (
                <li key={i}>{symptom}</li>
              ))}
            </ul>
          </div>
        )}

        {selectedCase.next_best_remedies?.length > 0 && (
          <div>
            <strong>Next Best Remedies:</strong>
            <ul>
              {selectedCase.next_best_remedies.map((remedy, i) => (
                <li key={i}>
                  <strong>{remedy.name}</strong>: {remedy.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedCase((prev) => ({ ...prev, faceImage: file }));
  };

  return (
    <div className='cases-wrapper'>
      <h2>Cases</h2>
      <input
        type='text'
        placeholder='Search by name or phone'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table border='1' cellPadding='6'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Date of Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCases.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.age}</td>
              <td>{c.gender}</td>
              <td>{new Date(c.dateOfVisit).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleViewClick(c)}>View</button>
                <button onClick={() => handleEditClick(c)}>Edit</button>
                <button onClick={() => handleDeleteCase(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{ fontWeight: currentPage === i + 1 ? "bold" : "normal" }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedCase && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <h3>Edit Case Sheet</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveCase();
            }}
          >
            <h4>Basic Details</h4>
            <input
              name='name'
              value={selectedCase.name || ""}
              onChange={handleFieldChange}
            />
            <input
              name='phone'
              value={selectedCase.phone || ""}
              onChange={handleFieldChange}
            />
            <input
              name='age'
              value={selectedCase.age || ""}
              onChange={handleFieldChange}
            />
            <input
              name='gender'
              value={selectedCase.gender || ""}
              onChange={handleFieldChange}
            />
            <input
              name='maritalStatus'
              placeholder='Marital Status'
              value={selectedCase.maritalStatus || ""}
              onChange={handleFieldChange}
            />
            <input
              name='occupation'
              placeholder='Occupation'
              value={selectedCase.occupation || ""}
              onChange={handleFieldChange}
            />
            <input
              name='address'
              placeholder='Address'
              value={selectedCase.address || ""}
              onChange={handleFieldChange}
            />
            <input
              name='dateOfVisit'
              type='date'
              value={selectedCase.dateOfVisit?.slice(0, 10) || ""}
              onChange={handleFieldChange}
            />
            <h4>Chief Complaints</h4>
            {(selectedCase.chiefComplaints || []).map((item, index) => (
              <div key={index}>
                <input
                  placeholder='Complaint'
                  value={item.complaint || ""}
                  onChange={(e) =>
                    updateComplaint(index, "complaint", e.target.value)
                  }
                />
                <input
                  placeholder='Duration'
                  value={item.duration || ""}
                  onChange={(e) =>
                    updateComplaint(index, "duration", e.target.value)
                  }
                />
                <input
                  placeholder='Description'
                  value={item.description || ""}
                  onChange={(e) =>
                    updateComplaint(index, "description", e.target.value)
                  }
                />
                <h4>History of Present Illness</h4>
                <textarea
                  name='historyPresentIllness'
                  value={selectedCase.historyPresentIllness || ""}
                  onChange={handleFieldChange}
                />
                <h4>Past History</h4>
                <input
                  name='pastHistory.childhoodDiseases'
                  placeholder='Childhood Diseases'
                  value={selectedCase.pastHistory?.childhoodDiseases || ""}
                  onChange={handleFieldChange}
                />
                <input
                  name='pastHistory.surgeriesInjuries'
                  placeholder='Surgeries/Injuries'
                  value={selectedCase.pastHistory?.surgeriesInjuries || ""}
                  onChange={handleFieldChange}
                />
                <input
                  name='pastHistory.majorIllnesses'
                  placeholder='Major Illnesses'
                  value={selectedCase.pastHistory?.majorIllnesses || ""}
                  onChange={handleFieldChange}
                />
                <h4>Family History</h4>
                <textarea
                  name='familyHistory'
                  value={selectedCase.familyHistory || ""}
                  onChange={handleFieldChange}
                />
                <h4>Personal History</h4>
                {Object.keys(selectedCase.personalHistory || {}).map((key) => (
                  <input
                    key={key}
                    name={`personalHistory.${key}`}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={selectedCase.personalHistory[key] || ""}
                    onChange={handleFieldChange}
                  />
                ))}
                <h4>Relief Status</h4>
                <select
                  name='relief'
                  value={selectedCase.relief || ""}
                  onChange={handleFieldChange}
                >
                  <option value=''>-- Select Relief --</option>
                  <option value='full'>Full Relief</option>
                  <option value='partial'>Partial Relief</option>
                  <option value='none'>No Relief</option>
                </select>

                {/* <h4>Lab Investigation</h4>
                <textarea
                  name='labInvestigation'
                  value={JSON.stringify(selectedCase.labInvestigation || {})}
                  onChange={handleFieldChange}
                /> */}
                <h4>Lab Investigation</h4>
                <textarea
                  name='labInvestigation'
                  value={selectedCase.labInvestigation || ""}
                  onChange={handleFieldChange}
                />

                <h4>General Remarks</h4>
                <textarea
                  name='generalRemarks'
                  value={selectedCase.generalRemarks || ""}
                  onChange={handleFieldChange}
                />

                <h4>Observations By Doctor</h4>
                <textarea
                  name='observationsByDoctor'
                  value={selectedCase.observationsByDoctor || ""}
                  onChange={handleFieldChange}
                />
                <button type='button' onClick={() => removeComplaint(index)}>
                  🗑
                </button>
              </div>
            ))}
            <button type='button' onClick={addComplaint}>
              + Add Complaint
            </button>
            <h4>Prescriptions</h4>
            {(selectedCase.prescription || []).map((item, index) => (
              <div key={index}>
                <input
                  placeholder='Remedy'
                  value={item.remedyName || ""}
                  onChange={(e) =>
                    updatePrescription(index, "remedyName", e.target.value)
                  }
                />
                <input
                  placeholder='Potency'
                  value={item.potency || ""}
                  onChange={(e) =>
                    updatePrescription(index, "potency", e.target.value)
                  }
                />
                <input
                  placeholder='Dose'
                  value={item.dose || ""}
                  onChange={(e) =>
                    updatePrescription(index, "dose", e.target.value)
                  }
                />
                <input
                  placeholder='Instructions'
                  value={item.instructions || ""}
                  onChange={(e) =>
                    updatePrescription(index, "instructions", e.target.value)
                  }
                />
                <button type='button' onClick={() => removePrescription(index)}>
                  🗑
                </button>
              </div>
            ))}
            <button type='button' onClick={addPrescription}>
              + Add Prescription
            </button>

            <h4>AI Tools 🧠</h4>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {loadingSummary && (
                <img
                  src={Loading}
                  alt='Thinking...' // Changed alt text to reflect thinking
                  style={{
                    width: "350px",
                    height: "350px",
                    verticalAlign: "middle",
                  }}
                />
              )}
              <button
                type='button'
                onClick={handleAISuggestion}
                style={{
                  background: "#4CAF50",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ✨ Generate Summary
              </button>
            </div>

            <div
              style={{
                background: "#f3f4f6",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "10px",
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: "14px",
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ddd",
              }}
            >
              {AIDetails()}
            </div>

            <div style={{ marginTop: "20px" }}>
              <button type='submit'>Save</button>
              <button type='button' onClick={handleModalClose}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewCase && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
        >
          <h3>View Case</h3>
          <p>
            <strong>Name:</strong> {viewCase.name}
          </p>
          <p>
            <strong>Phone:</strong> {viewCase.phone}
          </p>
          <p>
            <strong>Age:</strong> {viewCase.age}
          </p>
          <p>
            <strong>Gender:</strong> {viewCase.gender}
          </p>
          <p>
            <strong>Marital Status:</strong> {viewCase.maritalStatus}
          </p>
          {/* Symptoms section */}
          {viewCase.symptoms ? (
            <p>
              <strong>Symptoms:</strong> {viewCase.symptoms}
            </p>
          ) : viewCase.chiefComplaints &&
            viewCase.chiefComplaints.length > 0 ? (
            <p>
              <strong>Symptoms:</strong>{" "}
              {viewCase.chiefComplaints.map((cc) => cc.description).join("; ")}
            </p>
          ) : (
            <p>
              <strong>Symptoms:</strong> Not available
            </p>
          )}
          <p>
            <strong>Remedy Given:</strong>{" "}
            {viewCase.prescription && viewCase.prescription[0]?.remedyName
              ? viewCase.prescription[0].remedyName
              : "Not available"}
          </p>
          <p>
            <strong>AI Remedy Given:</strong>{" "}
            {viewCase?.aiRemedyGiven || "Not available"}
          </p>
          <p>
            <strong>Date of Visit:</strong>{" "}
            {new Date(viewCase.dateOfVisit).toLocaleDateString()}
          </p>
          {viewCase.chiefComplaints && viewCase.chiefComplaints.length > 0 && (
            <div>
              <strong>Chief Complaints:</strong>
              <ul>
                {viewCase.chiefComplaints.map((cc, i) => (
                  <li key={i}>
                    {cc.complaint} ({cc.duration}) - {cc.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h4>Prescriptions</h4>
          {(viewCase.prescription || []).map((p, i) => (
            <div key={i}>
              <p>
                <strong>Date:</strong>{" "}
                {p.date ? new Date(p.date).toLocaleDateString() : ""}
              </p>
              {viewCase.remedyGiven && (
                <p>
                  <strong>Remedy Given:</strong> {viewCase.remedyGiven}
                </p>
              )}
              <p>
                <strong>Potency:</strong> {p.potency}
              </p>
              <p>
                <strong>Dose:</strong> {p.dose}
              </p>
              <p>
                <strong>Instructions:</strong> {p.instructions}
              </p>
            </div>
          ))}
          <h4>Personal History</h4>
          {viewCase.personalHistory &&
            Object.entries(viewCase.personalHistory).map(([key, val]) => (
              <p key={key}>
                <strong>{key}:</strong> {val}
              </p>
            ))}
          {viewCase.imageUrl && (
            <div>
              <h4>Uploaded Image:</h4>
              <img src={viewCase.imageUrl} alt='Uploaded' width='150' />
            </div>
          )}
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CasesList;
