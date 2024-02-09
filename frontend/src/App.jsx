import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/auth-context";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <NavBar />
        <Container>
          <Routes>
            <Route path="" element={<PrivateRoute />}>
              <Route path="/" element={<HomeScreen />} />
            </Route>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
          </Routes>
        </Container>
        {/* <Footer /> */}
      </AuthProvider>
    </>
  );
}

export default App;
