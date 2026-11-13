import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Announcements from "./pages/Announcements";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Moderation from "./pages/Moderation";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Moderation />} />
          <Route path="/announcements" element={<Announcements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}