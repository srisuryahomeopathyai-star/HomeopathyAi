/** @format */

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/doctor1.jpg";
import logo1 from "../assets/Bhanulogo.png";
const Home = () => {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>🌿 Welcome to Bhanu Homeo Clinic</h1>
          <p style={styles.heroSub}>Natural Healing. Trusted Expertise. Proven Results.</p>
          <p style={styles.heroText}>
            Combining traditional homeopathy with modern tools to provide holistic care that works. 
            7+ years of service to over 10,000 satisfied patients.
          </p>
          {/* <div style={styles.heroButtons}>
            <Link to="/addcase" style={{ ...styles.button, backgroundColor: "#4f46e5" }}>
              ➕ Add New Case
            </Link>
            <Link to="/cases" style={{ ...styles.button, backgroundColor: "#10b981" }}>
              📋 View All Cases
            </Link>
          </div> */}
        </div>
        <div style={styles.heroRight}>
          <img
            src={logo1}
            alt="Doctor"
            style={styles.heroImg}
          />
        </div>
      </section>

      {/* About Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Bhanu Homeo Clinic</h2>
        <p style={styles.sectionText}>
          Founded with compassion and care, our mission is to heal naturally using personalized
          classical homeopathic remedies. We specialize in treating chronic diseases, stress, skin
          conditions, women’s health, and more.
        </p>
      </section>

      {/* Why Choose Us */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.features}>
          <div style={styles.featureBox}>🧠 AI-Supported Diagnosis</div>
          <div style={styles.featureBox}>👨‍⚕️ 7+ Years Experience</div>
          <div style={styles.featureBox}>📱 Online Consultation</div>
          <div style={styles.featureBox}>🌿 Side-effect Free Remedies</div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Meet Our Doctor</h2>
        <div style={styles.doctor}>
          <img
            // src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
           src={logo}
            alt="Doctor"
            style={styles.doctorImg}
          />
          <div>
            <h3 style={styles.doctorName}>Dr. Somasekhar, BHMS</h3>
            <p style={styles.doctorDesc}>
              A passionate homeopath with expertise in case-based prescribing, chronic illness
              treatment, and mental-emotional balance. Trusted by thousands for accurate, safe, and
              gentle healing.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>
        <p style={styles.sectionText}>📍 Jaggampeta, Andhra Pradesh – 517325</p>
        <p style={styles.sectionText}>📞 9494163566</p>
        <p style={styles.sectionText}>📧 bhanuhomeohospital@gmail.com</p>
      </section>

{/* Testimonials Marquee Section */}
<section style={styles.section}>
  <h2 style={styles.sectionTitle}>What Our Patients Say</h2>
  <div style={styles.marqueeContainer}>
    <div style={styles.marqueeContent}>
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} style={styles.testimonialBox}>
          <p style={styles.testimonialText}>
            “{[
              "Dr. Somasekhar’s treatment changed my life.",
              "Effective remedies. Results within weeks.",
              "Excellent diagnosis and care.",
              "The best clinic for chronic conditions.",
            ][index % 4]}”
          </p>
          <div style={styles.testimonialAuthor}>
            — {["Sravani", "Ramesh", "Lakshmi", "Venkat"][index % 4]}
          </div>
          <div style={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
        </div>
      ))}
    </div>
  </div>
</section>




{/* Map Section */}
<section style={{ ...styles.section, paddingTop: 0 }}>
  <h2 style={styles.sectionTitle}>Find Us on Google Maps</h2>
  <div style={styles.mapContainer}>
    <iframe
      title="Bhanu Homeo Clinic Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.7384504433393!2d78.50766697503696!3d13.558046202203175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2b4d99b5c7b05%3A0x3f8a2cb54be57ff6!2sPrimo%20Smart%20Salon!5e0!3m2!1sen!2sin!4v1720198472937!5m2!1sen!2sin"
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: "12px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</section>

      {/* Footer */}
      {/* <footer style={styles.footer}>
        © {new Date().getFullYear()} Bhanu Homeo Clinic. All rights reserved.
      </footer> */}
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(to right, #f0faff, #fbefff)",
    color: "#1e293b",
    lineHeight: 1.6,
  },
  hero: {
    display: "flex",
    flexWrap: "wrap",
    padding: "60px 40px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLeft: {
    flex: "1 1 60%",
    maxWidth: "600px",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  heroSub: {
    fontSize: "1.5rem",
    color: "#7c3aed",
    margin: "10px 0",
  },
  heroText: {
    fontSize: "1.1rem",
    marginBottom: "20px",
    color: "#334155",
  },
  heroButtons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    textDecoration: "none",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
  },
  heroRight: {
    flex: "1 1 30%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  heroImg: {
    width: "400px",
    height: "auto",
    backgroundColor:"transparent",
  },
  section: {
    padding: "60px 40px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: "#0f172a",
    marginBottom: "20px",
    fontWeight: "700",
  },
  sectionText: {
    fontSize: "1.1rem",
    color: "#334155",
    marginBottom: "10px",
  },
  features: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  featureBox: {
    padding: "20px 30px",
    background: "#e0f2fe",
    borderRadius: "10px",
    fontWeight: "600",
    color: "#0c4a6e",
    minWidth: "200px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  doctor: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  doctorImg: {
    width: "400px",
    height: "400px",
    borderRadius: "60px",
    objectFit: "cover",
    border: "4px solid #14b8a6",
  },
  doctorName: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1e3a8a",
  },
  doctorDesc: {
    maxWidth: "400px",
    fontSize: "1rem",
    color: "#334155",
  },
  footer: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#e0f2fe",
    fontSize: "0.95rem",
    marginTop: "40px",
  },
  testimonialScrollWrapper: {
    overflowX: "auto",
    paddingBottom: "10px",
    scrollbarWidth: "thin",
  },
  
  testimonialScrollInner: {
    display: "flex",
    gap: "20px",
    minWidth: "600px",
    padding: "10px 0",
  },
  
  testimonialContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    marginTop: "30px",
  },
  testimonialBox: {
    background: "#e0f2fe",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "300px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    textAlign: "left",
  },
  testimonialText: {
    fontStyle: "italic",
    color: "#334155",
    marginBottom: "10px",
  },
  testimonialAuthor: {
    fontWeight: "600",
    color: "#1e3a8a",
  },
  testimonialStars: {
    color: "#f59e0b",
    marginTop: "5px",
  },
  mapContainer: {
    maxWidth: "900px",
    margin: "0 auto",
    marginTop: "20px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  marqueeContainer: {
    overflow: "hidden",
    width: "100%",
    marginTop: "30px",
  },
  
  marqueeContent: {
    display: "flex",
    gap: "30px",
    animation: "scrollLeft 20s linear infinite",
  },
}

export default Home;
