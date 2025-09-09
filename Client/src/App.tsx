import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import FileUploader from "./Pages/FileUploader";
import DownloadPage from "./Pages/DownloadPage";
import Cards from "./Pages/Cards";
import RecentUploads from "./Components/RecentUploads";
import Layout from "./Layout/Layout";

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

  return (
    <>
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
    </>
  );
};

export default App;
