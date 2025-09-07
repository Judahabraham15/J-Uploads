
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 bg-[#1e293b] w-[100%] h-[70px] p-[2rem] 
    flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-white font-nunito sm:text-3xl">Jshare</h1>
      <a href="https://github.com/Judahabraham15/Jshare" target="_blank">
        <FaGithub className="text-3xl text-slate-400" />
      </a>
    </nav>
  );
};

export default Navbar;
