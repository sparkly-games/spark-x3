import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Play from "./pages/Play/Play";
import { getDeviceId } from "./lib/deviceId";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


export default function App() {
  return (
    <ProtectedRoute deviceId={getDeviceId()}>
      <AppRoutes />
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/:id" element={<Play />} />
    </Routes>
  );
}