// import React from "react";
// import Lottie from "lottie-react";
// import diceAnimationData from "../animations/dice 6.json";

// const DiceLoader = () => {
//   return (
//     <div className="fixed inset-0 z-9999 bg-black/60 flex items-center justify-center">
//       <Lottie
//         animationData={diceAnimationData}
//         loop
//         style={{ width: 120, height: 120 }}
//       />
//     </div>
//   );
// };

// export default DiceLoader;

// loader which lookies like a rolling dice

// // default options for the animation
//   const defaultOptions = {
//     loop: true, // It should loop if it's a loader
//     autoplay: true,
//     animationData: diceAnimationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

const DiceLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-base-100 flex items-center justify-center">
      <div className="flex items-center gap-3 border border-neutral-500 px-4 py-2 text-sm tracking-widest uppercase">
        <span>Working</span>
        <span className="w-2 h-2 bg-neutral-900 animate-ping" />
      </div>
    </div>
  );
};

export default DiceLoader;
 
