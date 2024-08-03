import { Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks/Tasks";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default App;
