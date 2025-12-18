/** @format */

// /** @format */

// import React from "react";
// import "./AboutUs.css";

// const AboutUs = () => {
//   return (
//     <section className='about-section'>
//       <div className='about-container'>
//         <h2 className='about-heading'>About Sri Surya Homeopathy</h2>

//         <p className='about-description'>
//           At <strong>Sri Surya Homeopathy</strong>, we provide natural, gentle,
//           and effective healing through the science of homeopathy. Our mission
//           is to offer holistic wellness by treating not just the symptoms, but
//           the root cause of disease.
//         </p>

//         <div className='about-content'>
//           <div className='about-text'>
//             <h3>Our Philosophy</h3>
//             <p>
//               We believe in the body's natural healing ability. Our treatments
//               focus on enhancing that ability while understanding your physical,
//               emotional, and psychological needs.
//             </p>

//             <h3>Why Choose Us?</h3>
//             <ul>
//               <li>Certified Homeopathic Doctors with Years of Experience</li>
//               <li>Personalized Treatment Plans for Every Patient</li>
//               <li>Safe, Natural & Side-effect-free Remedies</li>
//               <li>Chronic & Acute Illness Expertise</li>
//               <li>Friendly, Confidential & Family-friendly Environment</li>
//               <li>Affordable Pricing and Long-Term Wellness Goals</li>
//             </ul>

//             <h3>Our Mission</h3>
//             <p>
//               To make homeopathy a go-to choice for wellness and healing across
//               all age groups by ensuring trusted and professional care rooted in
//               empathy, science, and tradition.
//             </p>

//             <h3>Our Vision</h3>
//             <p>
//               We envision a healthier society where holistic treatment is
//               valued, and natural healing is accessible to all. We aim to
//               promote awareness about homeopathy’s potential for sustainable
//               wellness.
//             </p>

//             <h3>Expertise</h3>
//             <p>We have successfully managed and treated conditions like:</p>
//             <ul>
//               <li>Skin Ailments – Eczema, Psoriasis, Acne</li>
//               <li>Respiratory Issues – Asthma, Allergic Rhinitis</li>
//               <li>Digestive Concerns – IBS, Indigestion, Acidity</li>
//               <li>Musculoskeletal Pain – Arthritis, Joint Pain</li>
//               <li>Childhood Conditions – Tonsillitis, Bedwetting</li>
//               <li>Mental Health – Anxiety, Sleeplessness, Stress</li>
//               <li>
//                 Women's Health – PCOD, Irregular Cycles, Hormonal Imbalance
//               </li>
//             </ul>

//             <h3>Patient-Centric Care</h3>
//             <p>
//               We focus on building a deep understanding of our patients. From
//               the first consultation to follow-ups, our care is rooted in
//               empathy, active listening, and ongoing support.
//             </p>

//             <div className='about-cta'>
//               <p>
//                 Ready to begin your journey toward natural wellness?{" "}
//                 <strong>Schedule a consultation today</strong> and experience
//                 the Sri Surya Homeopathy difference.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;
/** @format */

import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className='about-section'>
      <div className='about-container'>
        <h2 className='about-heading'>About HomeoEra Neo</h2>

        <p className='about-description'>
          Our <strong>Homeopathy AI Assistant</strong> is a modern clinical
          decision-support system built to help practitioners analyze cases with
          high accuracy and depth. The app combines advanced AI, classical
          homeopathic principles, and a custom-built repertory engine to provide
          reliable, evidence-based suggestions.
        </p>

        <div className='about-content'>
          {/* Features */}
          <div className='about-text'>
            <h3>🌟 Key Features</h3>
            <ul>
              <li>
                <strong>AI-Based Case Analysis:</strong> Studies mind symptoms,
                physical symptoms, modalities, miasmatic tendencies, disease
                patterns, and follow-up changes to generate a complete clinical
                understanding.
              </li>
              <li>
                <strong>Skin Disease Image Assessment:</strong> Upload skin
                images and instantly identify conditions with related
                homeopathic remedy groups.
              </li>
              <li>
                <strong>Lab Report Interpretation:</strong> AI reads CBC,
                Thyroid, Blood Sugar, Lipid Profile, LFT, RFT, etc., and
                converts them into clinical meaning, homeopathic significance,
                and possible remedy correlations.
              </li>
              <li>
                <strong>Follow-Up Learning System:</strong> Each follow-up
                improves accuracy; AI learns symptom changes and adjusts remedy
                guidance intelligently.
              </li>
            </ul>

            <h3>📚 Integrated Repertory Sources</h3>
            <ul>
              <li>
                <strong>Classical Repertories:</strong> Kent,
                Boger-Boenninghausen, TPB, Bogers Synoptic Key, Phatak’s
                rubrics.
              </li>
              <li>
                <strong>Materia Medica Sources:</strong> Hering, Boericke,
                Allen, Nash, Clarke (select insights).
              </li>
              <li>
                <strong>AI-Enhanced Repertory:</strong> Custom AI layer
                combining rubrics from multiple sources, real-world cases,
                modality patterns, and remedy-confirmatory pointers.
              </li>
            </ul>

            <h3>🎯 Mission</h3>
            <p>
              To support homeopathic doctors with fast, intelligent, and
              clinically sound guidance that respects classical foundations
              while leveraging modern technology for deeper analysis.
            </p>

            <h3>💡 Vision</h3>
            <p>
              To build the world’s most reliable AI platform for homeopathic
              clinical practice—accurate, fast, and rooted in classical
              knowledge.
            </p>

            <h3>🔒 Privacy & Security</h3>
            <p>
              All case data, images, and reports are processed securely and
              stored on a private server with strict confidentiality.
            </p>

            <div className='about-cta'>
              <p>
                Ready to experience modern AI-powered homeopathy?{" "}
                <strong>Schedule a consultation today</strong> and let our AI
                Assistant support your path to natural wellness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
