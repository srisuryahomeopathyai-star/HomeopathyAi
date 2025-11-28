/** @format */

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/doctors.jpg";
import logo1 from "../assets/Bhanulogo.png";
const Home = () => {
  return (
    <div style={styles.page}>
      <style>
        {`
      @keyframes scrollLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}
      </style>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>🌿 Welcome to Sri Surya Homeo AI</h1>
          <p style={styles.heroSub}>
            Natural Healing. Trusted Expertise. Proven Results.
          </p>
          <p style={styles.heroText}>
            Combining traditional homeopathy with modern tools to provide
            holistic care that works. 7+ years of service to over 10,000
            satisfied patients.
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
          <img src={logo1} alt='Doctor' style={styles.heroImg} />
        </div>
      </section>

      {/* About Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Sri Surya Homeo Clinic</h2>
        <p style={styles.sectionText}>
          Founded with compassion and care, our mission is to heal naturally
          using personalized classical homeopathic remedies. We specialize in
          treating chronic diseases, stress, skin conditions, women’s health,
          and more.
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

      {/* Doctors Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Homeopathy Doctors</h2>

        <div style={styles.doctorsGrid}>
          {[
            { name: "Dr. V. Manidhar, BHMS", location: "Vizag" },
            { name: "Dr. N. Shalini, M.D.", location: "Draksharamam" },
            { name: "Dr. A. Bhavani, BHMS", location: "Rajanagaram" },
            { name: "Dr. P. Ramachandra Rao, BHMS", location: "Eluru" },
            { name: "Dr. K. Lokesh, BHMS", location: "Jaggampeta" },
            { name: "Dr. Venkata Ramana, BHMS", location: "Kathipudi" },
            { name: "Dr. D. Rajesh, BHMS", location: "Vetlapalem" },
            { name: "Dr. K. Lakshmi Reddy, BHMS", location: "Kakinada" },
            { name: "Dr. P. S. Satyavathi, BHMS", location: "Samalkota" },
            { name: "Dr. N. Harika, BHMS", location: "Tuni" },
          ].map((doc, index) => (
            <div key={index} style={styles.doctorCard}>
              <img
                src={logo} // You can replace with actual doctor images when available
                alt={doc.name}
                style={styles.doctorCardImg}
              />
              <h3 style={styles.doctorCardName}>{doc.name}</h3>
              <p style={styles.doctorCardLocation}>📍 {doc.location}</p>
            </div>
          ))}
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
        <h2 style={styles.sectionTitle}>Doctors Who Trust Our Treatment</h2>

        <div style={styles.marqueeContainer}>
          <div style={styles.marqueeContent}>
            {[
              {
                name: "Dr. V. Manidhar, BHMS",
                location: "Vizag",
                review:
                  "A highly effective and reliable treatment method for chronic conditions.",
              },
              {
                name: "Dr. N. Shalini, M.D.",
                location: "Draksharamam",
                review:
                  "Accurate diagnosis and holistic care. Truly impressed.",
              },
              {
                name: "Dr. A. Bhavani, BHMS",
                location: "Rajanagaram",
                review: "Gentle remedies with real results for my patients.",
              },
              {
                name: "Dr. P. Ramachandra Rao, BHMS",
                location: "Eluru",
                review:
                  "Professional, compassionate, and outcome-focused healing.",
              },
              {
                name: "Dr. K. Lokesh, BHMS",
                location: "Jaggampeta",
                review:
                  "One of the best homeopathic approaches I have experienced.",
              },
              {
                name: "Dr. Venkata Ramana, BHMS",
                location: "Kathipudi",
                review: "Detailed case-taking and patient-friendly treatment.",
              },
              {
                name: "Dr. D. Rajesh, BHMS",
                location: "Vetlapalem",
                review:
                  "Highly dependable treatment. Perfect for chronic complaints.",
              },
              {
                name: "Dr. K. Lakshmi Reddy, BHMS",
                location: "Kakinada",
                review: "Holistic, gentle, and scientifically handled care.",
              },
              {
                name: "Dr. P. S. Satyavathi, BHMS",
                location: "Samalkota",
                review: "Excellent healing outcomes with zero side effects.",
              },
              {
                name: "Dr. N. Harika, BHMS",
                location: "Tuni",
                review: "Patients show steady and remarkable improvement.",
              },
            ].map((doc, index) => (
              <div key={index} style={styles.testimonialBox}>
                <p style={styles.testimonialText}>“{doc.review}”</p>

                <div style={styles.testimonialAuthor}>— {doc.name}</div>

                <div
                  style={{
                    color: "#475569",
                    fontSize: "0.9rem",
                    marginTop: "3px",
                  }}
                >
                  📍 {doc.location}
                </div>

                <div style={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section style={{ ...styles.section, paddingTop: 0 }}>
        <h2 style={styles.sectionTitle}>Find Us on Google Maps</h2>
        <div style={styles.mapContainer}>
          <iframe
            title='Sri Surya Homeo Clinic Location'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.7384504433393!2d78.50766697503696!3d13.558046202203175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2b4d99b5c7b05%3A0x3f8a2cb54be57ff6!2sPrimo%20Smart%20Salon!5e0!3m2!1sen!2sin!4v1720198472937!5m2!1sen!2sin'
            width='100%'
            height='400'
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer style={styles.footer}>
        © {new Date().getFullYear()} Sri Surya Homeo Clinic. All rights reserved.
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
    backgroundColor: "transparent",
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
  doctorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginTop: "30px",
    justifyItems: "center",
  },

  doctorCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    width: "250px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
    cursor: "pointer",
  },
  doctorCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
  },

  doctorCardImg: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "4px solid #3b82f6",
  },

  doctorCardName: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#1e3a8a",
  },

  doctorCardLocation: {
    marginTop: "6px",
    fontSize: "0.95rem",
    color: "#475569",
  },
};

export default Home;
