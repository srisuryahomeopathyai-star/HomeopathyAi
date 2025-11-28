/** @format */

import React, { useState, useEffect } from "react"; // <-- Import useState and useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
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
import Dashboard from "./Components/Dashboard";
import SplashScreen from "./Components/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />; // Show splash screen while loading
  }

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
        <Route path='/followup' element={<FollowUpPage />} />
        <Route path='/followups/:id' element={<FollowUpForm />} />
        <Route path='/todayfollowups' element={<TodayFollowUps />} />
        <Route path='/followups' element={<FollowUps />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
