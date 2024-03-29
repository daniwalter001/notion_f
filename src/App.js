import { Toaster } from "react-hot-toast";
import Notion from "./pages/Notion";

function App() {
  return (
    <div className="border-2 flex flex-auto flex-col h-screen ">
      <Notion />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
