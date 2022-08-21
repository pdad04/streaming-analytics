import { useState } from "react";
import LandingPage from "./components/LandingPage";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="App">
     <LandingPage />
    </div>
  );
}

export default App;
