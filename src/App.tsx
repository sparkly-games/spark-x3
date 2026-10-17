import { Routes, Route } from "react-router-dom";

import Home from "./games/pages/Home/Home";
import Play from "./games/pages/Play/Play";
import ComingSoon from "./coming-soon/index";
import SmartCalcHomepage from "./smart-calc/index";
import { getDeviceId } from "./games/lib/deviceId";
import ProtectedRoute from "./games/components/ProtectedRoute/ProtectedRoute";
import { LanguageProvider } from "./localisation/LanguageContext";


export default function App() {
  return (
    <LanguageProvider>
      <ProtectedRoute deviceId={getDeviceId()}>
        <AppRoutes />
      </ProtectedRoute>
    </LanguageProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/games" element={<Home />} />
      <Route path="/play/:id" element={<Play />} />
      <Route path="/coming-soon/*" element={<ComingSoon />} />
      <Route path="/smart-calculator" element={<SmartCalcHomepage />} />
    </Routes>
  );
}