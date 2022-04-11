import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./AuthContext";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
