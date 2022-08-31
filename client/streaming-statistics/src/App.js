import { useState } from "react";
import LandingPage from "./components/LandingPage";
import "./App.css";

function App() {
  const [responseData, setResponseData] = useState();
  const [data, setData] = useState(null);
  const [timezone, setTimezone] = useState(null);

  const getResponse = (res) => {
    console.log(res);
    setResponseData(res)
  }

  const fileUpload = (file) => {
    setData(file);
  }

  const chooseTimezone = (tZone) => {
    setTimezone(tZone);
  }

  return (
    <div className="App">
     <LandingPage
        getResponse={getResponse}
        // fileUpload={fileUpload}
        // chooseTimezone={chooseTimezone}
        // data={data}
        // timezone={timezone}
     />
    </div>
  );
}

export default App;
