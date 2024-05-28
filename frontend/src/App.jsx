import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";
import { ReloadProvider } from "./hooks/reload";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileInfo from "./components/ProfileInfo";
import ChangePassword from "./components/ChangePassword";
import UploadCourse from "./components/UploadCourse";
import GetAllCourses from "./components/GetAllCourses";
import GetAllUser from "./components/GetAllUser";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  return (
    <>
      <ReloadProvider>
        <AuthProvider>
          <div className="app">
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />

                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<ProfileInfo />} />
                    <Route
                      path="change-password"
                      element={<ChangePassword />}
                    />
                  </Route>
                </Route>
                <Route path="/admin" element={<Admin />}>
                  <Route path="users" element={<GetAllUser />} />
                  <Route path="upload-course" element={<UploadCourse />} />
                  <Route path="courses" element={<GetAllCourses />} />
                </Route>
              </Routes>
            </Router>
          </div>
        </AuthProvider>
      </ReloadProvider>
    </>
  );
}

export default App;
