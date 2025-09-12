import React from "react";

const styles = {
  footer: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#e0f2fe",
    fontSize: "0.95rem",
    marginTop: "40px",
  },
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      © {new Date().getFullYear()} Bhanu Homeo Clinic. All rights reserved.
    </footer>
  );
};

export default Footer;
