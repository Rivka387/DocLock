// import { useEffect, useState } from "react";

// import { ReactNode } from "react";

// const ScreenProtection = ({ children }: { children: ReactNode }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         setIsVisible(false); // הסתרת התוכן
//       } else {
//         setIsVisible(true);
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, []);

//   return <div style={{ filter: isVisible ? "none" : "blur(10px)" }}>{children}</div>;
// };

// export default ScreenProtection;

  