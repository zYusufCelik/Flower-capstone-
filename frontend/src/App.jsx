import Tabs from "./components/tabComponents/Tab";
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100  relative">
      <div className="absolute top-5 right-5">
        <Tabs />
      </div>
    </div>
  );
}

export default App;