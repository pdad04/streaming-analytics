import { useState } from "react";
import LandingPage from "./components/LandingPage";
import GraphsPage from "./components/GraphsPage";
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
        <GraphsPage
          data={responseData}
        />
      :
        <LandingPage
            getResponse={getResponse}
        />
      }
    </div>
  );
}

export default App;
