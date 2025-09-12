/** @format */

import React, { useState, useEffect } from "react";
import "./casestyles.css";
import SkinAnalyzer from "../pages/SkinAnalyzer"; // Assuming SkinAnalyzer.jsx is in the same directory
import Loading from "../assets/loading.gif";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialCaseData = {
  name: "",
  age: "",
  gender: "",
  maritalStatus: "",
  occupation: "",
  address: "",
  phone: "",
  dateOfVisit: "",
  chiefComplaints: [
    {
      complaint: "",
      duration: "",
      description: "",
      modalities: "",
      skinImage: null,
    },
  ],
  historyPresentIllness: "",
  pastHistory: {
    childhoodDiseases: "",
    surgeriesInjuries: "",
    majorIllnesses: "",
  },
  labInvestigation: {},
  familyHistory: "",
  personalHistory: {
    appetite: "",
    cravings: "",
    Aversions: "",
    thirst: "",
    bowel: "",
    urine: "",
    sleep: "",
    dreams: "",
    sweat: "",
    thermal: "",
    habits: "",
    menstrual: "",
  },
  generalRemarks: "",
  observationsByDoctor: "",
  prescription: [
    { date: "", remedyName: "", potency: "", dose: "", instructions: "" },
  ],
  image: null,
};

const CaseSheetForm = ({ existingCaseData }) => {
  const [submittedData, setSubmittedData] = useState(null);
  const [caseData, setCaseData] = useState(initialCaseData);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [brainResult, setBrainResult] = useState(null);
  const [rubricInput, setRubricInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRubrics, setSelectedRubrics] = useState([]);
  const [remedy, setRemedy] = useState("");
  const [miasm, setMiasm] = useState("");
  const [dosage, setDosage] = useState("");
  const [labInput, setLabInput] = useState("");
  const [skinAnalysisResults, setSkinAnalysisResults] = useState({});
  const [geminiReason, setGeminiReason] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleChiefComplaintChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedComplaints = [...caseData.chiefComplaints];

    if (name === "skinImage" && files && files[0]) {
      updatedComplaints[index][name] = files[0];
    } else {
      updatedComplaints[index][name] = value;
    }
    setCaseData({ ...caseData, chiefComplaints: updatedComplaints });
  };
