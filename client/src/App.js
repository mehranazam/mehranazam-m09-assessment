import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./AuthContext";
import Login from "./Login";
import Agents from "./Agents";
import AddAgent from "./AddAgent";
import EditAgent from "./EditAgent";
import Home from "./Home";
import NotFound from "./NotFound";
import Nav from "./Nav";

function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agent" element={<Agents />} />
          <Route path="/agent/add" element={<AddAgent />} />
          <Route path="/agents/edit/:id" element={<EditAgent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
