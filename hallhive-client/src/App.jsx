import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdministrationPage from "./pages/AdministrationPage";
import ContactPage from "./pages/ContactPage";
import HallLayoutPage from "./pages/HallLayoutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NoticePage from "./pages/NoticePage";
import EventsPage from "./pages/EventsPage";
import StudentPage from "./pages/StudentPage";
import ComplaintPage from "./pages/ComplaintPage";
import RoomApplyPage from "./pages/RoomApplyPage";
import FaqChatPage from "./pages/FaqChatPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminComplaintPage from "./pages/AdminComplaintPage";
import AdminNoticePage from "./pages/AdminNoticePage";
function App() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/administration" element={<AdministrationPage />} /> 
      <Route path="/contact"  element={<ContactPage/>}/>
      <Route path="/signup"element={<SignupPage/>}/>
      <Route path="/notice" element={<NoticePage />} />

      <Route path="/hall-layout" element={<HallLayoutPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/student"element={<StudentPage/>}/>
      <Route path="/complaint" element={<ComplaintPage />} />
      <Route path="/room-application"element={<RoomApplyPage/>}/>
      <Route path="/faq" element={<FaqChatPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/complaints" element={<AdminComplaintPage />} />
      <Route path="/admin/notices" element={<AdminNoticePage />} />
    </Routes>
  );
}

export default App;