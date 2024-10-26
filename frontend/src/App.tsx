import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ContactPage from "@/pages/contact";
import GeneratePage from "@/pages/generate";
import SetupPage from "@/pages/setup";
import EventManagerPage from "./pages/event-manager";
import TablePage from "./pages/tabletest";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ContactPage />} path="/contact" />
      <Route element={<TablePage />} path="/generate" />
      <Route element={<EventManagerPage />} path="/event-manager" />
      <Route element={<SetupPage />} path="/setup" />
    </Routes>
  );
}

export default App;
