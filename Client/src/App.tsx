import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import FileUploader from "./Pages/FileUploader";
import DownloadPage from "./Pages/DownloadPage";
import Cards from "./Pages/Cards";
import RecentUploads from "./Components/RecentUploads";
import Layout from "./Layout/Layout";
import Lenis from "lenis";
import NotFound from "./Pages/NotFound";

if (!localStorage.getItem("sessionId")) {
  localStorage.setItem("sessionId", crypto.randomUUID());
}
const App = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [hasUploaded, setHasUploaded] = useState<boolean>(() => {
    //* Load from localStorage on mount
    return localStorage.getItem("hasUploaded") === "true";
  });
  useEffect(() => {
    // *Save hasUploaded to localStorage whenever it changes
    localStorage.setItem("hasUploaded", hasUploaded.toString());
  }, [hasUploaded]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 3,
      // smooth: true,
    });
    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <div className="flex flex-col items-center min-h-screen px-4 bg-[#0f172a]">
                <FileUploader
                  setHasUploaded={setHasUploaded}
                  setRefreshKey={setRefreshKey}
                />
                <Cards />
                <RecentUploads refreshKey={refreshKey} />
              </div>
            }
          />
          <Route path="download/:fileId" element={<DownloadPage />} />
            <Route path="*" element={<NotFound />} />
        </Route>
      
      </Routes>

      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#2563eb",
          border: "2px solid #60a5fa",
          borderRadius: "10px",
          fontFamily: "Nunito",
          fontWeight: "bold",
        }}
        closeButton={false}
      />
    </div>
  );
};

export default App;
