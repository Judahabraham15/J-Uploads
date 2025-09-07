import { BsBriefcase } from "react-icons/bs";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <footer className="w-full  mt-16 py-6 border-t border-gray-600">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row">
          <p className="text-gray-400 text-base font-nunito ">
          © {new Date().getFullYear()} Jshare - By Judah Abraham
        </p>
         <img
              src="https://vercel.com/api/www/avatar?s=64&u=judahabraham15"
              alt="profile"
              className="w-3 h-3 rounded-full mt-1.5 ml-1"
              style={{verticalAlign: 'middle'}}
            />
        </div>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://portfolios-nu-two.vercel.app/"
            className="text-gray-400 hover:text-white transition"
            target= "_blank"
          >
            <motion.span
             whileHover={{ rotate: 10, scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{ display: "inline-block", verticalAlign: "middle" , marginRight: '2px' }}>
              <BsBriefcase  />
            </motion.span>{" "}
            PortFolio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
