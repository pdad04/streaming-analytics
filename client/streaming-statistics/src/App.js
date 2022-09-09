import { useState } from "react";
import LandingPage from "./components/LandingPage";
import "./App.css";

function App() {
  const [responseData, setResponseData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getResponse = (res) => {
    setResponseData(res.data)
  }

  return (
    <div className="App">
      {responseData ? 
        responseData.map((el, idx) => <div key={idx}>{el.profileName}</div>)
      :
        <LandingPage
            getResponse={getResponse}
        />
      }
    </div>
  );
}

export default App;
