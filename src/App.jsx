import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AppRoutes from "./routes/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;