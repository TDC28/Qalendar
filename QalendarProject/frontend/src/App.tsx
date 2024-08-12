import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ContactPage from "@/pages/contact";
import GeneratePage from "@/pages/generate";
import SetupPage from "@/pages/setup";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ContactPage />} path="/contact" />
      <Route element={<GeneratePage />} path="/generate" />
      <Route element={<SetupPage />} path="/setup" />
    </Routes>
  );
}

export default App;
