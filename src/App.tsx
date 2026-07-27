import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Play from "./pages/Play/Play";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/:id" element={<Play />} />
    </Routes>
  );
}