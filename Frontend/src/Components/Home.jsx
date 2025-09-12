// /** @format */

// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h1 style={styles.heading}>🌿 Welcome to Remedy AI Homeopathy Portal</h1>
//         <p style={styles.subText}>
//           Manage patient cases, generate AI-powered summaries, and explore effective remedies.
//         </p>
//         <div style={styles.links}>
//           <Link to='/add-case' style={{ ...styles.button, backgroundColor: "#4f46e5" }}>
//             ➕ Add New Case
//           </Link>
//           <Link to='/cases' style={{ ...styles.button, backgroundColor: "#10b981" }}>
//             📋 View All Cases
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     background: "linear-gradient(135deg, #e0f2fe, #fbefff)",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "40px 20px",
//   },
//   card: {
//     maxWidth: "700px",
//     textAlign: "center",
//     padding: "60px 40px",
//     backgroundColor: "#ffffff",
//     borderRadius: "16px",
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//     transition: "all 0.3s ease-in-out",
//   },
//   heading: {
//     fontSize: "2.8rem",
//     fontWeight: "700",
//     marginBottom: "20px",
//     color: "#1e3a8a",
//   },
//   subText: {
//     fontSize: "1.2rem",
//     marginBottom: "40px",
//     color: "#334155",
//   },
//   links: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     flexWrap: "wrap",
//   },
//   button: {
//     padding: "14px 30px",
//     color: "#fff",
//     textDecoration: "none",
//     borderRadius: "8px",
//     fontWeight: "600",
//     fontSize: "1rem",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.2s, box-shadow 0.2s",
//   },
// };

// export default Home;
/** @format */

import React from "react";
import { Link } from "react-router-dom";
import doctorImg from "../assets/doctor.jpg";
import logo from "../assets/Bhanulogo.jpg";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-16 items-center bg-white rounded-3xl shadow-xl">
        <div className="w-full md:w-4/5">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            🌿 Welcome to Bhanu Homeo Clinic
          </h1>
          <p className="text-lg text-purple-600 font-semibold mb-2">
            Natural Healing. Trusted Expertise. Proven Results.
          </p>
          <p className="text-gray-700 mb-6">
            Combining traditional homeopathy with modern tools to provide holistic care.
            15+ years of service to over 10,000 satisfied patients.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/add-case"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              ➕ Add New Case
            </Link>
            <Link
              to="/cases"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              📋 View All Cases
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/5 mt-8 md:mt-0 flex justify-center">
          <img
            src={logo}
            alt="Bhanu Logo"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-purple-300 shadow-md"
          />
        </div>
      </div>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">About Bhanu Homeo Clinic</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We are committed to delivering safe, effective, and gentle homeopathic treatments.
          Specializing in chronic illness, stress management, skin problems, women’s health,
          and personalized constitutional remedies.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">Why Choose Us?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="bg-blue-50 p-6 rounded-xl shadow">
            🧠 <span className="font-semibold">AI-Supported Diagnosis</span>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow">
            👨‍⚕️ <span className="font-semibold">7+ Years of Experience</span>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow">
            📱 <span className="font-semibold">Online Consultations</span>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow">
            🌿 <span className="font-semibold">Natural, Side-Effect Free</span>
          </div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-16 px-6 bg-purple-50">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">Meet Our Doctor</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <img
            src={doctorImg}
            alt="Dr. Somasekhar"
            className="w-72 h-72 rounded-3xl object-cover border-4 border-green-400 shadow-xl"
          />
          <div className="max-w-md">
            <h3 className="text-2xl font-bold text-blue-900">Dr. Somasekhar, BHMS</h3>
            <p className="text-gray-700 mt-3">
              A dedicated homeopath with deep experience in holistic healing,
              chronic diseases, and personalized case-based prescriptions.
              Trusted by thousands for accurate, gentle care.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 text-center bg-green-50">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Contact Us</h2>
        <p className="text-gray-800 mb-2">📍 Jaggampeta, Andhra Pradesh – 517325</p>
        <p className="text-gray-800 mb-2">📞 9494163566</p>
        <p className="text-gray-800">📧 bhanuhomeohospital@gmail.com</p>
      </section>

{/* Testimonials Section */}
<section className="py-16 px-6 bg-white">
  <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">What Our Patients Say</h2>
  <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
    {/* Testimonial 1 */}
    <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
      <p className="text-gray-700 italic mb-4">
        “I was suffering from migraines for years. Dr. Somasekhar’s treatment changed my life.
        Highly recommend Bhanu Homeo Clinic!”
      </p>
      <div className="font-semibold text-blue-900">— Sravani K.</div>
      <div className="text-yellow-500 mt-2">⭐⭐⭐⭐⭐</div>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
      <p className="text-gray-700 italic mb-4">
        “Professional, friendly, and truly effective remedies. I noticed results within weeks.”
      </p>
      <div className="font-semibold text-blue-900">— Ramesh V.</div>
      <div className="text-yellow-500 mt-2">⭐⭐⭐⭐⭐</div>
    </div>

    {/* Testimonial 3 */}
    <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
      <p className="text-gray-700 italic mb-4">
        “Excellent diagnosis and personalized care. The best homeopathy clinic in our area.”
      </p>
      <div className="font-semibold text-blue-900">— Lakshmi Devi</div>
      <div className="text-yellow-500 mt-2">⭐⭐⭐⭐</div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
