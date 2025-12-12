/** @format */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [testResult, setTestResult] = useState(null);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_URL + "/api/auth";
  const GENERATE_BASE = import.meta.env.VITE_API_URL + "/api/generatesummary";

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    const fetchKey = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/apikey`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setKey(data.geminiApiKey || "");

        if (!data.geminiApiKey) {
          setMessage("⚠ You must add your Gemini API key to use AI features!");
        }
      } catch {
        setMessage("Failed to load API key");
      } finally {
        setLoading(false);
      }
    };

    fetchKey();
  }, [token, navigate]);

  const saveKey = async () => {
    if (!token) return navigate("/login");
    const trimmedKey = key.trim();
    if (!trimmedKey) return setMessage("API key cannot be empty");

    try {
      const res = await fetch(`${API_BASE}/update-api-key`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ apiKey: trimmedKey }),
      });

      if (res.status === 401) navigate("/login");

      const data = await res.json();
      setMessage(data.message || "API key saved");
      setKey(trimmedKey);
      setEditing(false);
    } catch {
      setMessage("Failed to save API key");
    }
  };

  const deleteKey = async () => {
    if (!token) return navigate("/login");
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(`${API_BASE}/update-api-key`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) navigate("/login");

      const data = await res.json();
      setKey("");
      setMessage(data.message || "API key deleted");
      setTestResult(null);
      setEditing(false);
      alert("You must add your API key to continue using AI features.");
    } catch {
      setMessage("Failed to delete API key");
    }
  };

  const testApiKey = async () => {
    if (!token) return navigate("/login");
    if (!key) return setMessage("Add your API key first");

    try {
      setTestResult({ loading: true, summary: null });

      const dummyCase = {
        name: "John Doe",
        age: 30,
        gender: "Male",
        maritalStatus: "Single",
        occupation: "Teacher",
        chiefComplaints: [
          {
            complaint: "Headache",
            description: "Severe, throbbing",
            duration: "2 days",
            modalities: "Cold water relief",
          },
        ],
        historyPresentIllness: "Started after stress",
        pastHistory: {
          childhoodDiseases: "None",
          surgeriesInjuries: "None",
          majorIllnesses: "None",
        },
        familyHistory: "N/A",
        personalHistory: {
          appetite: "Good",
          thirst: "Normal",
          bowel: "Regular",
          urine: "Normal",
          sleep: "Good",
          dreams: "Normal",
          sweat: "Normal",
          habits: "None",
          menstrual: "N/A",
          thermal: "Warm",
          cravingsAversions: "None",
        },
        mentalSymptoms: "Anxious",
        generalRemarks: "No major issues",
        observationsByDoctor: "Patient alert",
      };

      const res = await fetch(`${GENERATE_BASE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dummyCase),
      });

      if (res.status === 401) return navigate("/login");

      if (res.status === 429) {
        let retrySeconds = 30;
        try {
          const json = await res.json();
          retrySeconds = json.retryAfterSeconds || retrySeconds;
          setMessage(`AI rate limit: wait ${retrySeconds}s and retry.`);
        } catch {}
        setTestResult({ loading: false, summary: "Rate limited" });
        return;
      }

      if (res.status === 404) {
        setMessage("Model not found or unsupported in current API version.");
        setTestResult({ loading: false, summary: "Model not found" });
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        setMessage(text || "Failed to generate summary.");
        setTestResult({ loading: false, summary: "Error testing API key" });
        return;
      }

      const data = await res.json();

      setTestResult({
        loading: false,
        summary: data.summary || "No summary returned",
        remedy: data.geminiRemedy || "N/A",
        miasm: data.miasm || "N/A",
        dosage: data.dosage || "N/A",
        next_best_remedies: data.next_best_remedies || [],
      });
    } catch (err) {
      console.error(err);
      setTestResult({ loading: false, summary: "Error testing API key" });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: 10,
        background: "#f9f9f9",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Dashboard</h1>

      {message && (
        <p style={{ color: key ? "green" : "red", marginBottom: "1rem" }}>
          {message}
        </p>
      )}

      <label>Saved API Key:</label>
      <input
        type={editing ? "text" : "password"} // 🔥 MASK WHEN NOT EDITING
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder='Enter API key'
        disabled={!editing}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: 4,
          border: "1px solid #ccc",
          background: editing ? "#fff" : "#f0f0f0",
        }}
      />

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            style={{
              flex: 1,
              padding: "0.5rem",
              background: "#f39c12",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
          >
            Edit
          </button>
        )}
        {editing && (
          <button
            onClick={saveKey}
            style={{
              flex: 1,
              padding: "0.5rem",
              background: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
          >
            Save
          </button>
        )}
        <button
          onClick={deleteKey}
          style={{
            flex: 1,
            padding: "0.5rem",
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          Delete
        </button>
      </div>

      <button
        onClick={testApiKey}
        disabled={!key}
        style={{
          width: "100%",
          padding: "0.5rem",
          background: key ? "#2ecc71" : "#95a5a6",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          marginBottom: "1rem",
          cursor: key ? "pointer" : "not-allowed",
        }}
      >
        Test API Key
      </button>

      {testResult && (
        <div
          style={{
            padding: "1rem",
            background: "#ecf0f1",
            borderRadius: 4,
            whiteSpace: "pre-wrap",
          }}
        >
          {testResult.loading ? (
            <p>Generating summary...</p>
          ) : (
            <>
              <strong>Summary:</strong>
              <p>{testResult.summary}</p>
              <strong>Remedy:</strong> {testResult.remedy}
              <br />
              <strong>Miasm:</strong> {testResult.miasm}
              <br />
              <strong>Dosage:</strong> {testResult.dosage}
              <br />
              {testResult.next_best_remedies.length > 0 && (
                <>
                  <strong>Next Best Remedies:</strong>
                  <ul>
                    {testResult.next_best_remedies.map((r, idx) => (
                      <li key={idx}>
                        {r.name} - {r.reason}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
