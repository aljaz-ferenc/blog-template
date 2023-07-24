import { useEffect, useState } from "react";
import "../sass/components/Loading.scss";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
//   const [dots, setDots] = useState([]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (dots.length < 3) {
//         console.log(dots.length);
//         setDots((prev) => [...prev, "."]);
//       } else {
//         setDots([]);
//       }
//     }, 500);

//     return () => clearInterval(timer);
//   }, [dots]);

  return (
    <div className="loader">
        
    </div>
  );
}
