import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="fixed bottom-6 left-6 flex flex-col items-center text-white font-[Inter]">
      {/* זכויות יוצרים */}
      <span className="text-sm text-gray-400 mb-2">
        © 2025 Rivka Levi. All rights reserved        
      </span>

      {/* אייקון GitHub */}
      <h1></h1>
      <a
  href="https://github.com/Rivka387/DocLock"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#2a2a2a] p-6 rounded-full shadow-xl border border-[#74ad7d] hover:bg-[#74ad7d] transition-all"
>
  <FaGithub className="text-[2.5rem] text-[#74ad7d] hover:text-white transition-all" />
</a>

    </footer>
  );
};

export default Footer;
