/** @format */

import React from "react";
import "./AboutUs.css";


const AboutUs = () => {
  return (
    <section className='about-section'>
      <div className='about-container'>
        <h2 className='about-heading'>About Bhanu Homeopathy</h2>

        <p className='about-description'>
          At <strong>Bhanu Homeopathy</strong>, we provide natural, gentle, and
          effective healing through the science of homeopathy. Our mission is to
          offer holistic wellness by treating not just the symptoms, but the
          root cause of disease.
        </p>

        <div className='about-content'>
          <div className='about-text'>
            <h3>Our Philosophy</h3>
            <p>
              We believe in the body's natural healing ability. Our treatments
              focus on enhancing that ability while understanding your physical,
              emotional, and psychological needs.
            </p>

            <h3>Why Choose Us?</h3>
            <ul>
              <li>Certified Homeopathic Doctors with Years of Experience</li>
              <li>Personalized Treatment Plans for Every Patient</li>
              <li>Safe, Natural & Side-effect-free Remedies</li>
              <li>Chronic & Acute Illness Expertise</li>
              <li>Friendly, Confidential & Family-friendly Environment</li>
              <li>Affordable Pricing and Long-Term Wellness Goals</li>
            </ul>

            <h3>Our Mission</h3>
            <p>
              To make homeopathy a go-to choice for wellness and healing across
              all age groups by ensuring trusted and professional care rooted in
              empathy, science, and tradition.
            </p>

            <h3>Our Vision</h3>
            <p>
              We envision a healthier society where holistic treatment is
              valued, and natural healing is accessible to all. We aim to
              promote awareness about homeopathy’s potential for sustainable
              wellness.
            </p>

            <h3>Expertise</h3>
            <p>We have successfully managed and treated conditions like:</p>
            <ul>
              <li>Skin Ailments – Eczema, Psoriasis, Acne</li>
              <li>Respiratory Issues – Asthma, Allergic Rhinitis</li>
              <li>Digestive Concerns – IBS, Indigestion, Acidity</li>
              <li>Musculoskeletal Pain – Arthritis, Joint Pain</li>
              <li>Childhood Conditions – Tonsillitis, Bedwetting</li>
              <li>Mental Health – Anxiety, Sleeplessness, Stress</li>
              <li>
                Women's Health – PCOD, Irregular Cycles, Hormonal Imbalance
              </li>
            </ul>

            <h3>Patient-Centric Care</h3>
            <p>
              We focus on building a deep understanding of our patients. From
              the first consultation to follow-ups, our care is rooted in
              empathy, active listening, and ongoing support.
            </p>

            <div className='about-cta'>
              <p>
                Ready to begin your journey toward natural wellness?{" "}
                <strong>Schedule a consultation today</strong> and experience
                the Bhanu Homeopathy difference.
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
