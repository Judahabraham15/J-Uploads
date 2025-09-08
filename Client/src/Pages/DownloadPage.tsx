import Axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";

import { HiArrowLeftStartOnRectangle } from "react-icons/hi2";
import { toast } from "react-toastify";

const DownloadPage = () => {
  interface FileInfo {
    name: string;
    size: number;
    type: string;
    storedFilename: string;
    imageKitUrl: string;
  }
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const [fileInfo, setfileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!fileId) {
      setError("Invalid filename");
      return;
    }

    const fetchInfo = async () => {
      try {
        const response = await Axios.get(
          `https://jshare-server.onrender.com/file-info/${encodeURIComponent(fileId)}`
        );
        setfileInfo(response.data);
      } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          setError("File not Found");
        } else {
          setError("Failed to Fetch Details");
        }
      }
    };
    fetchInfo();
  }, [fileId]);

const handleDownload = async () => {
  if (!fileInfo?.storedFilename || !fileInfo?.name) return;

  try {
  
    const response = await Axios.get(
      `https://jshare-server.onrender.com/download/${encodeURIComponent(fileInfo.storedFilename)}`,
      { responseType: "blob" } // <- tell Axios we want raw binary data
    );

    //  Wrap those bytes in a Blob so the browser treats it like a real file
    const blob = new Blob([response.data]); // 

    //  Create a temporary URL that points to that in-memory file
    const objectUrl = URL.createObjectURL(blob);

 
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileInfo.name; // filename shown in the "Save as…" dialog
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    //  Clean up that temporary URL (avoid memory leaks)
    URL.revokeObjectURL(objectUrl);

    toast.success("✅ Download Started", {
      icon: false,
      autoClose: 3000,
      position: "top-right",
      className:
        "text-white font-nunito text-md sm:text-base md:text-lg max-w-[90%] sm:max-w-[400px] mx-2 sm:mx-4",
    });
  } catch (err) {
    console.error("Error downloading file:", err);
    toast.error("❌ Error downloading file", {
      icon: false,
      autoClose: 3000,
      position: "top-right",
      className:
        "text-white font-nunito text-md sm:text-base md:text-lg max-w-[90%] sm:max-w-[400px] mx-2 sm:mx-4",
    });
  }
};


  if (error) {
    return (
      <div className="min-h-screen px-4 flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="text-red-500 font-nunito text-lg">{error}</p>
        <button
          className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-nunito"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }
  if (!fileInfo) {
    return (
      <div className="min-h-screen px-4 flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="font-nunito text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6 flex-col mt-30 ">
      <div className="space-y-10 max-w-md w-full">
        <div className="flex flex-row" onClick={() => navigate("/")}>
          <HiArrowLeftStartOnRectangle
            className="text-slate-400 mr-1 cursor-pointer"
            style={{ verticalAlign: "middle" }}
            size={20}
          />
          <p className="text-slate-400 cursor-pointer">Return Home</p>
        </div>
        <div className="w-full rounded-xl border border-blue-500 bg-[#0c1221d9] py-6 px-4 shadow-xl shadow-blue-500/25">
          <div className="flex flex-row ">
            <h1 className="text-white font-nunito text-2xl font-semibold mr-2 sm:text-3xl">
              Congratulations!
            </h1>
            <motion.div
              className="w-6.5 h-6.5 rounded-full sm:w-7 sm:h-7 sm:mt-1"
              animate={{
                background: [
                  "linear-gradient(to bottom, #22c55e, #16a34a, #2563eb)",
                  "linear-gradient(to bottom, #ec4899, #f97316, #f59e0b)",
                  "linear-gradient(to bottom, #06b6d4, #3b82f6, #8b5cf6)",
                  "linear-gradient(to bottom, #8b5cf6, #ec4899, #f97316)",
                  "linear-gradient(to bottom, #000, #fff, #000)",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          </div>
          <p className="text-white text-sm mr-2 mt-2">
            You have Successfully Uploaded Your File 🚀
          </p>

          <div className="flex items-center justify-center font-nunito mt-10">
            <div
              className=" flex items-center justify-center w-20 h-20 bg-gradient-to-b
             from-green-600 via-green-600 to-blue-600   rounded-3xl rotate-5 hover:rotate-0 mt-4 transition duration-100"
            >
              <h1 className="text-white text-sm bg-gradient-to-r from-black to-blue-500 px-2 py-1  font-bold rounded-full">
                {fileInfo.type}
              </h1>
            </div>
          </div>
          <h1 className="truncate text-gray-400 text-center font-bold mt-6 text-2xl w-full max-w-2xl">
            {fileInfo.name}
          </h1>
          <div className="flex items-center justify-center">
            <button
              className="max-w-xs w-full py-2.5 mt-10 rounded-lg bg-blue-500 transition duration-200
           hover:bg-blue-600 text-white font-bold flex items-center justify-center"
              onClick={handleDownload}
            >
              <FiDownload
                style={{ verticalAlign: "middle" }}
                className="mr-2"
                size={20}
              />
              Download File
            </button>
          </div>
          <div className="border-t-1 mt-6 pt-5 border-gray-600 flex justify-center items-center">
            <div className="flex items-center  justify-center">
              <span className="text-slate-400 text-xs flex flex-row gap-1.5">
                <img
                  src="https://vercel.com/api/www/avatar?s=64&u=judahabraham15"
                  alt="profile"
                  className="w-2 h-2  mt-1 rounded-full text-white"
                />
                Threat free and Secured Download
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
