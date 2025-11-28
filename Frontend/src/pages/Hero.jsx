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
                review: `“I am Dr. V. Manidhar. I have been using this app’s repertory and AI-supported analysis, and I am truly impressed with its accuracy and practicality. The repertory structure is very clear, user-friendly, and clinically helpful.

After integrating this into my daily practice, I have noticed a clear improvement in my case results and success rate. The app saves time, improves clarity, and supports precise remedy selection.

A highly recommended tool for all homeopathic doctors.”`,
              },
              {
                name: "Dr. N. Shalini, M.D.",
                location: "Draksharamam",
                review: `“I am Dr. N. Shalini. Using this app’s repertory and AI-based analytical system has greatly enhanced the accuracy and speed of my case evaluations. The repertory is comprehensive, neatly organized, and very practical for day-to-day clinical use.

Since I started using it, I have noticed a significant improvement in my case success rate. The app provides clarity in remedy selection and supports deeper understanding of patient symptoms.

A highly efficient and reliable tool for every modern homeopathic practitioner."`,
              },
              {
                name: "Dr. K.Saritha Laxmi, BHMS",
                location: "Draksharamam",
                review: `“I am Dr. K. Saritha Laxmi. After using this app’s repertory and AI-based case-analysis system, I am extremely satisfied with its performance. The repertory is very clear, well-structured, and clinically practical for everyday use.

Since I started using this tool, I have observed a significant improvement in my case clarity and success rate. The intelligent rubric suggestions and accurate remedy mapping make case handling much easier and more efficient.

A highly recommended tool for every homeopathic practitioner.”`,
              },
              {
                name: "Dr. M. Siva Rama Krishna, BHMS",
                location: "Jaggampeta",
                review: `“I am Dr. Sivaramakrishna. After using this app’s repertory and AI-driven case analysis, I can confidently say it has added tremendous value to my clinical practice. The repertory is clean, fast, and highly practical, making case interpretation much easier.

Since integrating this tool into my routine, I have observed a steady improvement in accuracy and overall success rate. The clarity in rubric selection and the intelligent remedy suggestions make it an excellent companion for busy practitioners.

A very reliable and efficient app for modern homeopathic practice.”`,
              },
              {
                name: "Dr. MSK. Haffezza, BHMS",
                location: "Jaggampeta",
                review: `“I am Dr. Hafeezza. I have been using this app’s repertory and AI-based case-analysis system, and the experience has been excellent. The repertory is well-organized, easy to use, and clinically very supportive.

After using this app, I have noticed a clear improvement in my case accuracy and success rate. The intelligent rubric suggestions and precise remedy mapping make day-to-day practice much smoother.

A highly useful and dependable tool for every homeopathic practitioner.”`,
              },
              {
                name: "Dr.A.Sravani, BHMS",
                location: "Kakinada",
                review: `“I am Dr. A. Sravani. After using this app’s repertory and AI-based case-analysis system, I can confidently say it has made my clinical work smoother and more accurate. The repertory is very well organized, practical, and easy to navigate.

Ever since I started using this, my case interpretation and success rate have significantly improved. The depth of rubrics, clarity of remedy suggestions, and the intelligent analysis really make this app stand out.

A very useful tool for every homeopathic practitioner.”`,
              },
              {
                name: "Dr. Ch.Yadagiri, BHMS",
                location: "Vijayawada",
                review: `I am Dr. Ch. Yadagiri. I have been using this app’s repertory along with its AI-based case analysis, and I am truly impressed with its accuracy and usefulness. The repertory is clear, practical, and extremely helpful during daily case-taking.

After integrating this app into my practice, my case interpretation and overall success rate have noticeably improved. The intelligent rubric suggestions and precise remedy guidance make this a very dependable clinical tool.

A highly beneficial app for every homeopathic doctor.`,
              },
              {
                name: "Dr. K. Saritha Laxmi, BHMS",
                location: "Vijayawada",
                review: `I am Dr. K. Saritha Laxmi. After using this app’s repertory and AI-based case-analysis system, I am extremely satisfied with its performance. The repertory is very clear, well-structured, and clinically practical for everyday use.

Since I started using this tool, I have observed a significant improvement in my case clarity and success rate. The intelligent rubric suggestions and accurate remedy mapping make case handling much easier and more efficient.

A highly recommended tool for every homeopathic practitioner.`,
              },
              {
                name: "Dr. D.Rajasekhar, BHMS",
                location: "Viziyanagaram",
                review: `I am Dr. Raja Sekhar. After using this app’s repertory and AI-supported analysis, I am highly impressed with its clinical accuracy and ease of use. The repertory is very practical, clearly structured, and perfectly suited for fast decision-making during case work.

Ever since I integrated this tool into my practice, my success rate and confidence in case analysis have noticeably increased. The intelligent rubric selection and precise remedy guidance make it an excellent support system for daily clinical work.

A must-have tool for every homeopathic doctor.`,
              },
              {
                name: "Dr. G.V.S. Kiran, BHMS",
                location: "Palakollu",
                review: `“Dr. GVS Kiran here. I have been using this app’s repertory system for the past few weeks, and I am extremely satisfied with the results. The repertory is very well-structured, fast, and clinically practical. After integrating this repertory into my case analysis, my success rate has noticeably increased.

The symptom coverage, remedy suggestions, and the customized AI-based logic make case solving much easier and more accurate. This has become a valuable tool in my daily practice. Highly recommended for every homeopathic practitioner.”

– Dr. GVS Kiran,
BHMS, Consultant Homeopathic Physician`,
              },
            ].map((doc, index) => (
              <div key={index} style={styles.testimonialBox}>
                <p style={styles.testimonialText}>“{doc.review}”</p>

                <div style={styles.testimonialAuthor}>— {doc.name}</div>

                <div
                  style={{
                    color: "#475569",
                    fontSize: "0.2rem",
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
    padding: "50px 40px",
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
    gap: "20px",
    animation: "scrollLeft 20s linear infinite",
  },
  doctorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
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
