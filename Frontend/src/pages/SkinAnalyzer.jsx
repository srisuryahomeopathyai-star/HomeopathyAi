/** @format */

import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function SkinAnalyzer() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(`${API_URL}/api/diagnose/analyze-skin`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className='p-4 bg-white shadow-xl rounded-xl max-w-md mx-auto mt-10'>
      <h2 className='text-xl font-bold mb-4'>Skin Image Analyzer</h2>
      <input type='file' accept='image/*' onChange={handleImageChange} />
      <button
        onClick={handleSubmit}
        disabled={!image}
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
      >
        Analyze Image
      </button>

      {result && (
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>
            Diagnosis: {result.diagnosis}
          </h3>
          <p className='mt-2'>Suggested Remedies:</p>
          {Array.isArray(result?.remedies) && result.remedies.length > 0 && (
            <div className='mt-6'>
              <h3 className='text-lg font-semibold'>
                Diagnosis: {result.diagnosis}
              </h3>
              <p className='mt-2'>Suggested Remedies:</p>
              <ul className='list-disc list-inside text-green-700'>
                {result.remedies.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Show fallback if no remedies */}
          {result && (!result.remedies || result.remedies.length === 0) && (
            <div className='mt-6'>
              <h3 className='text-lg font-semibold'>
                Diagnosis: {result.diagnosis}
              </h3>
              <p className='mt-2 text-red-600'>No remedies suggested.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SkinAnalyzer;
