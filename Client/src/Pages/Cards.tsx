import { FiUpload, FiLink, FiShield } from "react-icons/fi";
import { Meteors } from "../lib/Meteors";

const cardContent = [
  {
    text: "Instant File Upload",
    icon: <FiUpload className="text-blue-400 w-8 h-8 " />,
    desc: "Upload files in seconds with a simple drag & drop interface.",
  },
  {
    text: "Shareable Secure Links",
    icon: <FiLink className="text-blue-400 w-8 h-8 " />,
    desc: "Generate unique links to share your files with anyone, anywhere.",
  },
  {
    text: "Privacy & Protection",
    icon: <FiShield className="text-blue-400 w-8 h-8 " />,
    desc: "Your files are protected and only accessible via your generated link.",
  },
];

const Cards = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[30vh] sm:min-h-[35vh] md:min-h-[40vh] font-nunito mt-12 sm:mt-16 p-4 sm:p-6 md:p-8">
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        Key <span className="text-blue-500">Features</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-8 w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl">
        {cardContent.map(({ text, icon, desc }, index) => (
          <div
            key={index}
            className="relative bg-[#181c2f] border rounded-xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-start transition-transform hover:scale-105 hover:shadow-xl overflow-hidden"
            style={{ borderColor: "rgba(59, 130, 246, 0.40)" }}
          >
            
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Meteors number={20} />
            </div>
         
            <span
              className="mb-2 sm:mb-3 border border-blue-500 p-2 sm:p-3 rounded-full flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 z-10"
              style={{ background: "rgba(59, 130, 246, 0.15)" }}
            >
              {icon}
            </span>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 z-10">
              {text}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg text-left z-10">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
