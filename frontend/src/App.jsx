import { useState } from "react";
import Tabs from "./components/tabComponents/Tab";
import ProcessForm from "./components/chartComponents/ProcessForm";
import ChartForm from "./components/chartComponents/ChartForm";
import Summary from "./components/tabComponents/Summary"; // 👈 Summary'yi de dahil ettik

function App() {
  const [steps, setSteps] = useState([]);

  const handleAddStep = (step) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8 relative">
      {/* Tabs */}
      <Tabs steps={steps} />

      {/* Adım ekleme formu */}
      <ProcessForm onAddStep={handleAddStep} />

      {/* Adımların listesi */}
      <ChartForm steps={steps} />

      {/* Özet bilgileri gösteren kısım */}
      <Summary steps={steps} />
    </div>
  );
}

export default App;
