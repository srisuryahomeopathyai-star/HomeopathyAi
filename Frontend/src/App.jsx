/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../src/pages/Hero";
import CaseSheetForm from "./Components/CaseSheetForm";
import CasesList from "./Components/CasesList";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import SkinAnalyzer from "./pages/SkinAnalyzer";
import ContactUs from "./Components/contact";
import AboutUs from "./Components/Aboutus";
import Register from "./Components/Register";
import Login from "./Components/Login";
import TodayFollowUps from "./Components/TodayFollowUps";
import FollowUps from "./Components/FollowUps";
import FollowUpPage from "./Components/FollowUpPage";
import FollowUpForm from "./Components/FollowUpForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/image' element={<SkinAnalyzer />} />
        <Route path='/addcase' element={<CaseSheetForm />} />
        <Route path='/cases' element={<CasesList />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/followup" element={<FollowUpPage />} />
<Route path="/followups/:id" element={<FollowUpForm />} />
        <Route path="/todayfollowups" element={<TodayFollowUps />} />
        <Route path="/followups" element={<FollowUps />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