const handleAnalyzeSkinForComplaint = async (index, imageFile) => {
    if (!imageFile) {
      alert("Please upload a skin image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${API_URL}/api/diagnose/analyze-skin`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSkinAnalysisResults((prev) => ({ ...prev, [index]: data }));
    } catch (error) {
      console.error("Skin analysis failed:", error);
      setSkinAnalysisResults((prev) => ({
        ...prev,
        [index]: {
          diagnosis: "Analysis failed",
          explanation: "An error occurred while analyzing the image.",
        },
      }));
    }
  };
  const addChiefComplaint = () => {
    setCaseData({
      ...caseData,
      chiefComplaints: [
        ...caseData.chiefComplaints,
        {
          complaint: "",
          duration: "",
          description: "",
          modalities: "",
          skinImage: null,
        },
      ],
    });
  };

  const handlePrescriptionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrescriptions = [...caseData.prescription]; // <-- singular
    updatedPrescriptions[index][name] = value;
    setCaseData({ ...caseData, prescription: updatedPrescriptions }); // <-- singular
  };

  const addPrescription = () => {
    setCaseData({
      ...caseData,
      prescription: [
        ...caseData.prescription,
        {
          date: "",
          remedyName: "",
          potency: "",
          dose: "",
          instructions: "",
        },
      ],
    });
  };

  const handleImageUpload = (e) => {
    setCaseData({ ...caseData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", caseData.image);
    const chiefComplaintsWithImages = caseData.chiefComplaints.map(
      (complaint, index) => {
        if (complaint.skinImage) {
          formData.append(
            `chiefComplaints[${index}][skinImage]`,
            complaint.skinImage
          );
          const { skinImage, ...rest } = complaint;
          return rest;
        }
        return complaint;
      }
    );

    const cleanedData = {
      ...caseData,
      remedyGiven: caseData.prescription[0]?.remedyName || "",
      aiRemedyGiven: brainResult?.main_remedy || "",
      image: undefined,
      dateOfVisit: caseData.dateOfVisit
        ? new Date(caseData.dateOfVisit).toISOString()
        : null,
      prescription: caseData.prescription.map((p) => ({
        ...p,
        date: p.date ? new Date(p.date).toISOString() : null,
      })),
    };

    try {
      const response = await fetch(`${API_URL}/api/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Case submitted successfully!");
        setSubmittedData(caseData);
        setCaseData({ ...initialCaseData });
      } else {
        alert("Failed to submit case.");
      }
    } catch (error) {
      alert("Error while submitting case.");
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const generateBrainAnalysis = async () => {
    try {
      const response = await fetch(`${API_URL}/api/brain/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseInput: {
            symptoms: getAllSymptomsString(),
          },
          toggles: { showExplanation: true },
        }),
      });

      const data = await response.json();
      setBrainResult(data);
    } catch (error) {
      console.error("Brain API error:", error);
    }
  };

  const generateSummary = async () => {
    const skinImageBase64s = [];

    for (const complaint of caseData.chiefComplaints) {
      if (complaint.skinImage) {
        const base64 = await getBase64(complaint.skinImage);

        skinImageBase64s.push({
          label: complaint.complaint || "Skin Image",

          imageBase64: base64,
        });
      }
    }
    if (
      (!selectedRubrics || selectedRubrics.length === 0) &&
      (!caseData.chiefComplaints ||
        caseData.chiefComplaints.every((c) => !c.description.trim()))
    ) {
      alert(
        "Please enter at least one chief complaint description or select a rubric."
      );
      return;
    }

    setLoadingSummary(true);
    setAiSummary("");

    let imageBase64 = null;
    if (caseData.image) {
      imageBase64 = await getBase64(caseData.image);
    }

    try {
      // 🔹 1. Get Gemini Summary
      const response = await fetch(`${API_URL}/api/generatesummary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...caseData,
          imageBase64,
          skinImages: skinImageBase64s,
        }),
      });

      const summaryData = await response.json();
      const summaryText = summaryData.summary || "No summary generated.";

      const geminiRemedy =
        summaryData.geminiRemedy || summaryData.remedy || null;
      const geminiMiasm = summaryData.miasm || "N/A";
      const geminiReason = summaryData.summary || "No explanation provided";
      const geminiDosage = summaryData.dosage || "N/A";
      const geminiKeySymptoms = summaryData.key_symptoms || [];
      const geminiNextBestRemedies = summaryData.next_best_remedies || [];

      const caseInput = {
        symptoms: getAllSymptomsString(),
        thermal: caseData.personalHistory?.thermal || "Not specified",
        cravings:
          caseData.personalHistory?.cravingsAversions || "Not specified",
        mentals: caseData.mentalSymptoms || "Not specified",
      };

      const requestBody = {
        rubrics: selectedRubrics || [],
        caseInput,
        geminiRemedy,
        geminiMiasm,
        geminiReason,
        geminiDosage,
        geminiKeySymptoms,
        geminiNextBestRemedies,
      };

      // 🔹 3. Get analysis from internal brain
      const brainResponse = await fetch(`${API_URL}/api/brain/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const brainData = await brainResponse.json();

      // 🔹 4. Fallback if only Gemini response is available
      if (geminiRemedy && !brainData?.main_remedy?.name) {
        brainData.main_remedy = {
          name: geminiRemedy,
          miasm: geminiMiasm,
          reason: geminiReason,
          dosage: geminiDosage || "30C (tentative)",
          key_symptoms: geminiKeySymptoms || [],
        };

        // ✅ Add fallback next best remedies from Gemini
        brainData.next_best_remedies = geminiNextBestRemedies || [];
      }

      setBrainResult(brainData);

      // 🔹 5. Format output
      const main = brainData?.main_remedy?.name
        ? brainData.main_remedy
        : {
            name: geminiRemedy,
            miasm: geminiMiasm,
            reason: geminiReason,
            dosage: geminiDosage,
            key_symptoms: geminiKeySymptoms,
          };

      const finalSummary = `
📝 AI Generated Summary
${summaryText}

--- Gemini AI Suggestion ---
Remedy: ${geminiRemedy || "N/A"}
Miasm: ${geminiMiasm || "N/A"}
Dosage: ${geminiDosage || "N/A"}
Explanation: ${geminiReason || "No explanation provided"}
Key Symptoms: ${geminiKeySymptoms?.join(", ") || "No key symptoms provided"}

--- Internal Brain AI Suggestion ---
Remedy: ${brainData?.main_remedy?.name || "N/A"}
Miasm: ${brainData?.main_remedy?.miasm || "N/A"}
Dosage: ${brainData?.main_remedy?.dosage || "N/A"}
Explanation: ${brainData?.main_remedy?.reason || "No explanation provided"}
Key Symptoms: ${
        brainData?.main_remedy?.key_symptoms?.join(", ") ||
        "No key symptoms provided"
      }

🧠 AI Suggested Remedy
Best Homeopathic Remedy and Dosage: ${
        geminiRemedy || brainData?.main_remedy?.name || "N/A"
      } ${
        geminiDosage
          ? `(${geminiDosage})`
          : brainData?.main_remedy?.dosage
          ? `(${brainData.main_remedy.dosage})`
          : ""
      }

${
  brainData.next_best_remedies?.length > 0
    ? `🧠 Next Best Remedies:
${brainData.next_best_remedies
  .map((r, i) => `${i + 1}. ${r.name} – ${r.reason || "No reason"}`)
  .join("\n")}`
    : ""
}
`;
      setAiSummary(finalSummary);
      setRemedy(main?.name || geminiRemedy);
      setMiasm(main?.miasm || geminiMiasm);
      setDosage(main?.dosage || geminiDosage);
      console.log("Gemini remedy:", geminiRemedy);
      console.log("Brain remedy:", brainData.main_remedy?.name);
      console.log("AI Summary:", finalSummary);
      console.log("Brain Result:", brainData);
    } catch (error) {
      alert("Error generating summary.");
      console.error("❌ generateSummary error:", error);
    } finally {
      setLoadingSummary(false);
    }
  };
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (rubricInput.length < 3) return;
      const res = await fetch(`${API_URL}/api/brain/search?q=${rubricInput}`);
      const data = await res.json();
      setSuggestions(data);
    };
    fetchSuggestions();
  }, [rubricInput]);

  const handleAddRubric = (rubric) => {
    if (!selectedRubrics.includes(rubric)) {
      setSelectedRubrics((prev) => [...prev, rubric]);
    }
    setRubricInput("");
    setSuggestions([]);
  };

  const handleRemoveRubric = (index) => {
    setSelectedRubrics((prev) => prev.filter((_, i) => i !== index));
  };

  // Combine all relevant symptoms into one string
  const getAllSymptomsString = () =>
    [
      caseData.chiefComplaints.map((c) => c.description).join(" "),
      caseData.personalHistory.thermal,
      caseData.personalHistory.cravingsAversions,
      caseData.mentalSymptoms,
      caseData.historyPresentIllness,
      caseData.pastHistory.childhoodDiseases,
      caseData.pastHistory.surgeriesInjuries,
      caseData.pastHistory.majorIllnesses,
      caseData.familyHistory,
      caseData.personalHistory.appetite,
      caseData.personalHistory.thirst,
      caseData.personalHistory.bowel,
      caseData.personalHistory.urine,
      caseData.personalHistory.sleep,
      caseData.personalHistory.dreams,
      caseData.personalHistory.sweat,
      caseData.personalHistory.habits,
      caseData.personalHistory.menstrual,
      caseData.generalRemarks,
      caseData.observationsByDoctor,
    ]
      .filter(Boolean)
      .join(" ");
  {
    brainResult?.next_best_remedies?.length > 0 && (
      <>
        <h4>Next Best Remedies</h4>
        <ul>
          {brainResult?.next_best_remedies.map((r, i) => (
            <li key={i}>
              <strong>{r.name}</strong>: {r.reason}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <form className='case-container' onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>Case Sheet</h2>

      {/* Basic Info */}
      <section className='case-section'>
        <h3 className='case-section-title'>1. Basic Patient Information</h3>
        <div className='case-form-column'>
          <div className='case-form-group'>
            <label className='case-label'>Name</label>
            <input
              className='case-input'
              name='name'
              value={caseData.name}
              onChange={handleInputChange}
              placeholder='Enter full name'
              required
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Age</label>
            <input
              className='case-input'
              name='age'
              value={caseData.age}
              onChange={handleInputChange}
              placeholder='Age'
              type='number'
              min={0}
              required
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Gender</label>
            <input
              className='case-input'
              name='gender'
              value={caseData.gender}
              onChange={handleInputChange}
              placeholder='Gender'
              required
            />
          </div>
        </div>

        <div className='case-form-column'>
          <div className='case-form-group'>
            <label className='case-label'>Marital Status</label>
            <input
              className='case-input'
              name='maritalStatus'
              value={caseData.maritalStatus}
              onChange={handleInputChange}
              placeholder='Single/Married/etc.'
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Occupation</label>
            <input
              className='case-input'
              name='occupation'
              value={caseData.occupation}
              onChange={handleInputChange}
              placeholder='Occupation'
            />
          </div>
        </div>

        <div className='case-form-column'>
          <div className='case-form-group' style={{ flex: "2 1 100%" }}>
            <label className='case-label'>Address</label>
            <input
              className='case-input'
              name='address'
              value={caseData.address}
              onChange={handleInputChange}
              placeholder='Address'
            />
          </div>
        </div>

        <div className='case-form-column'>
          {/* Image Upload */}
          <div className='case-section'>
            <label className='case-file-input-label'>Upload Face Image:</label>
            <input type='file' accept='image/*' onChange={handleImageUpload} />
            <p style={{ fontSize: 12, color: "#555" }}>
              {caseData.image ? caseData.image.name : "No file chosen"}
            </p>
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Phone / WhatsApp</label>
            <input
              className='case-input'
              name='phone'
              value={caseData.phone}
              onChange={handleInputChange}
              placeholder='Phone number'
            />
          </div>

          <div className='case-form-group'>
            <label className='case-label'>Date of Visit</label>
            <input
              type='date'
              className='case-input'
              name='dateOfVisit'
              value={caseData.dateOfVisit}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>

      {/* Chief Complaints */}
      <section className='case-section'>
        <h3 className='case-section-title'>2. Chief Complaints</h3>
        {caseData.chiefComplaints.map((complaint, index) => (
          <div key={index} className='case-complaint-block'>
            <div className='case-form-column'>
              <div className='case-form-group'>
                <label className='case-label'>Complaint</label>
                <input
                  className='case-input'
                  name='complaint'
                  value={complaint.complaint}
                  onChange={(e) => handleChiefComplaintChange(index, e)}
                  placeholder='Complaint description'
                  required
                />
              </div>
              <div className='case-form-group'>
                <label className='case-label'>Duration</label>
                <input
                  className='case-input'
                  name='duration'
                  value={complaint.duration}
                  onChange={(e) => handleChiefComplaintChange(index, e)}
                  placeholder='Duration'
                />
              </div>
            </div>
            <div className='case-form-column'>
              <div className='case-form-group' style={{ flex: "1 1 100%" }}>
                <label className='case-label'>Description</label>
                <textarea
                  className='case-textarea'
                  name='description'
                  value={complaint.description}
                  onChange={(e) => handleChiefComplaintChange(index, e)}
                  placeholder='Additional details'
                />
              </div>
            </div>
            {/* New fields for Chief Complaints */}
            <div className='case-form-column'>
              <div className='case-form-group'>
                <label className='case-label'>Modalities</label>
                <input
                  className='case-input'
                  name='modalities'
                  value={complaint.modalities}
                  onChange={(e) => handleChiefComplaintChange(index, e)}
                  placeholder='Modalities (e.g., worse by cold, better by heat)'
                />
              </div>
              <div className='case-form-group'>
                {/* <label className='case-label'>Skin Image</label> */}
                <SkinAnalyzer
                  imageFile={complaint.skinImage}
                  onImageChange={(file) =>
                    handleChiefComplaintChange(index, {
                      target: { name: "skinImage", files: [file] },
                    })
                  }
                  onAnalyze={(imageFile) =>
                    handleAnalyzeSkinForComplaint(index, imageFile)
                  }
                  analysisResult={skinAnalysisResults[index]}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type='button'
          className='case-button'
          onClick={addChiefComplaint}
          style={{ backgroundColor: "#6c757d" }}
        >
          + Add Complaint
        </button>
      </section>

      {/* History of Present Illness */}
      <section className='case-section'>
        <h3 className='case-section-title'>3. History of Present Illness</h3>
        <textarea
          className='case-textarea'
          name='historyPresentIllness'
          value={caseData.historyPresentIllness}
          onChange={handleInputChange}
          placeholder='Details about current illness'
        />
      </section>

      {/* Past History */}
      <section className='case-section'>
        <h3 className='case-section-title'>4. Past History</h3>
        <div className='case-form-column'>
          <div className='case-form-group'>
            <label className='case-label'>Childhood Diseases</label>
            <textarea
              className='case-textarea'
              name='childhoodDiseases'
              value={caseData.pastHistory.childhoodDiseases}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  pastHistory: {
                    ...caseData.pastHistory,
                    childhoodDiseases: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Surgeries / Injuries</label>
            <textarea
              className='case-textarea'
              name='surgeriesInjuries'
              value={caseData.pastHistory.surgeriesInjuries}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  pastHistory: {
                    ...caseData.pastHistory,
                    surgeriesInjuries: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Major Illnesses</label>
            <textarea
              className='case-textarea'
              name='majorIllnesses'
              value={caseData.pastHistory.majorIllnesses}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  pastHistory: {
                    ...caseData.pastHistory,
                    majorIllnesses: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Family History */}
      <section className='case-section'>
        <h3 className='case-section-title'>5. Family History</h3>
        <textarea
          className='case-textarea'
          name='familyHistory'
          value={caseData.familyHistory}
          onChange={handleInputChange}
          placeholder='Family medical history'
        />
      </section>

      {/* Personal History */}
      <section className='case-section'>
        <h3 className='case-section-title'>6. Personal History</h3>
        <div className='case-form-column'>
          {[
            { label: "Appetite", name: "appetite" },
            {
              label: "Cravings",
              name: "cravings",
            },
            { label: "Aversions", name: "Aversions" },
            { label: "Thirst", name: "thirst" },
            { label: "Bowel", name: "bowel" },
            { label: "Urine", name: "urine" },
          ].map(({ label, name }) => (
            <div key={name} className='case-form-group'>
              <label className='case-label'>{label}</label>
              <input
                className='case-input'
                name={name}
                value={caseData.personalHistory[name]}
                onChange={(e) =>
                  setCaseData({
                    ...caseData,
                    personalHistory: {
                      ...caseData.personalHistory,
                      [name]: e.target.value,
                    },
                  })
                }
                onFocus={() => setFocusedInput(name)}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          ))}
        </div>
        <div className='case-form-column'>
          {[
            { label: "Sleep", name: "sleep" },
            { label: "Dreams", name: "dreams" },
            { label: "Sweat", name: "sweat" },
            { label: "Thermal", name: "thermal" },
            { label: "Habits", name: "habits" },
            { label: "Menstrual History", name: "menstrual" },
          ].map(({ label, name }) => (
            <div key={name} className='case-form-group'>
              <label className='case-label'>{label}</label>
              <input
                className='case-input'
                name={name}
                value={caseData.personalHistory[name]}
                onChange={(e) =>
                  setCaseData({
                    ...caseData,
                    personalHistory: {
                      ...caseData.personalHistory,
                      [name]: e.target.value,
                    },
                  })
                }
                onFocus={() => setFocusedInput(name)}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Mental Symptoms */}
      <section className='case-section'>
        <h3 className='case-section-title'>7. Mental Symptoms</h3>
        <textarea
          className='case-textarea'
          name='mentalSymptoms'
          value={caseData.mentalSymptoms}
          onChange={handleInputChange}
          placeholder='Mental symptoms description'
        />
      </section>

      {/* General Remarks */}
      <section className='case-section'>
        <h3 className='case-section-title'>8. General Remarks</h3>
        <textarea
          className='case-textarea'
          name='generalRemarks'
          value={caseData.generalRemarks}
          onChange={handleInputChange}
          placeholder='General remarks'
        />
      </section>

      {/* Observations by Doctor */}
      <section className='case-section'>
        <h3 className='case-section-title'>9. Observations by Doctor</h3>
        <textarea
          className='case-textarea'
          name='observationsByDoctor'
          value={caseData.observationsByDoctor}
          onChange={handleInputChange}
          placeholder="Doctor's observations"
        />
      </section>
      <section className='case-section'>
        <h3 className='case-section-title'>10. Lab Investigation</h3>

        <textarea
          className='case-textarea'
          placeholder='Enter values like: Hb: 9.5, WBC: 12000, Thyroid: 2.1'
          value={labInput}
          onChange={(e) => {
            const input = e.target.value;
            setLabInput(input);

            // Convert to object
            const entries = input.split(",").map((pair) => pair.trim());
            const labObj = {};

            entries.forEach((entry) => {
              const [key, value] = entry.split(":").map((item) => item.trim());
              if (key && !isNaN(parseFloat(value))) {
                labObj[key] = parseFloat(value);
              }
            });

            setCaseData({
              ...caseData,
              labInvestigation: labObj,
            });
          }}
          rows={5}
        />
      </section>

      {/* <div className='case-form-group'>
        <label className='case-label'>Rubric Suggestion (type to search)</label>
        <input
          className='case-input'
          value={rubricInput}
          onChange={(e) => setRubricInput(e.target.value)}
          placeholder='e.g. fear of death, sadness in evening...'
        />
        {suggestions.length > 0 && (
          <ul className='rubric-suggestions'>
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleAddRubric(s.target)}
                style={{
                  cursor: "pointer",
                  margin: "4px 0",
                  color: "blue",
                }}
              >
                {s.target} ({Math.round(s.rating * 100)}%)
              </li>
            ))}
          </ul>
        )}
        {selectedRubrics.length > 0 && (
          <div className='selected-rubrics'>
            {selectedRubrics.map((rubric, i) => (
              <span key={i} className='selected-rubric-chip'>
                {rubric}
                <button onClick={() => handleRemoveRubric(i)}>×</button>
              </span>
            ))}
          </div>
        )}
      </div> */}

      {/* Prescription */}
      <section className='case-section'>
        {/* AI Summary */}
        <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
  {loadingSummary && (
    <img
      src={Loading}
      alt='Loading...'
      style={{ width: "224px", height: "224px" }}
    />
  )}

  <button
    type='button'
    style={{
      backgroundColor: "#ffc107",
      color: "#333",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: loadingSummary ? "not-allowed" : "pointer",
      opacity: loadingSummary ? 0.7 : 1,
    }}
    onClick={generateSummary}
    disabled={loadingSummary}
  >
    {loadingSummary ? "Generating AI Summary..." : "Generate AI Summary"}
  </button>
</div>



        {aiSummary && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              whiteSpace: "pre-wrap",
              color: "#000",
            }}
          >
            <h3>AI Generated Summary</h3>
            <p>{aiSummary}</p>
            {brainResult?.main_remedy?.key_symptoms?.length > 0 &&
              !aiSummary.includes("Key Symptoms:") && (
                <>
                  <p>
                    <strong>Key Symptoms:</strong>
                  </p>
                  <ul>
                    {brainResult.main_remedy.key_symptoms.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </>
              )}

            {/* Optional re-show Next Remedies only if NOT in aiSummary */}
            {brainResult?.next_best_remedies?.length > 0 &&
              !aiSummary.includes("Next Best Remedies") && (
                <>
                  <h4>Next Best Remedies</h4>
                  <ul>
                    {brainResult.next_best_remedies.map((r, i) => (
                      <li key={i}>
                        <strong>{r.name}</strong>: {r.reason}
                      </li>
                    ))}
                  </ul>
                </>
              )}

            <h3>Remedy Prescribed</h3>
            <p>
              <strong>Remedy Given:</strong>{" "}
              {caseData.prescription && caseData.prescription.length > 0
                ? caseData.prescription[caseData.prescription.length - 1]
                    .remedyName || "N/A"
                : "N/A"}
            </p>
          </div>
        )}

        {/* Display Prescriptions List */}
        {caseData.prescription && caseData.prescription.length > 0 && (
          <section className='case-section'>
            <h3 className='case-section-title'>Prescriptions Given</h3>
            <table
              className='case-prescription-table'
              style={{ width: "100%", marginBottom: "20px" }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Remedy Name</th>
                  <th>Potency</th>
                  <th>Dose</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                {caseData.prescription.map((pres, idx) => (
                  <tr key={idx}>
                    <td>{pres.date}</td>
                    <td>{pres.remedyName}</td>
                    <td>{pres.potency}</td>
                    <td>{pres.dose}</td>
                    <td>{pres.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <h3 className='case-section-title'>11. Prescription</h3>
        {caseData.prescription.map((prescription, index) => (
          <div key={index} className='case-prescription-block'>
            <div className='case-form-column'>
              <div className='case-form-group'>
                <label className='case-label'>Date</label>
                <input
                  type='date'
                  className='case-input'
                  name='date'
                  value={prescription.date}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
              <div className='case-form-group'>
                <label className='case-label'>Remedy Name</label>
                <input
                  className='case-input'
                  name='remedyName'
                  value={prescription.remedyName}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
              <div className='case-form-group'>
                <label className='case-label'>Potency</label>
                <input
                  className='case-input'
                  name='potency'
                  value={prescription.potency}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
            </div>
            <div className='case-form-column'>
              <div className='case-form-group'>
                <label className='case-label'>Dose</label>
                <input
                  className='case-input'
                  name='dose'
                  value={prescription.dose}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
              <div className='case-form-group' style={{ flex: "2 1 100%" }}>
                <label className='case-label'>Instructions</label>
                <textarea
                  className='case-textarea'
                  name='instructions'
                  value={prescription.instructions}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                  placeholder='Instructions for patient'
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type='button'
          className='case-button'
          onClick={addPrescription}
          style={{ backgroundColor: "#6c757d" }}
        >
          + Add Prescription
        </button>
      </section>

      <button type='submit' className='case-button'>
        Submit Case
      </button>
    </form>
  );
};

export default CaseSheetForm;
