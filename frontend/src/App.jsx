import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";
import { ReloadProvider } from "./hooks/reload";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileInfo from "./components/ProfileInfo";
import ChangePassword from "./components/ChangePassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <>
      <ReloadProvider>
        <AuthProvider>
          <div className="app">
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
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
                    path="/profile/change-password"
                    element={<ChangePassword />}
                  />
                </Route>
              </Routes>
              <Footer />
            </Router>
          </div>
        </AuthProvider>
      </ReloadProvider>
    </>
  );
}

export default App;
