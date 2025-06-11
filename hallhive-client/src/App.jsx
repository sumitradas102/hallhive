import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdministrationPage from "./pages/AdministrationPage";
import ContactPage from "./pages/ContactPage";
import HallLayoutPage from "./pages/HallLayoutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/administration" element={<AdministrationPage />} /> 
      <Route path="/contact"  element={<ContactPage/>}/>
      <Route path="/signup"element={<SignupPage/>}/>

      <Route path="/hall-layout" element={<HallLayoutPage />} />

    </Routes>
  );
}

export default App;